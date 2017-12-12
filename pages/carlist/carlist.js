

Page({
  data: {
    area: ['中国', '美国', '巴西', '日本'],
    carlist: [{ brands: "奔驰", model: 'ZB/T5005', carlisense: '浙A6666', price: "999" }, { brands: "奔驰", model: 'ZB/T5005', carlisense: '浙A6666', price: "999" }, { brands: "奔驰", model: 'ZB/T5005', carlisense: '浙A6666', price: "999" }, { brands: "奔驰", model: 'ZB/T5005', carlisense: '浙A6666', price: "999" }, { brands: "奔驰", model: 'ZB/T5005', carlisense: '浙A6666', price: "999" }, { brands: "奔驰", model: 'ZB/T5005', carlisense: '浙A6666', price: "999" }, { brands: "奔驰", model: 'ZB/T5005', carlisense: '浙A6666', price: "999" }, { brands: "奔驰", model: 'ZB/T5005', carlisense: '浙A6666', price: "999" }, { brands: "奔驰", model: 'ZB/T5005', carlisense: '浙A6666', price: "999" }, { brands: "奔驰", model: 'ZB/T5005', carlisense: '浙A6666', price: "999" }, { brands: "奔驰", model: 'ZB/T5005', carlisense: '浙A6666', price: "999" }]
  },
  cardetails:function (e) {
  	console.log(e);// body...
    wx.navigateTo({
      url: '../details/details',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { console.log(res)}
    })
  }
})
