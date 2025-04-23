package main

import (
	"math/rand/v2"
	"net/http"

	"github.com/gin-gonic/gin"
)

type populationRequest struct {
	Lat    float64 `json:"lat"`
	Lng    float64 `json:"lng"`
	Radius float64 `json:"radius"`
}

type populationResponse struct {
	Population int `json:"population"`
}

func postPopulationRequest(c *gin.Context) {
	var request populationRequest

	// Call BindJSON to bind the received JSON to newAlbum.
	if err := c.BindJSON(&request); err != nil {
		return
	}

	response := populationResponse{Population: rand.IntN(100000)}
	c.JSON(http.StatusOK, response)
}

func main() {
	router := gin.Default()
	router.Static("/", "./static")
	router.POST("/population", postPopulationRequest)
	router.Run("localhost:8000")
}
