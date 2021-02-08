package jwt

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go/service/kms"
)

func BuildRecipeToken(recipeId string, keyId string) {
	header := map[string]string{
		"alg": "RS256",
		"typ": "JWT",
		"kid": fmt.Sprintf(`AlloyPrincipal-%s`, recipeId),
	}
	payload := map[string]interface{}{
		"exp":                  time.Now().UTC().Add(time.Second * 60).UnixNano(),
		"iat":                  time.Now().UTC().UnixNano(),
		"iss":                  "AlloyCard",
		"custom:principalId":   recipeId,
		"custom:principalType": "com.alloycard.core.entities.recipe.Recipe",
	}

	headerMarshal, _ := json.Marshal(header)
	// TODO log err
	headerEncoded := base64.StdEncoding.EncodeToString(headerMarshal)

	payloadMarshal, _ := json.Marshal(payload)
	// TODO log err
	payloadEncoded := base64.StdEncoding.EncodeToString(payloadMarshal)

	input := kms.SignInput{
		KeyId: &keyId,
		// Message: []byte(message),
		MessageType:      "RAW",
		SigningAlgorithm: "RSASSA_PKCS1_V1_5_SHA_256",
	}
}
