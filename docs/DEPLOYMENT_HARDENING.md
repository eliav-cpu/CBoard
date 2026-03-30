# Deployment Hardening Guide

## Purpose
This guide introduces a safe deployment baseline for EX-EL on top of the existing CBoard codebase.

## Immediate remediation priorities
1. Stop using the root `src/main/resources/config.properties` as the deployment source for shared environments.
2. Build and deploy using the Maven `env` profile already present in the repository.
3. Use environment-scoped configuration files under:
   - `src/main/resources/local/`
   - `src/main/resources/staging/`
   - `src/main/resources/prod/`
4. Rotate any credentials that were historically committed in tracked files.
5. Do not hardcode local machine paths such as PhantomJS Windows paths in shared configs.

## Build pattern
Use the existing Maven profile pattern:

```bash
mvn clean package -Denv=local
mvn clean package -Denv=staging
mvn clean package -Denv=prod
```

This copies the matching environment directory into the final build output.

## Configuration policy

### Allowed in tracked config
- placeholder values
- hostnames for non-sensitive internal service discovery
- scheduler defaults
- cache tuning defaults
- documentation comments

### Not allowed in tracked config
- real database passwords
- production usernames
- SMTP credentials
- machine-specific executable paths
- internal IPs that expose private topology unnecessarily

## Secret handling policy
For now, due to the legacy architecture, each environment file contains placeholders that must be substituted during deployment.
Recommended approaches:
- CI/CD secret injection
- configuration management tool
- deployment-time templating
- secure file replacement inside the target environment

## Environment file strategy
- `local/config.properties`: safe placeholders for developer use
- `staging/config.properties`: shared QA and integration environment
- `prod/config.properties`: production-safe placeholders only

## Runtime dependencies to standardize
- MySQL
- Redis
- JVM
- reporting / headless browser dependency replacement plan

## Legacy risk note
The current repository contains historical configuration values in the legacy root config file. Those values should be treated as compromised and rotated. This guide does not assume they remain valid.

## Next hardening actions
1. Replace PhantomJS dependency with a supported headless rendering strategy.
2. Move to a modern Java + Spring stack.
3. Containerize app + MySQL + Redis.
4. Introduce health checks and structured logging.
5. Enforce governed data model before building investor dashboards.
