CREATE TABLE fact_valuation_snapshot (
  valuation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  asset_code VARCHAR(64) NOT NULL,
  scenario_code VARCHAR(64) NOT NULL,
  valuation_date DATE NOT NULL,
  room_value DECIMAL(14,2),
  hotel_value DECIMAL(14,2),
  present_value_room DECIMAL(14,2),
  wacc_pct DECIMAL(8,4),
  exit_yield_pct DECIMAL(8,4),
  terminal_value DECIMAL(16,2),
  npv_value DECIMAL(16,2),
  irr_pct DECIMAL(8,4),
  equity_multiple DECIMAL(12,4)
);
