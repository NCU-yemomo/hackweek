package memory

import (
	"log"
	"nothing/config"

	"github.com/gin-gonic/gin"
	uuid2 "github.com/google/uuid"
)

func DeleteMemory(c *gin.Context) {
	uuid, err := uuid2.Parse(c.Param("uuid"))
	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{
			"code":    400,
			"message": "uuid 输入错误",
		})
		return
	}
	result := config.Db.Delete(&config.Memory{}, uuid)
	if result.Error != nil || result.RowsAffected != 1 {
		log.Println(result.Error)
		c.JSON(400, gin.H{
			"code":    400,
			"message": "删除失败",
		})
		return
	}
	var user config.User
	username := c.GetString("username")
	config.Db.Where("username = ?", username).First(&user)
	user.MemoryCount--
	config.Db.Save(&user)
	c.JSON(200, gin.H{
		"code":    200,
		"message": "删除成功",
	})
}
