CREATE DATABASE 'edii_assignment';
USE DATABASE 'edii_assignment';

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'candidate_employee'
);


INSERT INTO users (email, password, role) VALUES (
    "admin@email.com", "admin123", "admin");

CREATE TABLE candidate_employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    position VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    identity_number VARCHAR(16) NOT NULL,
    place_and_date_of_birth VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    religion VARCHAR(255) NOT NULL,
    blood_type VARCHAR(255) NOT NULL,
    marital_status VARCHAR(255) NOT NULL,
    address_in_identity_card VARCHAR(255) NOT NULL, 
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    emergency_contact_name VARCHAR(255) NOT NULL,
    skills VARCHAR(255) NOT NULL,
    ready_to_be_placed BOOLEAN NOT NULL,
    salary_expectation BIGINT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)

INSERT INTO candidate_employees (user_id, position, name, identity_number, place_and_date_of_birth, gender, religion,
 blood_type, marital_status, address_in_identity_card, address, email, phone_number, emergency_contact_name, skills, ready_to_be_placed,
 salary_expectation) VALUES (1, "FulLstack Developer", "Damar Anshary", "1234567890123456", "Bandung, 17 Mei 2002", "Laki-Laki", 
 "Islam", "A", "Belum Menikah", "Bandung", "Bandung", "damar@email.com", "081234567890", "Mamah", "Frontend, Backend", true, "50000000");

 CREATE TABLE last_educations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_employee_id INT NOT NULL,
    level VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    major VARCHAR(255) NOT NULL,
    graduation_year VARCHAR(255) NOT NULL,
    grade VARCHAR(255) NOT NULL,
    FOREIGN KEY (candidate_employee_id) REFERENCES candidate_employees(id)
)

CREATE TABLE training_experiences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_employee_id INT NOT NULL,
    training_name VARCHAR(255) NOT NULL,
    certificate BOOLEAN NOT NULL,
    training_year VARCHAR(255) NOT NULL,
    FOREIGN KEY (candidate_employee_id) REFERENCES candidate_employees(id)
)

CREATE TABLE work_experiences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_employee_id INT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    work_year VARCHAR(255) NOT NULL,
    salary BIGINT NOT NULL,
    FOREIGN KEY (candidate_employee_id) REFERENCES candidate_employees(id)
)