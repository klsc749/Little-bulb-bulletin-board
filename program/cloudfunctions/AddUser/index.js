// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    if(event.name)
    {    
      try {
        await db.collection('users').add({
          // data 字段表示需新增的 JSON 数据
          data: {
              _id : wxContext.OPENID,
              name : event.name,
          }
        })
        return 1
      }catch(e) {
            console.error(e)
      }
    }
    return 0;
}