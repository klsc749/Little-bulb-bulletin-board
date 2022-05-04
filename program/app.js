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
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    /*
    wx.cloud.init();
//<<<<<<< HEAD
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
  */
//=======
  //   wx.cloud.callFunction({
  //   name : 'AddTodo',
  //   data : {
  //       description : "Web开发",
  //       due : "2018-04-02",
  //       groupID : "45" //通过查询获得
  //   },
  //   success : function(res){
  //       console.log(res.result);
  //       if(res.result == 0){
  //           //添加失败
  //           console.log("fail");
  //       }else if(res.result == 1){
  //           //添加成功
  //           console.log("succeed");
	// 	}
  //   },
  //   fail: console.error
  // });
  
//>>>>>>> 3708068bb01059cf628d63e3f9fb5246baa3c522
  },
  globalData: {
    userInfo: null,
    testToDoList:null
  },

})
