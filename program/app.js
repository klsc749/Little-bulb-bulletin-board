// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    var that=this;
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.cloud.init();
    wx.cloud.callFunction({
      name: "GetOpenId"
    }).then(res =>{
      console.log("获取openid成功",res);
      var userId=res.result.openid;
      console.log(userId);
      wx.setStorageSync('openid', userId)
    }).catch(res => {
      console.log("获取openid失败",res)
    })

    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // let code=res.code;
        // wx.request({
        //   url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx33d46f82d9b60c8f&secret=fb30a4a6929519085221501b61062a99&js_code=${code}&grant_type=authorization_code`,
        //    success:(res)=>{
        //     //console.log(res);
        //     var userId=res.data.openid;
        //     wx.setStorageSync('openid', userId)
        //     //console.log(userId);
        //    }
        //  })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  

  },
  globalData: {
    userInfo:"",
    testToDoList:null,
    groupName:[],
    globalList:[],
    userGroup:[]
  },

})
