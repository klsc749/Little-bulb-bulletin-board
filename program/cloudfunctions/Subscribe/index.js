// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    try{
        const result = await cloud.openapi.subscribeMessage.send({
            touser : wxContext.OPENID,
            page : "pages/toDoList/toDoList",
            data : event.data,
            templateId : "GhSSse7NK-lKyu4HLHWuaQXhZzYoN6vIXpsfB2JWlV",
            miniprogramState: 'developer'
        })
        console.log(result)
        return result;
    }catch(err){
        console.log(err)
        return err
    }

    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}