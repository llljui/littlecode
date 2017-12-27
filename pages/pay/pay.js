// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_order_detail: [],
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    wx.request({
      url: wx.getStorageSync('weburl'), //仅为示例，并非真实的接口地址
      data: {
        api_name: 'car.pay.getPayInfoByPackageId',
        appid: 'cariosappid@u8ms@nsN2G8M2',
        token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
        package_id: wx.getStorageSync('package_id')
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        function getLocalTime(nS) {
          return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        } 
        var temp = res.data.data;
        temp.forEach(function (item, index){
          item.start_time = getLocalTime(item.start_time);
          item.end_time = getLocalTime(item.end_time);
        })
        self.setData({ payinfo:temp})
      }
    })//////////////////////////
    wx.request({
      url: wx.getStorageSync('weburl'), //仅为示例，并非真实的接口地址
      data: {
        api_name: 'car.pay.getPaywayList',
        appid: 'cariosappid@u8ms@nsN2G8M2',
        token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u'
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
      }
    })//////////获取支付方式
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