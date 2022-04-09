// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    if(event.userID || event.todoID)
    {
        try {
            await db.collection('todosOfUser').where({
                userID : event.userID,
                todoID : event.todoID
            }).update({
                data: {
                  done : 1
                },
              })
            return 1
        } catch(e) {
            console.error(e)
        }
    }
    else{
        return 0
    }
}