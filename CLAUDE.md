# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

CBoard is a self-service BI / dashboard platform built on **Spring MVC 4 + MyBatis + AngularJS**. It ships as a WAR deployed to Tomcat. The community edition in this repo uses AngularJS on the frontend; the enterprise edition uses Vue.js (not present here).

---

## Build commands

```bash
# Standard build
mvn clean package

# Build with environment-specific config (copies src/main/resources/<env>/ into the output)
mvn clean package -Denv=local
mvn clean package -Denv=staging
mvn clean package -Denv=prod

# Run tests
mvn test

# Run a single test class
mvn test -Dtest=ClassName

# Run the app locally without a separate Tomcat (embedded Tomcat on port 7090)
mvn compile && java -cp target/classes:... org.cboard.DebugTomcat
# Or run DebugTomcat.java directly from an IDE — it starts embedded Tomcat on port 7090
```

The WAR artifact is `target/cboard.war`. Docker build: `docker build --network=host -t cboard .` (requires the WAR to be built first and placed in the project root).

---

## Configuration

All runtime configuration lives in `src/main/resources/config.properties`. Key properties:

| Property | Purpose |
|---|---|
| `jdbc_url` / `jdbc_username` / `jdbc_password` | CBoard metadata database (MySQL by default) |
| `aggregator.h2.url` | H2 database used as the in-process query aggregation store |
| `admin_user_id` | Row ID of the admin user in `dashboard_user` |
| `phantomjs_path` | Absolute path to PhantomJS binary (used for report email screenshots) |
| `cache.redis.hostName` / `cache.redis.port` | Redis connection (only needed when Redis cache is active) |

**Environment-scoped builds**: place per-environment `config.properties` under `src/main/resources/local/`, `staging/`, or `prod/` and build with `-Denv=<name>`. Never commit real credentials — see `docs/DEPLOYMENT_HARDENING.md`.

**Cache backend** is selected in `src/main/resources/spring.xml` by uncommenting one of:
```xml
<!--<import resource="spring-cacher-redis.xml"/>-->
<!--<import resource="spring-cacher-ehcache.xml"/>-->
```
Default (neither uncommented) uses an in-heap `HeapCacheManager`.

**Security backend** is selected in `spring-security.xml` by importing either `spring-security-jdbc.xml` (default, DB-based login) or `spring-security-cas.xml` (CAS SSO).

**H2 demo mode**: replace `src/main/resources/spring-datasource.xml` with `src/main/resources/h2/spring-datasource.xml` and use `src/main/resources/h2/config.properties` to run without an external MySQL.

---

## Database setup

MySQL schema init scripts are in `sql/mysql/mysql.sql`. Patch scripts for upgrades are in `sql/mysql/patch/`. Oracle equivalents are under `sql/oracle/`. The project-specific OTP/EX-EL schema extensions live as individual SQL files in `sql/` (prefixed `otp_`).

---

## Architecture

### Backend layers

```
Controller  →  Service  →  DAO (MyBatis)  →  MySQL (metadata)
                ↓
         DataProviderService
                ↓
         DataProvider (abstract)  →  raw data source (JDBC, ES, Kylin, etc.)
                ↓
         InnerAggregator (H2 or JVM)  →  AggregateResult
```

**Controllers** (`org.cboard.controller`) are `@RestController` classes returning JSON. `BaseController` provides `tlUser` (ThreadLocal user) and `authenticationService` to all controllers.

**Services** (`org.cboard.services`) are the business logic layer, annotated `@Repository` or `@Service`. They call DAOs for metadata and `DataProviderService` for query execution.

**DAOs** (`org.cboard.dao`) are MyBatis mapper interfaces. SQL is in `src/main/resources/mapper/*.xml`.

### DataProvider extension system

This is the core extensibility point. To add a new data source:

1. Extend `org.cboard.dataprovider.DataProvider` and annotate with `@ProviderName(name = "MyName")`.
2. Declare connection parameters with `@DatasourceParameter` on fields (shown in the Datasource config UI).
3. Declare query parameters with `@QueryParameter` on fields (shown in the Widget designer UI).
4. Implement `getData()` returning `String[][]` (first row = column headers).
5. Implement `doAggregationInDataSource()` — return `true` if the source can aggregate natively (also implement `Aggregatable`), `false` to delegate to the built-in H2/JVM aggregator.

`DataProviderManager` discovers all `@ProviderName`-annotated classes at startup via classpath scanning (`org.reflections`). Built-in providers: `JdbcDataProvider`, `ElasticsearchDataProvider`, `KylinDataProvider`, `SolrDataProvider`, `FileDataProvider`, `SaikuDataProvider`.

### Aggregation pipeline

When `doAggregationInDataSource()` is `false`, `DataProvider.getAggData()` calls `getData()` to load raw `String[][]` into the configured `InnerAggregator`:
- **H2Aggregator** (default): loads rows into an embedded H2 in-process database, executes SQL aggregation there.
- **JvmAggregator**: aggregates in-memory on the JVM heap.

Cache (`rawDataCache` bean) wraps the aggregator to avoid re-fetching. Cache TTL is the dataset's `interval` (seconds).

### Frontend

Single-page AngularJS app defined in `src/main/webapp/org/cboard/`. Module is `cBoard` (`ng-app.js`). Routing uses `ui-router` states configured in `ng-config.js`. Structure:

- `controller/config/` — CRUD screens for datasources, datasets, widgets, boards, jobs, roles
- `controller/dashboard/` — dashboard view and parameter controls  
- `controller/admin/` — user management
- `service/chart/` — one service per chart type (line, pie, scatter, map, etc.), each transforms `AggregateResult` into ECharts options
- `util/CBoardEChartRender.js` — central ECharts rendering orchestrator
- `directive/dashboard/dashboardWidget.js` — AngularJS directive that renders a widget inside a dashboard

Chart rendering flow: `AggregateResult` JSON → `chartDataProcess.js` (pivot/transform) → specific `chart*Service.js` (build ECharts config) → `CBoardEChartRender.js` (render to DOM).

### Job / email reporting

Quartz scheduler (`SchedulerFactoryBean`) drives `MailJobExecutor`, which uses PhantomJS (`phantom.js` script + `phantomjs_path` config) to capture chart screenshots and sends them via `MailService` (Apache Commons Email or EWS).

---

## Key conventions

- **Passwords are MD5-encoded** in the database (`Md5PasswordEncoder` in Spring Security). No salting.
- **Filter expressions** in dimension configs support `{loginName}`, `{userName}`, `{userRoles}` placeholders (resolved at query time) and Aviator expression syntax `{expression}` for computed values.
- **NULL values** in dimension data are represented as the sentinel string `"#NULL"` (`DataProvider.NULL_STRING`).
- **MyBatis mappers** are XML-only (no annotations); all SQL is in `src/main/resources/mapper/`.
- **Spring XML config** — no Java `@Configuration` classes. All wiring is in the `spring*.xml` files under `src/main/resources/`.
- **i18n**: translation JSON files are under `src/main/webapp/i18n/`. AngularJS `pascalprecht.translate` is used.
