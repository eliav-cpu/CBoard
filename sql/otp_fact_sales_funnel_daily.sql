CREATE TABLE fact_sales_funnel_daily (
  sales_funnel_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  project_code VARCHAR(64) NOT NULL,
  activity_date DATE NOT NULL,
  source_channel VARCHAR(128),
  campaign_name VARCHAR(255),
  owner_name VARCHAR(255),
  leads_created INT DEFAULT 0,
  calls_attempted INT DEFAULT 0,
  meetings_set INT DEFAULT 0,
  meetings_held INT DEFAULT 0,
  offers_sent INT DEFAULT 0,
  deals_won INT DEFAULT 0,
  deals_lost INT DEFAULT 0,
  pipeline_value DECIMAL(16,2)
);
