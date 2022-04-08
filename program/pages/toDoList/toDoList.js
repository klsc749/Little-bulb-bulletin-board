// pages/toDoList/toDoList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['none','none','coding','coding'],
    index:0,
    visibility:[1,1,1,1,1],
    ToDoID:0,//从服务器获取ID
    dueDate:["2021-4-8"]
  },

  deleteToDo: function(e){//其实没有把事件真的删了，只是换了个显示方式
    console.log(e);
    var i=parseInt(e.currentTarget.dataset.ids);
    console.log(i);
    this.setData({
      [`visibility[${i}]`]:0
    })
  },

  setID: function(e){
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    for(index=0;index<app.globalData.testToDoList.length;index++)
    {
      thingList[index]=app.globalData.testToDoList[index];
      dueDate[index]=index+1+"月";
      isFinished[index]=1;//事件初始 1 未完成 0 已完成
    }
    //从服务区获取数据
    wx.cloud.init();
    var that=this;
    wx.cloud.callFunction({
    name : 'GetTodosOfGroup',
    data:{
      groupID:"45"
    },
    success : function(res){
        console.log(res.result.data[0].description);//打印出第一条数据
        thingList[index]=res.result.data[0].description;
        dueDate[index++]=res.result.data[0].due;
        console.log(thingList.length);
        that.setData({
          array:thingList,
          dueDate:dueDate
        })
    },
    fail: console.error
    });
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
var isFinished=[];
var dueDate=[];
const app=getApp();
app.globalData.testToDoList=['学HTML','学CSS','学JS'];
var index2=0;
var IDofGroup;

