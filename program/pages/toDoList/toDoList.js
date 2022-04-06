// pages/toDoList/toDoList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['none','none','coding','coding'],
    index:0,
    visibility:[1,1,1,1,1],
    ToDoID:0//从服务器获取ID
  },
  

  addToDoItem: function(e){
    for(index=0;index<app.globalData.testToDoList.length;index++)
    {
      thingList[index]=app.globalData.testToDoList[index];
      this.setData({
        index:index
      })
    }
    this.setData({
      array:thingList
    })
    console.log(thingList.length);
  },

  deleteToDo: function(e){
    console.log(e);
    this.setData({
      visibility:this.data.visibility[e.currentTarget.id]=0
    })
    // delete thingList[0];
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从服务区获取数据
    wx.request({
      url: 'url',
      data: {
        
      }
    })
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
var index=0;
var isOverDue=1;
var thingList=[];
const app=getApp();
app.globalData.testToDoList=['学HTML','学CSS','学JS'];
var index2=0;

