//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('click_count', 1)
    wx.setStorageSync('click_count2', 1)
    wx.setStorageSync('session', '1')
    wx.setStorageSync('weburl', 'https://www.vipyunfu.com/api/api')
    wx.setStorageSync('domain', 'https://www.vipyunfu.com')
    wx.setStorageSync('appid','cariosappid@u8ms@nsN2G8M2' )
    wx.setStorageSync('token','CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u')
    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: wx.getStorageSync('weburl'), //接口地址
          data: {
            code:res.code,
            appid:'cariosappid@u8ms@nsN2G8M2',
            api_name: 'car.user.wxLogin',
            token:'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u'
          },
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
          //  console.log(res);
            try {
              wx.setStorageSync("session", res.data.data.session);
            //  console.log(123)
            } catch (e) {
              console.log(e);
            }
          }
        })// 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              console.log(this.globalData.userInfo);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getUserInfo({
      withCredentials: true,
      lang: 'zh_CN',
      success: function(res) {
      // console.log(res);
        wx.setStorageSync('encryptedData', res.encryptedData);
        wx.setStorageSync('iv', res.iv);
        try {
          var value = wx.getStorageSync('session');
         // console.log(value);
          if (value) {
            wx.request({
              url: wx.getStorageSync('weburl'), //接口地址
              data: {
                  session:value,
                  iv:res.iv,
                  encryptedData:res.encryptedData,
                 // PHPSESSID:
                  api_name:'car.user.registerWxUser',
                  appid: 'cariosappid@u8ms@nsN2G8M2',
                  token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u'
              },
              header: {
                "Content-Type": "application/json"
              },
              success: function (res) {
               // console.log(res.data);
                if (res.data.code == 0) {
                  try {
                    wx.setStorageSync("phpsessid", res.data.data.ssid);
                    try {
                      var weburl = wx.getStorageSync('weburl')
                      if (weburl) {
                        // Do something with return value
                        wx.request({
                          url: weburl, //接口地址
                          data: {
                            api_name: 'car.car.getCarList',
                            appid: 'cariosappid@u8ms@nsN2G8M2',
                            token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
                            PHPSESSID: wx.getStorageSync('phpsessid')
                          },
                          header: {
                            "Content-Type": "application/json"
                          },
                          success: function (res) {
                          //  console.log(res.data);
                            wx.setStorageSync('car_list',res.data);
                            var carlist = res.data.data;
                            var list=[];
                            carlist.forEach(function(item,index){
                              list.push(item.plate_num);
                              console.log(item.plate_num+','+index)
                            });
                           // console.log(list);
                            wx.setStorageSync('carList', list);//返回车辆相关
                          }
                        })
                      }
                    } catch (e) {
                      // Do something when catch error
                    }
                  } catch (e) {
                    console.log(e);
                  }
                } else {
                  console.log(res.data.msg);
                }
              }
            })
          }
        } catch (e) {
         console.log(e) // Do something when catch error
        }
      },
      fail: function(res) {
        console.log(res)

      },
      complete: function(res) {
       // console.log(res);
      },
    })
  },
  globalData: {
    userInfo: null,
    count:0,
    userSession:null
  }
})