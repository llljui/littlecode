//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    bg_img:null,
    left_day:null,
    left_km:null,
    message_hid:"false",
    array: [['绑定车辆', '其他车辆'], wx.getStorageSync('carList')],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    multiIndex2: [0, 0],
  },
  //事件处理函数
  changeinfo:function(e){
    console.log(e);  
  },
  onShow:function(){
    console.log(wx.getStorageSync('carList'));
  },
  foreach_carlist:function(e){
    var self=this;
    //console.log(e);
    //console.log(wx.getStorageSync('car_list').data);
    var car_list = wx.getStorageSync('car_list').data;
    //var temparry=[];
//car_list.forEach(function(item,index){
     // console.log(item.item_name);
      //temparry.push(item.plate_num);
       // if (index == (car_list.length-1)){
       //   console.log(car_list.length - 1);
       //   self.setData({
      //      array: temparry
      //    });
      //    console.log(self.data.array);
  //      }
    //})
    console.log(car_list);
  },
  bindChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)//根据index找到item_id
    var itemId = wx.getStorageSync('car_list').data;
    console.log(itemId[e.detail.value].plate_num);
    wx.setStorageSync('cur_car_id', itemId[e.detail.value].plate_num);
    this.setData({
      index: e.detail.value
    });
    wx.getStorageSync('cur_car', e.detail.value)//当前选择车辆
     wx.navigateTo({
      url: '../calendar/calendar'
    })
  },//
  toast_hid:function(){
    this.setData({
      message_hid: true
    })
  },
  onLoad: function () {
    var self=this;
    console.log(wx.getStorageSync('carList'));
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
        wx.request({
          url: wx.getStorageSync('weburl'), //仅为示例，并非真实的接口地址
          data: {
            api_name: 'car.index.getIndexInfo',
            appid: 'cariosappid@u8ms@nsN2G8M2',
            token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
            PHPSESSID: wx.getStorageSync('phpsessid'),
            session: wx.getStorageSync('session'),
            encryptedData: wx.getStorageSync('encryptedData'),
            iv:wx.getStorageSync('iv')////////////////////////////////这里是首页加载项
          },
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
            //console.log(res.data);
            self.setData({
              left_day:res.data.data.left_day,
              left_km: res.data.data.left_km,
              bg_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514195746053&di=71f19cf88466a05ba0a4b0f2a22128bc&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201502%2F10%2F20150210133921_WB3QV.jpeg'//wx.getStorageSync('domain')+res.data.data.b_pic_path
            })
          }
        })
      }
    })//获取地理位置
      //
    
   
      //
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
   //console.log(333);
   wx.navigateTo({
     url: '../calendar/calendar'
   })
  },//点击日历事件
})
 