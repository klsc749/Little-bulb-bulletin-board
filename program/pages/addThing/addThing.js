// pages/addThing/addThing.js
Page({

    /**
     * Page initial data
     */
    data: {
        person:"45",//收件人
        ddline:"",//截止日期
        tit:"",//标题
        thing:"" //输入的事件

    },
    getter:function(e) {
      console.log(e.detail.value);
      this.setData({
        person:e.detail.value
      });
      

    },
    getter2:function(e) {
      console.log(e);
      this.setData({
        ddline:e.detail.value
      })
    },
    getter3:function(e) {
      console.log(e);
      this.setData({
        tit:e.detail.value
      })
    },
    getter4:function(e) {
      console.log(e);
      this.setData({
        thing:e.detail.value
      })
    },

    sendMessage: function(e) {
      console.log(this.data.person);
       wx.cloud.init();
       wx.cloud.callFunction({
       name : 'AddTodo',
     data : {
         description :this.data.thing,
         due :this.data.ddline,
         groupID : this.data.person //通过查询获得
     },
     success : function(res){
         console.log(res.result);
         if(res.result == 0){
           console.log("no");
             //添加失败
         }else if(res.result == 1){
             //添加成功
             console.log("yes");
 		}
     },
     fail: console.error
 });
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {

    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})