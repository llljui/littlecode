// pages/ensuredetail/ensure.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconimg:[],
    carname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    console.log(e)
    wx.request({
      url: wx.getStorageSync('weburl'), //仅为示例，并非真实的接口地址
      data: {
        api_name: 'car.order.addCarOrder',
        appid: 'cariosappid@u8ms@nsN2G8M2',
        token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
        order_temp_id: wx.getStorageSync('order_temp_id'),
        realname: e.detail.value.realname,
        mobile: e.detail.value.mobile,
        id: e.detail.value.personid,
        driver_license_number: e.detail.value.carid,
        user_remark: e.detail.value.user_remark
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        wx.setStorageSync('package_id', res.data.data.package_id);
        wx.navigateTo({
          url: '../pay/pay',
        })
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  onLoad: function (options) {
    var self=this;
    wx.request({
      url: wx.getStorageSync('weburl'), //仅为示例，并非真实的接口地址
      data: {
        api_name: 'car.car.confirmOrderInfo',
        appid: 'cariosappid@u8ms@nsN2G8M2',
        token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
        order_temp_id: wx.getStorageSync('order_temp_id')
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        self.setData({
          'orderdetails':res.data.data,
           userinfo: res.data.data.use_info
        })
      }
    })
  },
  setorder:function(){
    //console.log(123);
    wx.navigateTo({
      url: '../pay/pay'
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