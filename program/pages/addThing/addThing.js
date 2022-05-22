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
      console.log(typeof this.data.ddline);
       wx.cloud.init();
       wx.cloud.callFunction({
       name : 'AddTodo',
     data : {
         title:this.data.tit,
         description :this.data.thing,
         due :this.data.ddline,
         groupID : this.data.person //通过查询获得
     },
     success : function(res){
         //console.log(res);
         if(res.result == 0){
           console.log("no");
           wx.showToast({
            title: '发送失败',
            duration:1000,
            icon:"error"
          })
             //添加失败
         }else if(res.result == 1){
             //添加成功
             console.log("yes");
             wx.showToast({
              title: '发送成功',
              duration:1000,
              icon:"success"
            })
 		}
     },
     fail: console.error
 });
    },
    reset: function(e){
      console.log(e);
      this.setData({
        tit:null,
        person:'',
        thing:'',
        ddline:''
      })
    },
    creatGroup: function(e) {
      wx.showModal({
        cancelColor: 'cancelColor',
        title:'请输入群名',
        editable:true,
        placeholderText:"请输入",
        content:'',
        success(e) {
          if(e.confirm){
          wx.cloud.init();
          wx.cloud.callFunction({
          name : 'AddGroup',
          data : {
              groupName :e.content
          },
          success : function(res){
              console.log(res.result);
              if(res.result == 0){
                  //添加失败
                  wx.showToast({
                    title: '创建失败',
                    duration:1000,
                    icon:"error"
                  })
              }else if(res.result == 1){
                  //添加成功
                  wx.showToast({
                    title: '创建成功',
                    duration:1000,
                    icon:"success"
                  })
              }
          },
          fail: console.error
          });
          }
        }
      })
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