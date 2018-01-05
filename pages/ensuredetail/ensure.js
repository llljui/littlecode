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
        //console.log(JSON.parse(JSON.stringify(res.data.data.use_info)))
        var temp = res.data.data.temp_info.use_info;
        function fmtDate(obj) {
          var date = new Date(obj);
          var y = 1900 + date.getYear();
          var m = "0" + (date.getMonth() + 1);
          var d = "0" + date.getDate();
          return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
        }
        for(let x in temp){
          temp[x].s_time = fmtDate(temp[x].start_time);
          temp[x].e_time = fmtDate(temp[x].end_time);
          console.log(temp[x].s_time)
        }
        self.setData({
          orderdetails: res.data.data.user_info,
          userinfo: res.data.data.temp_info,
          all_fee: res.data.data.temp_info.total_fee,
          info:res.data.data.temp_info.use_info
        });
        //console.log(self.data.info)
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