CREATE TABLE governance_contradiction_register (
  contradiction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  topic_name VARCHAR(255) NOT NULL,
  source_document_title VARCHAR(255) NOT NULL,
  value_found VARCHAR(255) NOT NULL,
  observed_date DATE,
  status_name VARCHAR(32) NOT NULL,
  governing_value VARCHAR(255),
  owner_name VARCHAR(255),
  explanation_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contradiction_status ON governance_contradiction_register (status_name);
