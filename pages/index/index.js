//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  //  console.log(wx.getSystemInfoSync())
    this.setData({
      bgheight: wx.getSystemInfoSync().windowHeight,
      bgwidth: wx.getSystemInfoSync().windowWidth
    })//设置背景
    qqmapsdk = new QQMapWX({
      key: 'U2TBZ-TEGKP-C5MDZ-LS4EI-WWERS-QXBMM'
    });//腾讯地图地址
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        
      }
    })//获取地理位置
      
    //解决回弹效果
    //此处开发-----------------------------------------
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    // 调用接口
    var self = this;
    var lat;
    var lng;
    wx.getLocation({
      success: function (res) {
      //  console.log(res);
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
           // console.log(res);
            self.data.location=res.result.address;
            self.setData({
              location: res.result.address_component.city
            })
         //   console.log(self.data.location);
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            //console.log(res);
          }
        })
        //lat = res.latitude;
        //lng = res.longitude;
      }
    });

  }
,
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getTime:function(){
   console.log(333);
   wx.navigateTo({
     url: '../calendar/calendar'
   })
  },//点击日历事件
  chosecar: function () {
    console.log(222);
    wx.navigateTo({
      url: '../carlist/carlist'
    })
  }//选择车辆
})
 