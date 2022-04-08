// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sum : 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.init();
        wx.cloud.callFunction({
            name : 'GetTodosOfUser',
            data: {
                userID : "ocFn-4u3IjIMQZ_csfo3IhzWrXJM"
            },
            success : function(res){
                console.log(res.result);
                if(res.result == 0){
                    console.log("失败")
                }else if(res.result == 1){
                    console.log("成功")
                }
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