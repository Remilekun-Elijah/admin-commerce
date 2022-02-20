 CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- initialize the database name;
CREATE DATABASE IF NOT EXISTS eshop;

DROP TABLE IF EXISTS accounts;
DROP TYPE IF EXISTS status CASCADE;

CREATE TYPE status AS ENUM('pending', 'verified', 'suspended', 'banned');

-- ACCOUNT TABLE
CREATE TABLE accounts(
  "id" uuid DEFAULT uuid_generate_v4(),
  "full_name" varchar(255) NOT NULL,
  "email" varchar(100) NOT NULL UNIQUE,
  "hashed_password" varchar(255) NOT NULL,
  "pin" varchar(6),
  "status" status DEFAULT 'pending',
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS permissions;
DROP TYPE IF EXISTS permission CASCADE;

CREATE TYPE permission as ENUM('user', 'admin', 'super_admin');
-- PERMISSION TABLE
CREATE TABLE permissions(
  "id" uuid DEFAULT uuid_generate_v4(),
  "sid" uuid NOT NULL REFERENCES accounts ("id") ON DELETE CASCADE,
  "name" permission DEFAULT 'user',
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS profiles;
-- PROFILE TABLE
CREATE TABLE profiles(
  "id" uuid DEFAULT uuid_generate_v4(),
  "sid" uuid NOT NULL REFERENCES accounts ("id") ON DELETE CASCADE,
  "full_name" varchar(255) NOT NULL,
  "display_name" varchar(100),
  "email" varchar(100) NOT NULL UNIQUE,
  "number" varchar(50),
  "dob" date,
  "address" jsonb,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS settings;
-- SETTINGS TABLE
CREATE TABLE settings(
  "id" uuid DEFAULT uuid_generate_v4(),
  "sid" uuid NOT NULL REFERENCES accounts ("id") ON DELETE CASCADE,
  "notification" jsonb,
  "security" jsonb,
  "activity" jsonb,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  PRIMARY KEY ("id")
);
