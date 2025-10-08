DROP DATABASE IF EXISTS Practice; 
CREATE DATABASE Practice;
USE Practice;  

CREATE TABLE users(
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    public_key TEXT,
    private_key_encrypted TEXT
);

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    content VARCHAR(1000) NOT NULL,
    content_hash VARCHAR(255),         -- For integrity
    signature TEXT,                    -- For non-repudiation
    constraint user1 FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);