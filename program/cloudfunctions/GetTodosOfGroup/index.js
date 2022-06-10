// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    if(event.groupID)
    {
        try {
            return await db.collection('todos').where({
                groupID : event.groupID// 填入当前用户 openid
            }).get()
        } catch(e) {
            console.error(e)
        }
    }
    else{
        return 0
    }
}