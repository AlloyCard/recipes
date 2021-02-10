# Subscription Manager

Helps the user to follow your charges from subscription services and manage them.

## Routes

| Method |           Route            |         Description       |
|--------|----------------------------|---------------------------|
| POST   | `/users`                    | insert new user          |
| POST   | `/users/{code}/transactions` | insert transaction      |

## Migration

```sql
CREATE SCHEMA `recipe_subscription_manager`;

USE `recipe_subscription_manager`;

CREATE TABLE `transaction` (
  `id` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
);

CREATE TABLE `recipe_subscription_manager`.`merchant` (
  `id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);

CREATE USER 'alloy_dba'@'localhost' IDENTIFIED BY 'aGVmjaSByA';
GRANT SELECT, INSERT ON `transaction` TO 'alloy_dba'@'localhost';
```
