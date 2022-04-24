// pages/toDoList/toDoList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['none','none','coding','coding'],
    index:0,
    visibility:[],
    dueDate:["2021-4-8"],
    daysleft:[]
  },

  deleteToDo: function(e){//其实没有把事件真的删了，只是换了个显示方式
    console.log(e);
    var i=parseInt(e.currentTarget.dataset.ids);
    console.log(i);
    this.setData({
      [`visibility[${i}]`]:1
    })
  },

  setID: function(e){
    console.log(e);
    ToDoID=parseInt(e.currentTarget.dataset.ids);
  },

  showDetail: function(e){
    
    console.log(e);
    var i=parseInt(e.currentTarget.dataset.ids);
    if(this.data.visibility[i]==0)
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
    console.log("first");
    console.log(this.data.visibility);
    var Todaydate=util.formatDate(new Date());
    console.log(typeof Todaydate);
    // for(index=0;index<app.globalData.testToDoList.length;index++)
    // {
    //   thingList[index]=app.globalData.testToDoList[index];
    //   dueDate[index]="2022-04-25";
    //   this.setData({
    //     [`daysleft[${index}]`]:666
    //   })
    // }
    //从服务区获取数据
    var that=this;
    wx.cloud.init();
    wx.cloud.callFunction({
    name : 'GetTodosOfUser',
    data: {
        userID : "ocFn-4u3IjIMQZ_csfo3IhzWrXJM"
    },
    success : function(res){
          console.log(res.result);
          wx.getStorage({
            key:"key",
            success (res) {
              console.log(res.data);
              that.setData({
                visibility:res.data
              })
            }
          });
          console.log(that.data.visibility);
    },
    fail: console.error
});
    //找到这个人在哪些群里面？？？？？？？？？
    
    wx.cloud.init();
    var that=this;
    wx.cloud.callFunction({
    name : 'GetTodosOfGroup',
    data:{
      groupID:"45"//当前用户所在的所有群
    },
    success : function(res){
        for(var i=0;i<res.result.data.length;i++)//attention
        {
          console.log(res.result.data[i].description);
          console.log(res.result.data.length);//打印出第一条数据
          thingList[index]=res.result.data[i].description;//这里是测试数据要修改
          dueDate[index]=res.result.data[i].due;//这里是测试数据要修改
          console.log(thingList.length);
          
          var value=dueDate[i]//dueDate[0];//这里是测试数据要修改
          var value2=Todaydate;
          var value_num=new Date(value.replace(/-/g,"/"));
          var value2_num=new Date(value2.replace(/-/g,"/"));
          var leftdays=parseInt((value_num.getTime() - value2_num.getTime()) / (1000*60*60*24));
          console.log(value_num);
          console.log(value2_num);
          that.setData({
            array:thingList,
            dueDate:dueDate,
            [`daysleft[${i}]`]:leftdays
          });
          index++;
        }
        console.log(that.data.visibility);
        index=res.result.data.length;
    },
    fail: console.error
    });

     

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  test: function(e){
    wx.setStorage({
      key:"key",
      data:this.data.visibility,
      success (){
        console.log("chengle");
      }
    })
  },

  clear: function(e){
    wx.clearStorage({
      success () {
      console.log("clear");
    }
    });
    
  },

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
    //wx.setStorageSync('key', data)
        
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
var thingList=[];
var dueDate=[];
const app=getApp();
app.globalData.testToDoList=['学HTML','学CSS','学JS'];
var ToDoID=0;
var repeat=[];
var toReportday=[];
const util=require('../../utils/util.js')