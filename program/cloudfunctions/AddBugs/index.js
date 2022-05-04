// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    if(event.description)
    {    
      await db.collection('bug').add({
        // data 字段表示需新增的 JSON 数据
        data: {
            userid : cloud.getWXContext().OPENID,
            name : event.description,
        }
      })
      return 1
    }
    return 0;
}