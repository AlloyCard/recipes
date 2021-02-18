package config

import (
	"fmt"

	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

// Config summarises all environment variables.
type Config struct {
	AlloyKey   string   `mapstructure:"alloy_key"`
	AlloyURL   string   `mapstructure:"alloy_url"`
	Database   Database `mapstructure:",squash"`
	LogLevel   string   `mapstructure:"log_level"`
	JWTTimeout int      `mapstructure:"jwt_timeout_seconds"`
	JWTKeyPath string   `mapstructure:"jwt_key_path"`
	RecipeID   string   `mapstructure:"recipe_id"`
	Server     Server   `mapstructure:",squash"`
}

// Database summarises all Database variables.
type Database struct {
	Driver string `mapstructure:"database_driver"`
	Host   string `mapstructure:"database_host"`
	Name   string `mapstructure:"database_name"`

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
func Load() *Config {
	if cfg != nil {
		return cfg
	}
	logrus.Info("Loading envs.")

	viper.SetDefault("ALLOY_URL", "http://192.168.15.8:8080")
	viper.SetDefault("DATABASE_DRIVER", "mysql")
	viper.SetDefault("DATABASE_HOST", "172.17.0.2:3306")
	viper.SetDefault("DATABASE_NAME", "recipe_subscription_manager")
	viper.SetDefault("DATABASE_PASSWORD", "H7ef2ZZVcA")
	viper.SetDefault("DATABASE_USER", "alloy_dba")
	viper.SetDefault("LOG_LEVEL", "WARN")
	viper.SetDefault("JWT_TIMEOUT_SECONDS", 5)
	viper.SetDefault("JWT_KEY_PATH", "./jwtRSA256-private.pem")
	viper.SetDefault("PORT", 8092)
	viper.SetDefault("RECIPE_ID", "e39d4518-1dd4-4bff-884d-51ca6162d33e")

	viper.AutomaticEnv()
	if err := viper.Unmarshal(&cfg); err != nil {
		logrus.WithError(err).Fatal("Error in load Enviromnts variables.")
		return nil
	}

	cfg.Database.DSN = fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true",
		cfg.Database.User,
		cfg.Database.Password,
		cfg.Database.Host,
		cfg.Database.Name)

	return cfg
}
