// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  if(event.due && event.description && event.groupID)
  {    
    var id = await db.collection('todos').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        description: event.description,
        due: event.due,
        groupID : event.groupID,
      }
    })
    var data = await db.collection('userOfGroup').where({
      groupID : event.groupID
    }).get()

    var s = data.data;
    const _ = db.command
    for( i = 0; i < s.length; i++)
    {
      db.collection("users").doc(s[i].userID).update({
        data: {
          todoIDs: _.addToSet(id._id)
        }
      })
    }
    return 1
  }
  return 0;
}