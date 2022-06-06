// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const result = await cloud.openapi.subscribeMessage.send({
            touser: event.openid, //要推送给那个用户
            page: 'pages/index/index',//要跳转到的程序页面（通常是小程序首页，咱们就是代办首页）
            data: {// 推送的内容
                name1: {           //name1,date2,phrase3这些对应后台订阅模板的详细信息里有说明，注意内容格式要于模板相符比如日期格式啥的
                    value: '暮光'
                },
                date2: {
                    value: '2022年5月26日 19:42'
                },
                phrase3: {
                    value: '暮色'
                },
                character_string4: {
                    value: '5201314'
                }
            },
            templateId: 'B3qSyoozNE82rsWpxTzVP2OWD4laYvY5iJDhGRaA_Cs'  //模板id
        })
        console.log(result)
        return result
    }  catch (err){
        console.log(err)
        return err
    }
}