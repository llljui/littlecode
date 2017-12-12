Page({
  data: {
    logs: []
  },
  onLoad: function () {
   
  },
  topay:function(){
    wx.navigateTo({
      url: '../pay/pay',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    })
  }
})
