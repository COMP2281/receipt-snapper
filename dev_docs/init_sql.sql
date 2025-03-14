PRAGMA foreign_keys = ON;

CREATE TABLE User (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE Project (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE Category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE Currency (
  code TEXT PRIMARY KEY
);

CREATE TABLE Location (
  code TEXT PRIMARY KEY
);

CREATE TABLE Status (
  name TEXT PRIMARY KEY
);

CREATE TABLE CardData (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  currency_code TEXT NOT NULL,
  amount INTEGER NOT NULL,
  payment_exchange_rate INTEGER NOT NULL,
  payment_amount INTEGER NOT NULL,
  exchange_override TEXT NOT NULL,
  location_code TEXT NOT NULL,
  FOREIGN KEY (currency_code) REFERENCES Currency (code),
  FOREIGN KEY (location_code) REFERENCES Location (code)
);

CREATE TABLE Expense (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  description TEXT,
  company_paid TEXT,
  amount INTEGER NOT NULL,
  currency_code TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  category_id INTEGER,
  location_code TEXT NOT NULL,
  line_item_id INTEGER,
  project_id TEXT,
  status TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User (id),
  FOREIGN KEY (currency_code) REFERENCES Currency (code),
  FOREIGN KEY (category_id) REFERENCES Category (id),
  FOREIGN KEY (location_code) REFERENCES Location (code),
  FOREIGN KEY (status) REFERENCES Status (name),
  FOREIGN KEY (line_item_id) REFERENCES CardData (id),
  FOREIGN KEY (project_id) REFERENCES Project (id)
);