// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_order_detail: [{ ck_: false }, { ck_: true }, { ck_: false }, { ck_: true }, { ck_: true }, { ck_: false }, { ck_: true }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  } ,
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  radioChange:function(e){
    console.log(e);
    var index_id=e.currentTarget.dataset.id;
    this.data.user_order_detail[index_id].ck_=!this.data.user_order_detail[index_id].ck_;
    this.setData({
      user_order_detail
    })
  }
})