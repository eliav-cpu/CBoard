# Wyndham OTP Governed Data Model

## Goal
Define one governed business model for Wyndham Garden Bucharest Airport inside EX-EL.

## Canonical entities
- Project
- Asset
- Unit Type
- Source Document
- Scenario
- Investor Offer Version
- Sales Activity Day
- Contradiction Record

## Required dimensions

### dim_project
Fields:
- project_code
- project_name
- country_code
- city_name
- asset_class
- status_name

### dim_asset
Fields:
- asset_code
- asset_name
- address_line
- airport_code
- planned_room_count
- governing_room_count

### dim_unit_type
Fields:
- unit_type_code
- unit_type_name
- room_class
- sellable_area_sqm
- expected_key_count

### dim_source_document
Fields:
- source_code
- source_title
- source_type
- source_owner
- source_date
- source_version
- trust_level
- file_reference

### dim_scenario
Fields:
- scenario_code
- scenario_name
- scenario_type
- is_default

## Required facts

### fact_market_snapshot
Metrics:
- passengers_total
- overnight_stays_total
- hotel_supply_rooms
- branded_supply_rooms
- comp_set_avg_adr
- comp_set_avg_occ_pct
- comp_set_avg_revpar

### fact_hotel_operations_period
Metrics:
- rooms_available
- rooms_sold
- occupancy_pct
- adr_eur
- revpar_eur
- room_revenue_eur
- ancillary_revenue_eur
- payroll_eur
- utilities_eur
- management_fee_eur
- marketing_fee_eur
- ffe_reserve_eur
- noi_eur
- ebitda_eur
- fcf_eur

### fact_valuation_snapshot
Metrics:
- room_value_eur
- hotel_value_eur
- present_value_room_eur
- wacc_pct
- exit_yield_pct
- terminal_value_eur
- npv_eur
- irr_pct
- equity_multiple

### fact_investor_offer
Metrics:
- gross_price_eur
- net_price_eur
- vat_pct
- down_payment_pct
- milestone_plan_text
- expected_distribution_year_1_eur
- expected_distribution_year_2_eur
- hold_period_years
- projected_irr_pct
- projected_moic

### fact_sales_funnel_daily
Metrics:
- leads_created
- calls_attempted
- meetings_set
- meetings_held
- offers_sent
- deals_won
- deals_lost
- pipeline_value_eur

## Contradiction register
A contradiction register is mandatory for Wyndham OTP.

Fields:
- topic_name
- source document
- value_found
- observed_date
- status_name
- governing_value
- owner_name
- explanation_text

## Immediate contradictions to register
- Room count reported as 270 in valuation materials
- Room count reported as 300 in one Wyndham forecast letter
- Room count reported as 310 in one Wyndham confirmation letter
- Valuation logic excludes ancillary lines while some commercial materials imply broader income framing

## Dashboard binding rule
No investor dashboard, valuation widget, or sales output may bypass the contradiction register.
