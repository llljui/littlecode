// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_order_detail: [],
    items: [],
    show: 'none',
    show_2: 'none',
    try: '0',
    opacity: '0',
    cur_pl:wx.getStorageSync('cur_pl'),
    cur_name:wx.getStorageSync('cur_name')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    console.log(wx.getStorageSync('cur_name'))
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
        wx.setStorageSync('pay_id', res.data.data.pay_id);
        function getLocalTime(ti) {
          var da = new Date(ti);
          //console.log(da)
          function getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
          }
          // console.log(getLocalTime(ti));
          var time = getLocalTime(ti).split(' ')[0].split('/');
          // console.log(time)
          var year = time[0] + '年';
          var month = time[1] + '月';
          var date = time[2] + '日';
          // console.log([year, month, date].join('/'));
          return [year, month, date].join('');
        } 
        var temp = res.data.data.data;
        temp.forEach(function (item, index){
          item.start_time = getLocalTime(item.start_time);
          item.end_time = getLocalTime(item.end_time);
        })
        self.setData({ payinfo: temp, all_fee: res.data.data.total_fee})
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
  paymoney:function(){
    var self=this;
    wx.request({
      url: wx.getStorageSync('weburl'), //仅为示例，并非真实的接口地址
      data: {
        api_name: 'car.pay.payOrder',
        appid: 'cariosappid@u8ms@nsN2G8M2',
        token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
        PHPSESSID:wx.getStorageSync('phpsessid'),
        pay_id:wx.getStorageSync('pay_id')
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        if(res.data.code==0){
          console.log(0)
          self.setData({
            show: 'block',
            show_2: 'block',
            message: '支付成功'
          })
          setTimeout(function () {
            self.setData({
              show_2: 'block',
              try: '10',
              opacity: '1'
            })
          }, 10)
          setTimeout(function(){
            self.setData({
              show: 'none',
              show_2: 'none',
              message: '支付成功'
            })
            wx.switchTab({
              url: '../order/order',
              success: function (res) { console.log(res) },
              fail: function (res) { console.log(res) },
              complete: function (res) { console.log(res) },
            })
          },3000)
         
        }else{
          self.setData({
            show: 'block',
            show_2: 'block',
            message: res
          })
          setTimeout(function () {
            self.setData({
              show_2: 'block',
              try: '10',
              opacity: '1'
            })
          }, 10);
          setTimeout(function () {
            self.setData({
              show: 'none',
              show_2: 'none',
              message: ''
            })
          }, 3000)
        }
      }
    })
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