CREATE TABLE dim_asset (
  asset_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  project_id BIGINT NOT NULL,
  asset_code VARCHAR(64) NOT NULL UNIQUE,
  asset_name VARCHAR(255) NOT NULL,
  address_line VARCHAR(255),
  airport_code VARCHAR(16),
  planned_room_count INT,
  governing_room_count INT
);
