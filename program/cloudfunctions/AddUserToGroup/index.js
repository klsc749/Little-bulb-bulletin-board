// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    if(event.userID && event.groupID)
    {    
      await db.collection('userOfGroup').add({
        // data 字段表示需新增的 JSON 数据
        data: {
            userID : event.userID,
            groupID : event.groupID,
        }
      })
      return 1
    }
    return 0;
}