# EX-EL BI Accelerator Master Plan

## Why this document exists
This repository is the strongest BI-capable foundation currently connected in GitHub, but it is not yet production-ready for the EX-EL operating model. The goal of this document is to convert the current codebase from a generic BI platform into a controlled investment, sales, and underwriting intelligence system.

## Connected repository landscape

### 1) CBoard
Role: Core BI platform candidate.
Why it matters: It already provides dashboarding, role-based access, multidimensional reporting, data-source extension, and email reporting.
Decision: Keep as the primary BI engine candidate.

### 2) SocialAds-360-Dashboard
Role: Reference project only.
Reason: This is a portfolio-style project built around Kaggle Meta ads data and an external author profile. It is useful for layout inspiration and KPI framing, but it is not a system-of-record for EX-EL.
Decision: Do not treat as product core. Reuse selected visual and metric ideas only.

### 3) Dashboards / Excel-Dashboard / Excel-VBA-Dashboards / Hospitality sample repos
Role: Inspiration and component library only.
Reason: These repositories mostly contain demo dashboards, static examples, or learning projects.
Decision: Mine patterns, do not build the company BI platform on top of them.

## Technical audit - current blockers inside CBoard

### A. Legacy stack risk
Current foundation is materially outdated and unsuitable for a long-term production roadmap without modernization:
- Java 8
- Spring 4.3.7
- Spring Security 4.1
- Tomcat 7
- old JDBC drivers and legacy dependencies
- WAR packaging

Impact:
- higher security and maintenance risk
- slower onboarding for modern developers
- painful cloud deployment path
- weak compatibility with modern auth, observability, and container workflows

### B. Environment and secrets are not production-safe
The current configuration pattern includes local credentials and machine-specific paths.
Examples of issues:
- hardcoded MySQL connection values
- hardcoded username and password
- PhantomJS path bound to Windows desktop path
- local Redis assumptions

Impact:
- secrets leakage risk
- fragile deployments
- cannot run cleanly across environments
- no proper separation between local, staging, and production

### C. Data governance is not yet aligned to EX-EL
CBoard can display and analyze data, but EX-EL needs a governed business model:
- one canonical asset registry
- one assumptions registry
- one scenario engine
- one audit trail
- one source-of-truth layer for investor materials

Without this, dashboards will look good but still produce conflicting narratives.

## Business problem to solve
EX-EL is not "a dashboard". It needs a BI operating system for:
- investment underwriting
- hotel / rental / flip simulation
- sales proposal generation
- internal management reporting
- investor-grade output packs
- source control for assumptions and market evidence

## Wyndham OTP use-case - required source-of-truth model
The uploaded Wyndham / OTP material shows why governance is critical.
There are conflicting room-count references across materials, while valuation and performance assumptions are being used commercially.

### Canonical entities required
- Project
- Asset
- Building
- Unit / room type
- Scenario
- Assumption version
- Market evidence source
- Operating month / quarter / year
- Investor offer version

### Core fact tables required
1. Airport and market demand
   - passengers
   - overnight stays
   - hotel market supply
   - comp-set references

2. Hotel operating facts
   - ADR
   - Occupancy
   - RevPAR
   - room nights sold
   - ancillary revenue
   - payroll
   - utilities
   - management fees
   - FF&E reserve
   - NOI / EBITDA / FCF

3. Valuation facts
   - cap rate / exit yield
   - WACC
   - terminal value
   - EV
   - per-room value
   - NPV / IRR / MOIC

4. Investor unit economics
   - gross price
   - VAT
   - financing plan
   - milestone schedule
   - expected annual distributions
   - own-use effects if relevant
   - resale / exit sensitivity

5. Sales and CRM facts
   - lead source
   - meeting status
   - proposal sent
   - close rate
   - stage duration
   - owner / rep performance

## Mandatory contradiction register for Wyndham OTP
Create a governed contradiction table and never allow investor dashboards to bypass it.

Required columns:
- topic
- source document
- value found
- date
- owner
- status (Open / Resolved / Superseded)
- governing value
- explanation

Immediate contradiction examples to register:
- room count appears as 270 in valuation materials
- room count appears as 300 in one Wyndham forecast letter
- room count appears as 310 in another Wyndham confirmation letter
- valuation excludes ancillary lines while some commercial narratives include broader income logic

## Target data architecture

### Layer 1 - Raw Evidence
Store every file and market source exactly as received.
Examples:
- valuation PDFs
- brand letters
- investor presentations
- Excel simulations
- comps and market reports

### Layer 2 - Structured Staging
Normalize raw content into governed tables:
- dim_project
- dim_asset
- dim_unit
- dim_source
- dim_scenario
- fact_market
- fact_operations
- fact_valuation
- fact_sales_funnel
- fact_investor_offer

### Layer 3 - Business Semantics
Create business-ready measures and definitions:
- ADR
- Occupancy
- RevPAR
- NOI
- EBITDA
- FCF
- IRR
- Equity Multiple
- proposal conversion rate
- average time to meeting
- source ROI

### Layer 4 - Delivery Surfaces
- Executive dashboard
- Investment committee dashboard
- Sales management dashboard
- Investor one-pager generator
- Excel export engine
- scenario comparison view

## Dashboard suite to build

### 1) Executive Control Tower
Audience: CEO / founders / management
Shows:
- current pipeline value
- projects by stage
- top risks
- latest assumption version
- dashboard health / data freshness
- sales funnel velocity

### 2) Asset Performance Dashboard
Audience: underwriting / management
Shows:
- occupancy, ADR, RevPAR
- monthly and yearly trend
- comp-set comparison
- opex breakdown
- NOI bridge
- scenario deltas

### 3) Investor Yield Dashboard
Audience: sales + investor relations
Shows:
- entry price
- distribution forecast
- IRR / MOIC by scenario
- financing structure impact
- downside / upside cases
- holding-period comparison

### 4) Sales BI Dashboard
Audience: sales leadership
Shows:
- lead source quality
- response SLA
- call-to-meeting conversion
- meeting-to-offer conversion
- offer-to-close conversion
- rep leaderboard
- lost reason analytics

### 5) Data Governance Dashboard
Audience: operations / management
Shows:
- unresolved contradictions
- stale sources
- missing fields
- unapproved assumptions
- version drift between Excel, deck, and investor pack

## Product direction - what to modernize inside the repo

### Phase 1: Stabilize
- externalize all secrets into environment variables
- remove local passwords from tracked config
- replace machine-bound PhantomJS dependency
- define local / staging / prod configuration profiles
- document deterministic startup flow

### Phase 2: Modernize
- move to modern Java runtime
- upgrade Spring / security stack
- containerize app and dependencies
- introduce API contracts for governed datasets
- add structured logging and health checks

### Phase 3: Specialize for EX-EL
- build hospitality + real estate semantic model
- add scenario engine tables
- add contradiction register
- add investor pack export layer
- add CRM metrics model aligned to PRIME / EX-EL flows

## Recommended implementation sequence
1. Freeze source-of-truth definitions
2. Build contradiction register for Wyndham OTP
3. Create governed schema for market + operations + valuation + CRM
4. Connect BI core to governed tables only
5. Build executive dashboard first
6. Build investor dashboard second
7. Build sales BI third
8. Add export and PDF-ready output last

## Non-negotiable rules
- No hardcoded credentials in repo
- No investor-facing metric without source owner and version
- No dashboard measure without business definition
- No scenario presented without base / downside / upside
- No commercial deck may bypass the contradiction register

## 30 / 60 / 90 day roadmap

### 0-30 days
- harden configuration
- define governed schema
- register all OTP contradictions
- map Excel inputs to canonical tables
- publish Executive Control Tower v1

### 31-60 days
- deliver Asset Performance dashboard
- deliver Investor Yield dashboard
- add scenario and sensitivity engine
- add source freshness monitoring

### 61-90 days
- deliver Sales BI dashboard
- add automated investor output generation
- add permissions by role
- add deployment guide and environment templates

## Success definition
The system is successful when:
- management sees one number for each governed KPI
- sales, underwriting, and investor materials all pull from the same logic
- contradictions are visible and owned, not hidden
- dashboards become a control layer, not a decoration layer
- Excel models, decks, and BI all speak the same language

## Final recommendation
Do not treat GitHub repos equally.
Use CBoard as the technical BI core candidate, and treat the other dashboard repositories as reference libraries.
The real moat is not more charts. The real moat is governed assumptions, controlled semantics, and one operational truth across Excel, BI, CRM, and investor-facing materials.
