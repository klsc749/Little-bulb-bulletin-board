// pages/users/users.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"用户",
    school:"北京邮电大学",
    array:["2022WEB开发","果园2020物联网大班群"],
    url:"/resourse/icons/微信图片_20220427184610.jpg"
  },



  modifyer: function(e){
    var that = this;
    wx.showModal({
      cancelColor: 'cancelColor',
      title:"修改个人信息，记得加斜杠 /",
      editable:true,
      content:'',
      placeholderText:'样例：姓名/学校',
      success (res){
        if(res.confirm){
          var s=res.content.split("/");
          that.setData({
            name:s[0],
            school:s[1]
          });
          wx.setStorage({
            key:"names",
            data:s[0]
          })
        }
        else{
          console.log("cancle");
        }
      },
      fail (res){
        console.log(res);
        console.log("fail");
      }
    })
  },

  tuisong: function (e) {
   wx.showModal({
     cancelColor: 'cancelColor',
     content:'',
     placeholderText:'是否关闭推送',
     cancelText:'关闭',
     confirmText:'开启',
     title:'推送开关',
     success (res) {
       if(res.confirm)
       {
         //开启
       }
       else{
         console.log("cancle");
       }
     }
   })
  },

  bugReport: function(e) {
    wx.showModal({
      cancelColor: 'cancelColor',
      confirmText:'发送',
      editable:true,
      placeholderText:'哪儿有BUG呀？',
      title:'BUG反馈',
      content:'',
      success (res) {
        if(res.confirm) {
          console.log(res.content);
          wx.cloud.init();
          wx.cloud.callFunction({
          name : 'AddBugs',
          data : {
            description:res.content
            },
          success : function(ress){
            console.log(ress.result);
        },
          fail: console.error
          });
        }
        
        else{
          console.log("cancle");
        }
      },
      fail (res) {
        console.log("fail");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key:"names",
      success (res) {
        that.setData({
          name:res.data
        })
      },
      fail (res) {
        console.log("fail"+res);
      }
    })
    var app=getApp();
    this.setData({
      url:app.globalData.userInfo
    })
    console.log(this.url);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})