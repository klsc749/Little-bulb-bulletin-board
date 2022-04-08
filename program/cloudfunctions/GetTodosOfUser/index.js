// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    if(event.userID)
    {
        try {
            var s =  await db.collection('users').where({
                _id : event.userID// 填入当前用户 openid
            }).get()
            var data = s.data
            return data[0].todoIDs
        } catch(e) {
            console.error(e)
        }
    }
    else{
        return 0
    }
}