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
  onLoad: function (options) {
    var self=this;
   // console.log('在此3')
    //console.log(wx.getStorageSync('order_time'));
    var orderTime_temp = [];
    wx.getStorageSync('order_time').forEach(function (item, index) {
      orderTime_temp.push((Date.parse(new Date(item))/1000));
    })
    console.log(orderTime_temp);
    wx.request({
      url: wx.getStorageSync('weburl'), //仅为示例，并非真实的接口地址
      data: {
        api_name: 'car.car.submitCarDetail',
        appid: 'cariosappid@u8ms@nsN2G8M2',
        token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
        item_id: wx.getStorageSync('cur_car_id'),
        time_str: orderTime_temp
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        wx.setStorageSync('order_temp_id', res.data.data.order_temp_id);
        var img=[];
        var userinfo=[];
        res.data.data.item_photo.forEach(function(item,index){
          img.push(wx.getStorageSync('domain')+item);
        });
       // console.log(res.data.data.use_info);
        function getLocalTime(nS) {
          return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        }
        for (let x in res.data.data.use_info){
          let temp = res.data.data.use_info[x];
         // console.log('在此');
         // console.log(res.data.data.use_info[x]);
          temp.start_time = getLocalTime(res.data.data.use_info[x].start_time).split(' ')[0];
          temp.end_time = getLocalTime(res.data.data.use_info[x].end_time).split(' ')[0];
          userinfo.push(temp);
         
        }
        self.setData({
          iconimg: img,
          item_name: res.data.data.item_name,
          plate_num: res.data.data.plate_num,
          userinfo: userinfo
        })
        console.log(self.data.userinfo)
        //wx.setStorageSync('order_time', '')
      }
    })
  },
  setorder:function(){
    //console.log(123);
    wx.navigateTo({
      url: '../details/details'
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