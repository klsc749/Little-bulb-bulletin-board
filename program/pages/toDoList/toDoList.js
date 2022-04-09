// pages/toDoList/toDoList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['none','none','coding','coding'],
    index:0,
    visibility:[1,1,1,1,1],
    dueDate:["2021-4-8"],
    daysleft:0
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
    ToDoID=parseInt(e.currentTarget.dataset.ids);
  },

  showDetail: function(e){
    
    console.log(e);
    var i=parseInt(e.currentTarget.dataset.ids);
    if(this.data.visibility[i]==1)
    {
        wx.showModal({
        title:'设置提醒推送:(格式：剩余多少天提醒/重复提醒时间)',
        content:"",
        cancelColor: 'cancelColor',
        editable:true,
        placeholderText:'样例：5/1',
        success (res) {
          if(res.confirm)
          {
            var num=res.content.match(/\d+/g);
            console.log("success");
            toReportday[ToDoID]=parseInt(num[0]);
            repeat[ToDoID]=parseInt(num[1]);
          }
          else if(res.cancel)
          {
            console.log('fail');
          }
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Todaydate=util.formatDate(new Date());
    console.log(typeof Todaydate);
    for(index=0;index<app.globalData.testToDoList.length;index++)
    {
      thingList[index]=app.globalData.testToDoList[index];
      dueDate[index]=Todaydate;
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
        thingList[index]=res.result.data[0].description;//这里是测试数据要修改
        dueDate[index++]=res.result.data[0].due;//这里是测试数据要修改
        console.log(thingList.length);
        var value="2022-05-29"//dueDate[0];//这里是测试数据要修改
        var value2=Todaydate;
        var value_num=new Date(value.replace(/-/g,"/"));
        var value2_num=new Date(value2.replace(/-/g,"/"));
        var leftdays=parseInt((value_num.getTime() - value2_num.getTime()) / (1000*60*60*24));
        console.log(value_num);
        console.log(value2_num);
        that.setData({
          array:thingList,
          dueDate:dueDate,
          daysleft:leftdays
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
var ToDoID=0;
var IDofGroup;
var repeat=[];
var toReportday=[];
const util=require('../../utils/util.js')