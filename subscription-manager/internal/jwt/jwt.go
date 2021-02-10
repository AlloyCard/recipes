package jwt

import (
	"fmt"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	helper "github.com/dgrijalva/jwt-go/test"
)

// BuildJWT buildwith private key
func BuildJWT(recipeID string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodRS256, jwt.MapClaims{
		// TODO move timeout to env
		"exp":                  time.Now().UTC().Add(time.Second * 60).Unix(),
		"iat":                  time.Now().UTC().Unix(),
		"iss":                  "AlloyCard",
		"custom:principalId":   recipeID,
		"custom:principalType": "com.alloycard.core.entities.recipe.Recipe",
	})
	token.Header["kid"] = fmt.Sprintf(`AlloyPrincipal-%s`, recipeID)

	// TODO move pem's path to env
	privateKey := helper.LoadRSAPrivateKeyFromDisk("./jwtRSA256-private.pem")

	return token.SignedString(privateKey)
}
