Page({
  data: {
    icon1:'fa-sort-down',
    icon2: 'fa-sort-down',
    icon3: 'fa-sort-down',
    cut:0,
    animate_:'0',
    scrollHeight:"93vh",
    iftrue:true,
    logs: [],
    status:'状态',
    carname:'s',
    odernumber:'121212121',
    borrow_time:'2017-10-10',
    back_time:'2017-08-09',
    cartype:'奔驰-2016',
    price:'1000',
    order_list: [{ 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }, { 'list': '1' }]
  },
  onLoad: function () {
    wx.request({
      url: wx.getStorageSync('weburl'), //接口地址
      data: {
        api_name: 'car.order.getOrderList',
        appid: 'cariosappid@u8ms@nsN2G8M2',
        token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
        firstRow:'1'
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  bindDownLoad:function(){
    console.log(123)
  },
  refresh:function(){

  },
  topay:function(){
    wx.navigateTo({
      url: '../pay/pay',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    })
  },
  bindDownLoad:function(){
    wx.showNavigationBarLoading();
    wx.request({
      url: wx.getStorageSync('weburl'), //接口地址
      data: {
        api_name: 'car.order.getOrderList',
        appid: 'cariosappid@u8ms@nsN2G8M2',
        token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
        firstRow: '52'
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    setTimeout(function(){
      wx.hideNavigationBarLoading();
    },2000)
  },
  opentap:function(e){
    console.log(e);
    var self = this;
    var cut = self.data.cut+1;
    if (e.target.dataset.icon=='1'){
      self.setData({ icon1:'fa-sort-up'})
    } else if (e.target.dataset.icon == '2'){
      self.setData({ icon2: 'fa-sort-up' })
    }else{
      self.setData({ icon3: 'fa-sort-up' })
    }
    self.setData({
      'cut': cut
    })
    if(self.data.cut%2==0){
      self.setData({
        'animate_': '0'
      });
      self.setData({ icon1: 'fa-sort-down' });
      self.setData({ icon2: 'fa-sort-down' });
      self.setData({ icon3: 'fa-sort-down' });
    }else{      
      self.setData({
        'animate_': '0'//代发
      });
    }
   
  }
})
