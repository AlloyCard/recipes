# Subscription Manager

Helps the user to follow your charges from subscription services and manage them.

## Routes

| Method |           Route            |             Description            |
|--------|----------------------------|------------------------------------|
| POST   | `/webhook`                 | webhook resource to consume events |

## Migration

```sql
CREATE SCHEMA `recipe_subscription_manager`;

USE `recipe_subscription_manager`;

CREATE TABLE `recipe_subscription_manager`.`merchant` (
  `id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);

INSERT INTO `recipe_subscription_manager`.`merchant`
VALUES (UUID(), "Netflix"), (UUID(), "Amazon"), (UUID(), "Youtube");

CREATE TABLE `recipe_subscription_manager`.`transaction` (
  `id` VARCHAR(45) NOT NULL,
  `merchant` VARCHAR(45) NOT NULL,
  `amount` DECIMAL(6,2) NOT NULL,
  `recipe_install` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`merchant`) REFERENCES `recipe_subscription_manager`.`merchant` (`name`));

CREATE USER 'alloy_dba'@'localhost' IDENTIFIED BY 'aGVmjaSByA';
GRANT SELECT, INSERT ON `transaction` TO 'alloy_dba'@'localhost';
```
