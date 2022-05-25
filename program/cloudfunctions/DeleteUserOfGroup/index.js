// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    if(event.userID && event.groupID){
        try {
            await cloud.database().collection('userOfGroup').where({
                userID : event.userID,
                groupID : event.groupID
            }).remove()                
        } catch (error) {
            return 0
        }
        return 1;
    }
    return 0;
}