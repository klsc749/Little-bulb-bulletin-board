// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    if(event.userID){
        return await cloud.database().collection("groups").where({
            creator : event.userID,
        }).get()
    }
    return 0
}