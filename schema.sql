DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id TEXT UNIQUE NOT NULL,
  name TEXT,
  occasion TEXT,
  style TEXT,
  user_details TEXT,
  lyrics TEXT,
  status TEXT NOT NULL,
  audio_links TEXT, -- Stored as a JSON string
  preview_path TEXT, -- Path to the generated preview snippet
  payment_status TEXT DEFAULT 'unpaid',
  paypal_order_id TEXT,
  email TEXT,
  error_message TEXT,
  ip_address TEXT,
  country TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  paid_at TIMESTAMP
);