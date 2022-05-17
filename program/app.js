// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    var that=this;
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getUserInfo({
      success (res) {
        var userinfo=res.userInfo;
        var ava=userinfo.avatarUrl;
        that.globalData.userInfo=ava;
      }
    });
    wx.getStorage({
      key:'isNew',
      success (res) {
        console.log("old");
      },
      fail(res) {
        wx.setStorage({
          key:'isNew',
          data:1
        })
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
  },
  globalData: {
    userInfo: null,
    testToDoList:null
  },

})
