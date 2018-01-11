//logs.js


Page({
  data: {
    logs: [],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  setorder:function(){
    wx.navigateTo({
      url: '../ensuredetail/ensure',
    });
  },
  onLoad: function () {
    var self = this;
    // console.log('在此3')
    //console.log(wx.getStorageSync('order_time'));
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        self.setData({
          img_width: res.screenWidth,
          img_height: 180 * (res.screenWidth / 375)
        })
      }
    })
    var orderTime_temp = [];
    wx.getStorageSync('order_time').forEach(function (item, index) {
      orderTime_temp.push((Date.parse(new Date(item)) / 1000));
      console.log((Date.parse(new Date(item)) / 1000))
    })
    console.log(orderTime_temp);
    wx.request({
      url: wx.getStorageSync('weburl'), //接口地址
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
        var img = [];
        var userinfo = [];
        res.data.data.item_photo.forEach(function (item, index) {
          img.push(wx.getStorageSync('domain') + item);
        });
        console.log(img)
        // console.log(res.data.data.use_info);
        function getLocalTime(ti) {
          //console.log(ti);
          var da = new Date(ti);
          //console.log(da)
          function getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
          }
         // console.log(getLocalTime(ti));
          var time = getLocalTime(ti).split(' ')[0].split('/');
          console.log(time)
          var year = time[0] + '年';
          var month = time[1]+ '月';
          var date = time[2] + '日';
          // console.log([year, month, date].join('/'));
          return [year, month, date].join('');
        }     
        
        for (let x in res.data.data.use_info) {
          let temp = res.data.data.use_info[x];
          // console.log('在此');
          // console.log(res.data.data.use_info[x]);
          temp.start_time = getLocalTime(res.data.data.use_info[x].start_time).split(' ')[0];
          temp.end_time = getLocalTime(res.data.data.use_info[x].end_time).split(' ')[0];
          console.log(temp.end_time)
          userinfo.push(temp);

        }
        self.setData({
          iconimg: img,
          item_name: res.data.data.item_name,
          plate_num: res.data.data.plate_num,
          userinfo: userinfo,
          total_fee: res.data.data.total_fee
        })
        console.log(self.data.userinfo)
        //wx.setStorageSync('order_time', '')
      }
    })
  }
})
