Page({
  data: {
    loading:true,
    cur_color1:'red',
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
    order_list: []
  },
  onLoad: function () {
    var self=this;
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
        console.log(res.data);
        function time(ti){
          var da = Number(ti);
          da = new Date(da);
          var year = da.getFullYear() + '';
          var month = da.getMonth() + 1 + '';
          var date = da.getDate() + '';
         // console.log([year, month, date].join('/'));
          return [year, month, date].join('/');
        }
        var s_temp=null;
        res.data.data.order_list.forEach(function(item,index){
          item.addtime = time(item.start_time);
          item.start_time = time(item.start_time);
          item.end_time = time(item.end_time);
        })
        self.setData({
          order_list: res.data.data.order_list
        })
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
    var self=this;
    wx.showNavigationBarLoading();
    if(this.data.loading==true){
      this.setData({
        loading:false
      })
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
          console.log(res.data);
          function time(ti) {
            var da = Number(ti);
            da = new Date(da);
            var year = da.getFullYear() + '';
            var month = da.getMonth() + 1 + '';
            var date = da.getDate() + '';
            // console.log([year, month, date].join('/'));
            return [year, month, date].join('/');
          }
          var s_temp = null;
          s_temp=self.data.order_list;
          res.data.data.order_list.forEach(function (item, index) {
            item.addtime = time(item.start_time);
            item.start_time = time(item.start_time);
            item.end_time = time(item.end_time);
            s_temp.push(item);
          });
          console.log(s_temp);
          self.setData({
            order_list: s_temp
          })
        }
      })
      setTimeout(function () {
        wx.hideNavigationBarLoading();
        self.setData({
          loading: true
        })
      }, 2000)
    }else{
      this.setData({
        loading: false
      })
    }
    
  },
  opentap:function(e){
    console.log(e);
    var self = this;
    var cut = self.data.cut+1;
    if (e.target.dataset.icon=='1'){
      self.setData({ cur_color1: 'red', cur_color2: 'black', cur_color3:'black'});
    } else if (e.target.dataset.icon == '2'){
      self.setData({ cur_color1: 'black', cur_color2: 'red', cur_color3: 'black' });
    }else{
      self.setData({ cur_color1: 'black', cur_color2: 'black', cur_color3: 'red' });
    }
    self.setData({
      'cut': cut
    })
    if(self.data.cut%2==0){
      self.setData({
        'animate_': '0'
      });
    }else{      
      self.setData({
        'animate_': '0'//代发
      });
    }
   
  }
})
