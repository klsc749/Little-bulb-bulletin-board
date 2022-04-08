// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    }),
    wx.cloud.init();
    wx.cloud.callFunction({
    name : 'AddTodo',
    data : {
        description : "Web开发",
        due : "2018-04-02",
        groupID : "45" //通过查询获得
    },
    success : function(res){
        console.log(res.result);
        if(res.result == 0){
            //添加失败
            console.log("fail");
        }else if(res.result == 1){
            //添加成功
            console.log("succeed");
		}
    },
    fail: console.error
  });
  
  },
  globalData: {
    userInfo: null,
    testToDoList:null
  },

})
