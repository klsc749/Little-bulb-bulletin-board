// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
    if(event.groupName)
    {
      const id = await db.collection('groups').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          groupName : event.groupName,
          creator : cloud.getWXContext().OPENID,
        }
      })
      await db.collection('userOfGroup').add({
        data : {
          userID : cloud.getWXContext().OPENID,
          groupID : id._id
        }
      })
      return 1
    }
    return 0;
  }