CREATE TABLE fact_investor_offer (
  offer_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  asset_code VARCHAR(64) NOT NULL,
  scenario_code VARCHAR(64) NOT NULL,
  offer_version VARCHAR(64) NOT NULL,
  offer_date DATE NOT NULL,
  gross_price_value DECIMAL(14,2),
  net_price_value DECIMAL(14,2),
  vat_pct DECIMAL(8,4),
  down_payment_pct DECIMAL(8,4),
  hold_period_years INT,
  projected_irr_pct DECIMAL(8,4),
  projected_moic DECIMAL(12,4)
);
