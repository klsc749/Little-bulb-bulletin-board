// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  if(event.due && event.description && event.groupID)
  {    
    await db.collection('todos').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        description: event.description,
        due: event.due,
        groupID : event.groupID,
      }
    })
    return 1
  }
  return 0;
}