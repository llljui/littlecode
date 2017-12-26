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
    multiArray: [[{ 'id': 0, 'type': '绑定车辆'},{'id':1,'type':'绑定车辆'}],[]],
    typelist:[],
    carlist:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    multiIndex1:0,
    multiIndex2:0,
    carids1:[],
    carids2: [],
    hastwo:'0'
  },
  //事件处理函数
  changeinfo:function(e){
    //console.log(e);  
    var self=this;
    console.log(e)
 
  },
  onShow:function(){
    console.log(wx.getStorageSync('carList'));
  },
  foreach_carlist:function(e){
    var self=this;
    console.log(e);
    self.setData({
      plate1: null,
      array: [['绑定车辆', '其他车辆'], [null]],
      carids1: null,
      carids2: null,
      plate2: null
    });
    console.log(wx.getStorageSync('bindcar'));
    var plate=[];
    var carid=[];
    var dd = wx.getStorageSync('bindcar');
    for(let i=0;i<10;i++){
      dd.push(wx.getStorageSync('bindcar')[0]);
    }
    dd.forEach(function(item,index){
      plate.push(item.plate_num);
      carid.push(item.item_id);
    });
    console.log(dd);
    var plate1=plate.shift();

    self.setData({
      plate1: plate1,
      array: [['绑定车辆', '其他车辆'], [plate1]],
      carids1: carid.shift(),
      carids2: carid,
      plate2: plate
    });
      console.log(self.data.plate2);
  },
  bindChange: function (e) {
    var self=this;
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)//根据index找到item_id
    if (e.detail.value[0]==0){
      wx.setStorageSync('cur_car_id',self.data.carids1);//取绑定的车辆
    }else{
     // wx.setStorageSync('cur_car_id', carids2);//取其他的车辆
    }
    //var itemId = wx.getStorageSync('car_list').data;
   // console.log(itemId[e.detail.value].plate_num);
   // wx.setStorageSync('cur_car_id', itemId[e.detail.value].plate_num);
 
   // wx.getStorageSync('cur_car', e.detail.value)//当前选择车辆
   //  wx.navigateTo({
   //   url: '../calendar/calendar'
   // })
  },//
  toast_hid:function(){
    this.setData({
      message_hid: true
    })
  },
  searchClassInfo(xiaoqu_id) {
    var that = this;
    if (xiaoqu_id) {
      this.setData({
        teach_area_id: xiaoqu_id
      })
      var url = wx.getStorageSync('weburl');
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
          console.log(res.data)
          var classList = res.data.data;
          var classArr = classList.map(function(item,index){
            return item.plate_num;
          })
          classArr.unshift('全部车辆');　　　　　　// 接口中没有提供全部班级字段，添加之
          var xiaoquArr = that.data.xiaoquArr;
          that.setData({
            multiArray: [xiaoquArr, classArr],
            classArr,
            classList
          })

        }
      })
    

    }
  },
  bindMultiPickerColumnChange: function (e) {
    //e.detail.column 改变的数组下标列, e.detail.value 改变对应列的值
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
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
      multiIndex: e.detail.value
    })
  },
  onLoad: function () {
    var self=this;
    //////////////////////////////////////////////////////////////////////////
    wx.request({
      url: wx.getStorageSync('weburl'), //仅为示例，并非真实的接口地址
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
        console.log(res.data);
        var xiaoquList = [{
          'id': 0, "teach_area_id": "xxx2", "teach_area_name": "绑定车辆"}, { 'id': 1, "teach_area_id": "xxx3", "teach_area_name": "其他车辆" }];
        var xiaoquArr = xiaoquList.map(function(item,index){　　　　// 此方法将校区名称区分到一个新数组中
          return item.teach_area_name;
        });
        self.setData({
          multiArray: [xiaoquArr, []],
          xiaoquList,
          xiaoquArr: ["绑定车辆", "其他车辆"]
        })
        var default_xiaoqu_id = xiaoquList[0]['teach_area_id'];　　　　//获取默认的校区对应的 teach_area_id
        if (default_xiaoqu_id) {
          self.searchClassInfo(default_xiaoqu_id)　　　　　　// 如果存在调用获取对应的班级数据
        }
      }
       // 
        //wx.setStorageSync('bindcar',res.data.data);
       // var plate=[];
       // res.data.data.forEach(function (item, index) {
      //    plate.push(item.plate_num);
    //    })
      //  self.setData({
      //    multiArray: [, []],
      //    typelist: [],
      //    carlist: []
     //   });
      //}
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
 