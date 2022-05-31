// pages/toDoList/toDoList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['loading1','loading2','loading3','loading4'],
    index:0,
    visibility:[],
    dueDate:[],
    daysleft:[],
    Doit:[],
    detail:[],
    group:[],
    isTop:[],
    notsee:[]
  },

  deleteToDo: function(e){//其实没有把事件真的删了，只是换了个显示方式
    console.log(e);
    var i=parseInt(e.currentTarget.dataset.ids);
    console.log(i);
    this.setData({
      [`visibility[${i}]`]:1
    });
    wx.setStorageSync('key', this.data.visibility);
    console.log(this.data.visibility);
  },

  reset:function(e){
    console.log(e);
    var i=parseInt(e.currentTarget.dataset.ids);
    console.log(i);
    this.setData({
      [`visibility[${i}]`]:0
    });
    wx.setStorageSync('key', this.data.visibility);
  },

  setID: function(e){
    console.log(e);
    ToDoID=parseInt(e.currentTarget.dataset.ids);
  },

  showDetail:function(e) {
    console.log(e);
    wx.showModal({
      cancelColor: 'cancelColor',
      content:this.data.detail[parseInt(e.currentTarget.dataset.ids)]
    })
  },

  set: function(e){
    
    console.log("set");
    var i=parseInt(e.currentTarget.dataset.ids);
    if(this.data.visibility[i]==0||this.data.visibility[i]==null)
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

  sort1: function(e){
    this.setData({
      isTop:[]
    })
    BigList.sort((a,b)=>{return a.left-b.left});
  },

  sort2:function(e) {
    console.log("哈哈，好丑");
    console.log(e);
    this.setData({
      isTop:null
    })
    for(var i=0;i<BigList.length;i++){
      if(BigList[i].from==groupList[parseInt(e.detail.value)]){
        
        this.setData({
          [`isTop[${i}]`]:1
        });
        console.log(BigList[i].tit);
        console.log(BigList[i].from);
        console.log(this.data.isTop[i]);
      }
    }
  },
  setNone:function(e) {
    console.log(e);
    console.log(this.data.notsee);
    var i=parseInt(e.currentTarget.dataset.ids);
    this.setData({
      [`notsee[${i}]`]:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log("first");
    var Todaydate=util.formatDate(new Date());
   // console.log(typeof Todaydate);
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
    var str=new Array();
    str=wx.getStorageSync('key');
    this.setData({
      visibility:str
    })
    console.log(this.data.visibility);
    // wx.getStorage({
    //   key:"key",
    //   success (res) {
    //     //console.log(res.data);
    //     that.setData({
    //       visibility:res.data
    //     })
    //     console.log(that.data.visibility);
    //   },
    //   fail(res){
    //     console.log(res);
    //   }

    // });

    //找到这个人在哪些群里面？？？？？？？？？
    var promise = new Promise(function(resolve,reject){
          wx.cloud.init();
          wx.cloud.callFunction({
          name : 'GetGroupsOfUser',
          success : function(res){
              resolve(res.result.data);
              // for(var i=0;i<res.result.data.length;i++){
              //   console.log(res.result.data[i]);//打印出第一条数据
              //   groupList[i]=res.result.data[i].groupID;
              // }
          },
          fail: function(e){console.error}
      })
    });
    promise.then(function (res){
      for(var i=0;i<res.length;i++){
        groupList[i]=res[i].groupID;
        
      }
    //console.log(res);
    app.globalData.userGroup=groupList;
    //console.log(groupList[0]);
    var userid=wx.getStorageSync('openid');
    console.log(userid);
    
    var name = new Array();
    var j=0;
    console.log(groupList.length);
    for(var i =0;i<groupList.length;i++){
        console.log("enter");
        wx.cloud.init();
        console.log(app.globalData.userGroup[i]);
        wx.cloud.callFunction({
        name : 'GetInformationOfGroup',
        data : {
          groupID : app.globalData.userGroup[i]
        },
        success : function(res){
            console.log(res.result.data);
          if(j<i){
            name[j]=res.result.data[0].groupName;
            that.setData({
              [`group[${j}]`]:name[j],
            })
            j++;
          }
        },
        fail(res){
          console.log(res);
        }
      });
    }
    
    for(var nums=0;nums<groupList.length;nums++)
    {
      //console.log("enter");
      //console.log(groupList[nums]);
      wx.cloud.init();
      //var that=this;
      wx.cloud.callFunction({
      name : 'GetTodosOfGroup',
      data:{
        groupID:groupList[nums]//当前用户所在的所有群
      },
      success : function(res){
          for(var i=0;i<res.result.data.length;i++)//attention
          {
            //console.log(res.result.data[i].description);
            //console.log(res.result.data.length);//打印出第一条数据
            tit[index]=res.result.data[i].title;
            thingList[index]=res.result.data[i].description;//这里是测试数据要修改
            dueDate[index]=res.result.data[i].due;//这里是测试数据要修改
            //console.log(thingList.length);
            
            var value=dueDate[index]//dueDate[0];//这里是测试数据要修改
            var value2=Todaydate;
            var value_num=new Date(value.replace(/-/g,"/"));
            var value2_num=new Date(value2.replace(/-/g,"/"));
            var leftdays=parseInt((value_num.getTime() - value2_num.getTime()) / (1000*60*60*24));
            //console.log(value_num);
            //console.log(value2_num);
            that.setData({
              array:tit,
              dueDate:dueDate,
              [`daysleft[${index}]`]:leftdays,
              detail:thingList
            });
            var toDoThings = new Object;
            toDoThings.thing=that.data.detail[index];
            toDoThings.tit=that.data.array[index];
            toDoThings.date=dueDate[index];
            toDoThings.isSeen=that.data.visibility[index];
            toDoThings.left=that.data.daysleft[index];
            toDoThings.from=res.result.data[i].groupID;
            BigList[index]=toDoThings;
            //console.log(BigList);
            index++;
          }
          BigList.sort((a,b)=>{return a.left-b.left});
          for(var i=0;i<index;i++)
          {
            that.setData({
              [`array[${i}]`]:BigList[i].tit,
              //[`visibility[${i}]`]:BigList[i].isSeen,
              [`dueDate[${i}]`]:BigList[i].date,
              [`daysleft[${i}]`]:BigList[i].left,
              [`detail[${i}]`]:BigList[i].thing
            });
          }
      },
      fail: console.error
      });
    }

    })
    
      // for(var i=0;i<res.result.data.length;i++){
      //   console.log(res.result.data);
      //   list[i]=res.result.data[i]._id;
      //   groupname[i]=res.result.data[i].groupName;
      // }
      // app.globalData.groupName=groupname;
      // app.globalData.globalList=list;
      // that.setData({
      //   group:groupname
      // })
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
var BigList=new Array();
var tit=new Array();
var groupList=new Array();
var list=new Array();
var groupname=new Array();

