package jwt

import (
	"fmt"
	"subscription-manager/internal/config"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	helper "github.com/dgrijalva/jwt-go/test"
)

var (
	cfg = config.Load()
)

// BuildJWT buildwith private key
func BuildJWT(recipeID string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodRS256, jwt.MapClaims{
		"exp":                  time.Now().UTC().Add(time.Second * time.Duration(cfg.JWTTimeout)).Unix(),
		"iat":                  time.Now().UTC().Unix(),
		"iss":                  "AlloyCard",
		"custom:principalId":   recipeID,
		"custom:principalType": "com.alloycard.core.entities.recipe.Recipe",
	})
	token.Header["kid"] = fmt.Sprintf(`AlloyPrincipal-%s`, recipeID)

	privateKey := helper.LoadRSAPrivateKeyFromDisk(cfg.JWTKeyPath)

	return token.SignedString(privateKey)
}
