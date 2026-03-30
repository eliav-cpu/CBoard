CREATE TABLE dim_scenario (
  scenario_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  scenario_code VARCHAR(64) NOT NULL UNIQUE,
  scenario_name VARCHAR(128) NOT NULL,
  scenario_type VARCHAR(32) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE
);
