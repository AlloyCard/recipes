# Subscription Manager

Helps the user to follow your charges from subscription services and manage them.

## Routes

| Method |           Route            |         Description       |
|--------|----------------------------|---------------------------|
| POST   | `/users`                    | insert new user          |
| POST   | `/users/{code}/transactions` | insert transaction      |

## Database

```sql
CREATE SCHEMA `recipe_subscription_manager`;

USE `recipe_subscription_manager`;

CREATE TABLE `user` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`)
);
```
