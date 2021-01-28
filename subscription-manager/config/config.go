package config

import (
	"fmt"

	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

// Config summarises all environment variables.
type Config struct {
	Database Database `mapstructure:",squash"`
	LogLevel string   `mapstructure:"log_level"`
	Server   Server   `mapstructure:",squash"`
}

// Database summarises all Database variables.
type Database struct {
	Driver   string `mapstructure:"database_driver"`
	Host     string `mapstructure:"database_host"`
	Name     string `mapstructure:"database_name"`
	Password string `mapstructure:"database_password"`
	User     string `mapstructure:"database_user"`

	DSN string
}

// Server summarises all Server variables.
type Server struct {
	Port int `mapstructure:"port"`
}

var (
	cfg *Config
)

// Load return all environment variables loaded.
func Load() (*Config, error) {
	if cfg != nil {
		return cfg, nil
	}
	logrus.Info("Loading envs.")

	viper.SetDefault("DATABASE_DRIVER", "mysql")
	viper.SetDefault("DATABASE_HOST", "172.17.0.2:3306")
	viper.SetDefault("DATABASE_NAME", "recipe_subscription_manager")
	viper.SetDefault("DATABASE_PASSWORD", "H7ef2ZZVcA")
	viper.SetDefault("DATABASE_USER", "alloy_dba")
	viper.SetDefault("LOG_LEVEL", "WARN")
	viper.SetDefault("PORT", 8092)

	viper.AutomaticEnv()
	if err := viper.Unmarshal(&cfg); err != nil {
		return nil, err
	}

	cfg.Database.DSN = fmt.Sprintf("%s:%s@tcp(%s)/%s",
		cfg.Database.User,
		cfg.Database.Password,
		cfg.Database.Host,
		cfg.Database.Name)

	return cfg, nil
}
