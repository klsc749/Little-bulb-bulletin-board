// pages/users/users.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"用户",
    school:"北京邮电大学",
    array:[],
    url:""
  },

  setGroup: function(e) {
    wx.showModal({
      cancelColor: 'cancelColor',
      title:"请输入群ID",
      editable:true,
      placeholderText:"请输入群组ID",
      content:"",
      success (ress) {
        if(ress.confirm)
        {
          console.log(ress.content);
          console.log(typeof ress.content);
          var userID=wx.getStorageSync('openid');
          wx.cloud.init();
          wx.cloud.callFunction({
          name : 'AddUserToGroup',
          data : {
              userID : userID,//测试用成员ID
              groupID : ress.content,
          },
          success : function(res){
              console.log(res.result);
              if(res.result == 0){
                  //添加失败
                  console.log("fail to add user");
                  wx.showToast({
                    title: '添加失败',
                    icon:"error",
                    duration:1000,
                  })
              }else if(res.result == 1){
                  //添加成功
                  console.log("succeed to add user");
                  wx.showToast({
                    title: '添加成功',
                    icon:"success",
                    duration:1000,
                  })
              }
          },
          fail: console.error
          });
        }
        else{
          console.log("cancle");
        }
      },
      fail (e){

      }
    })
    

  },
  get:function(e) {
    var that=this;
    wx.getUserProfile({
      desc:"用以获取头像和用户ID",
      success (res) {
        console.log("come in success");
        var userinfo=res.userInfo;
        //console.log(res);
        var ava=userinfo.avatarUrl;
        console.log(ava);
        wx.setStorageSync('ava', ava);
        that.setData({
          url:ava
        })
      },
      fail (res){
        console.log(res);
      }
    });
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
  outGroup: function(e) {
    console.log(e);
    var thisapp=getApp();
    var i=parseInt(e.currentTarget.id)
    var userID=wx.getStorageSync('openid');
    wx.showModal({
      cancelColor: 'cancelColor',
      title:"是否确定退出该群？",
      success (res) {
        console.log(res);
        if(res.confirm){
          wx.cloud.init();
          wx.cloud.callFunction({
          name : 'DeleteUserOfGroup',
          data : {
            userID : userID,
            groupID :thisapp.globalData.userGroup[i]
          },
          success : function(res){
              console.log(res.result);
          },
          fail: console.error
          });
        }
        else{
          console.log("cancle");
          console.log(thisapp.globalData.userGroup[i]);
        }
      },
      fail(res) {
        console.log("fail"+res);
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
    var ava=wx.getStorageSync('ava')
    this.setData({
      url:ava
    })
    //console.log(ava);
    var name = new Array();
    var j=0;
    for(var i =0;i<app.globalData.userGroup.length;i++){
      console.log(i);
      wx.cloud.init();
      wx.cloud.callFunction({
      name : 'GetInformationOfGroup',
      data : {
        groupID : app.globalData.userGroup[i]
      },
      success : function(res){
          //console.log(res.result.data);
        if(j<i){
          name[j]=res.result.data[0].groupName;
          that.setData({
             [`array[${j}]`]:name[j],
           })
           j++;
        }
          
         // console.log(that.data.array);
      },
      fail: console.error
      });
    }
    //console.log(app.globalData.userGroup);
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