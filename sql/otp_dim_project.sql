CREATE TABLE dim_project (
  project_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  project_code VARCHAR(64) NOT NULL UNIQUE,
  project_name VARCHAR(255) NOT NULL,
  country_code VARCHAR(8),
  city_name VARCHAR(128),
  asset_class VARCHAR(64),
  status_name VARCHAR(64)
);
