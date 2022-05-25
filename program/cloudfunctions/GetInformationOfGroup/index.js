// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    if(event.groupID){
        return await cloud.database().collection('groups').where({
            _id : event.groupID
        }).get()        
    }
    return 0
 
}