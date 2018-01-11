//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    chosecar:'',
    bg_img:null,
    left_day:null,
    left_km:null,
    message_hid:"false",
    typelist:[],
    carlist:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    multiIndex1:0,
    multiIndex2:0,
    multiIndex:[0],
    carids1:[],
    carids2: [],
    hastwo:'0'
  },
  //事件处理函数
  changeinfo:function(e){
    //console.log(e);  
    var self=this;
    //console.log(e)
  },
  onShow:function(){
    console.log(wx.getStorageSync('carList'));
  },
  toast_hid:function(){
    this.setData({
      message_hid: true
    })
  },
  searchClassInfo(xiaoqu_id) {
    var that = this;
    //console.log(xiaoqu_id)
    if (xiaoqu_id) {
      this.setData({
        teach_area_id: xiaoqu_id,
        chosecar:''
      });
      var url = wx.getStorageSync('weburl');
     //console.log(xiaoqu_id);
      if(xiaoqu_id==0){
        wx.request({
          url: url, //接口地址
          data: {
            api_name: 'car.car.getCarList',
            appid: wx.getStorageSync('appid'),
            token: wx.getStorageSync('token'),
            PHPSESSID: wx.getStorageSync('phpsessid')
          },
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
            //console.log(res.data.data)
            //console.log(res.data.data[0].item_id);
            var temp = res.data.data;
            var classList = [res.data.data[0]];
              //console.log(list2)
              //classList=classList.concat(classList);
              wx.setStorageSync('cur_car_id', res.data.data[0].item_id)
              var classArr = classList.map(function (item, index) {
                //console.log(item)
                return item.plate_num;
              })
              var xiaoquArr = that.data.xiaoquArr;
              that.setData({
                multiArray: [xiaoquArr, classArr],
                classArr,
                classList
              })
          }
        })
      }else{//获得非绑定车辆
      console.log('ddd')
        wx.request({
          url: url, //接口地址
          data: {
            api_name: 'car.car.getRecommendCarList',
            appid: wx.getStorageSync('appid'),
            token: wx.getStorageSync('token'),
            PHPSESSID: wx.getStorageSync('phpsessid')
          },
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
            console.log(res.data.data);
            var classList = res.data.data;
              //console.log(list2)
              //classList=classList.concat(classList);
              var classArr = classList.map(function (item, index) {
               // console.log(item)
                return item.plate_num;
              })
              var xiaoquArr = that.data.xiaoquArr;
              that.setData({
                multiArray: [xiaoquArr, classArr],
                classArr,
                classList
              })
          }
        })
      }
    }
  },
  bindMultiPickerColumnChange: function (e) {
    var self=this;
    //console.log(e);
    //e.detail.column 改变的数组下标列, e.detail.value 改变对应列的值
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    wx.setStorageSync('col', e.detail.value );
    if (e.detail.column==0&&e.detail.value==0){
      var temp_data = null;
      console.log(self.data.classList);
     // console.log(e.detail.value);
     // console.log(self.data.classList[e.detail.value])
      wx.setStorageSync('cur_car_id', self.data.classList[e.detail.value].item_id)
    } else if (e.detail.column == 0 && e.detail.value == 1){
      console.log(self.data.classList);
      if (self.data.classList.length==1){
        wx.request({
          url: wx.getStorageSync('weburl'), //接口地址
          data: {
            api_name: 'car.car.getRecommendCarList',
            appid: wx.getStorageSync('appid'),
            token: wx.getStorageSync('token'),
            PHPSESSID: wx.getStorageSync('phpsessid')
          },
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
            console.log(res.data.data[e.detail.value]);
            var classList = res.data.data;
            //console.log(list2)
            //classList=classList.concat(classList);
            wx.setStorageSync('cur_car_id',classList[0].item_id);
            var classArr = classList.map(function (item, index) {
              // console.log(item)
              return item.plate_num;
            })
            var xiaoquArr = self.data.xiaoquArr;
            self.setData({
              multiArray: [xiaoquArr, classArr],
              classArr,
              classList
            })
          }
        })
      }else{
        wx.setStorageSync('cur_car_id', self.data.classList[e.detail.value].item_id)
      }
     // 
    }else{
      wx.setStorageSync('cur_car_id', self.data.classList[e.detail.value].item_id)
    }
    var teach_area_id_session = this.data.teach_area_id;　　　　// 保持之前的校区id 与新选择的id 做对比，如果改变则重新请求数据
    switch (e.detail.column) {
      case 0:
        var xiaoquList = this.data.xiaoquList;
        var teach_area_id = xiaoquList[e.detail.value]['teach_area_id'];
        if (teach_area_id_session != teach_area_id) {　　　　// 与之前保持的校区id做对比，如果不一致则重新请求并赋新值
          this.searchClassInfo(teach_area_id);
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  bindMultiPickerChange: function (e) {
    //console.log(e)
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var class_key = 0;
    var classList = this.data.classList;
    var select_key = e.detail.value[1];
    var real_key = select_key - 1;
    if (real_key < class_key) {
      this.setData({
        class_id: 0
      })
    } else {
      this.setData({
        class_id: classList[real_key]['teach_instance_id']　　　　　　// class_id 代表着选择的班级对应的 班级id
      })
    }
    this.setData({
      multiIndex: e.detail.value,
      chosecar:''
    })
   // console.log(wx.getStorageSync('cur_car_id'))
    //wx.setStorageSync('cur_car_id', '87' )
    wx.navigateTo({
      url: '../calendar/calendar',
    })
  },
  bindit:function(){

  },
  onLoad: function () {
    var self=this;
    //////////////////////////////////////////////////////////////////////////
    wx.request({
      url: wx.getStorageSync('weburl'), //的接口地址
      data: {
        api_name:'car.car.getCarList',
        appid: wx.getStorageSync('appid'),
        token: wx.getStorageSync('token'),
        PHPSESSID: wx.getStorageSync('phpsessid')
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        //console.log(res.data);
        var xiaoquList = [{ "teach_area_id": "0", "teach_area_name": "绑定车辆"}, { "teach_area_id": "1", "teach_area_name": "其他车辆" }];
        var xiaoquArr = xiaoquList.map(function(item,index){　　　　// 此方法将区分到一个新数组中
        //console.log(item)
          return item.teach_area_name;
        });
        self.setData({
          multiArray: [xiaoquArr, []],
          xiaoquList,
          xiaoquArr: ["绑定车辆", "其他车辆"]
        })
        var default_xiaoqu_id = xiaoquList[0]['teach_area_id'];　　　　//获取默认的对应的 teach_area_id
        if (default_xiaoqu_id) {
          self.searchClassInfo(default_xiaoqu_id)　　　　　　// 如果存在调用获取对应的班级数据
        }
      }
    })
    //////////////////////////////////////////////////////////////////////////

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
              bg_img: wx.getStorageSync('domain')+res.data.data.b_pic_path
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
 