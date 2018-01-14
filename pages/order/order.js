Page({
  data: {
    nothing_show:'none',
    loading:true,
    cur_color1:'#00CCFF',
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
    order_list: [],
    status:'2',
    xline:'2.5vw',
    show: 'none',
    show_2: 'none',
    try: '0',
    opacity: '0'
  },
  onLoad: function () {
    var self=this;
    wx.request({
      url: wx.getStorageSync('weburl'), //接口地址
      data: {
        api_name: 'car.order.getOrderList',
        appid: 'cariosappid@u8ms@nsN2G8M2',
        token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
        firstRow:'0',
        order_status:self.data.status
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        function time(ti){
          var da = Number(ti);
          da = new Date(da);
          var year = da.getFullYear() + '年';
          var month = da.getMonth() + 1 + '月';
          var date = da.getDate() + '日';
         // console.log([year, month, date].join('/'));
          return [year, month, date].join('');
        }
        function formatDate(now) {
          var year = now.getYear();
          var month = now.getMonth() + 1;
          var date = now.getDate();
          var hour = now.getHours();
          var minute = now.getMinutes();
          var second = now.getSeconds();
          return "20" + year + "年" + month + "月" + date + "日 " + hour + ":" + minute + ":" + second;
        } 
        var s_temp=null;
        res.data.data.order_list.forEach(function(item,index){
          item.addtime = new Date(parseInt(item.addtime) * 1000).toLocaleString().replace(/\\/, '-');
          item.start_time = time(item.start_time);
          item.end_time = time(item.end_time);
        })
        self.setData({
          order_list: res.data.data.order_list,
          cur_page: res.data.data.NextFirstRow,
          all_total: res.data.data.total
        })
        console.log(self.data.order_list)
        if(self.data.order_list.length<1){
          self.setData({
            nothing_show:'block'
          })
        }else{
          self.setData({
            nothing_show: 'none'
          })
        }
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
    //console.log(self.data.cur_page+''+self.data.all_total)
    
    if(this.data.loading==true){
      if (self.data.all_total >= self.data.cur_page){
        this.setData({
          loading: false
        })
        self.setData({
          show: 'block',
          show_2: 'block',
          message: ''
        })
        setTimeout(function () {
          self.setData({
            show_2: 'block',
            try: '10',
            opacity: '1'
          })
        }, 10)////////等待
        setTimeout(function () {
          wx.hideNavigationBarLoading();
          wx.request({
            url: wx.getStorageSync('weburl'), //接口地址
            data: {
              api_name: 'car.order.getOrderList',
              appid: 'cariosappid@u8ms@nsN2G8M2',
              token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
              firstRow: self.data.cur_page,
              order_status: self.data.status
            },
            header: {
              "Content-Type": "application/json"
            },
            success: function (res) {
              console.log(res.data);
              function time(ti) {
                var da = new Date(ti);
                //console.log(da)
                function getLocalTime(nS) {
                  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
                }
                // console.log(getLocalTime(ti));
                var time = getLocalTime(ti).split(' ')[0].split('/');
                console.log(time)
                var year = time[0] + '年';
                var month = time[1] + '月';
                var date = time[2] + '日';
                // console.log([year, month, date].join('/'));
                return [year, month, date].join('');
              }
              var s_temp = null;
              s_temp = self.data.order_list;
              res.data.data.order_list.forEach(function (item, index) {
                item.addtime = new Date(parseInt(item.addtime) * 1000).toLocaleString().replace(/\\/, '-');
                item.start_time = time(item.start_time);
                item.end_time = time(item.end_time);
                s_temp.push(item);
              });
              console.log(s_temp);
              self.setData({
                order_list: s_temp,
                cur_page: res.data.data.NextFirstRow,
                all_total: res.data.data.total
              })
              if (self.data.order_list.length < 1) {
                self.setData({
                  nothing_show: 'block'
                })
              } else {
                self.setData({
                  nothing_show: 'none'
                })
              }
            }
          })
          self.setData({
            loading: true
          })
          self.setData({
            show: 'none',
            show_2: 'none',
            message: ''
          })
        }, 2000)
      }else{
        wx.hideNavigationBarLoading();
        console.log('已经到顶了');
      }
    }else{
      self.setData({
        loading: true
      })
      self.setData({
        show: 'block',
        show_2: 'block',
        loadshow: 'block',
        message: ''
      })
      setTimeout(function () {
        self.setData({
          show_2: 'block',
          try: '10',
          opacity: '1'
        })
      }, 10)
      setTimeout(function(){
        self.setData({
          show: 'none',
          show_2: 'none',
          loadshow: 'block',
          message: ''
        })
      },1500)
     
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
      self.setData({ cur_color1: '#87CEFA', cur_color2: 'black', cur_color3:'black',status:'2',xline:'2.5vw'});
    } else if (e.target.dataset.icon == '2'){
      self.setData({ cur_color1: 'black', cur_color2: '#87CEFA', cur_color3: 'black',status:'1' ,xline:'35vw'});
    }else{
      self.setData({ cur_color1: 'black', cur_color2: 'black', cur_color3: '#87CEFA', status: '3',xline:'67.5vw' });
    }
//-------------------------------请求--------------------------------------------------//
    self.setData({
      order_list:[]
    })
    wx.request({
      url: wx.getStorageSync('weburl'), //接口地址
      data: {
        api_name: 'car.order.getOrderList',
        appid: 'cariosappid@u8ms@nsN2G8M2',
        token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
        firstRow:0,
        order_status: self.data.status
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        function time(ti) {
          var da = new Date(ti);
          //console.log(da)
          function getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
          }
          // console.log(getLocalTime(ti));
          var time = getLocalTime(ti).split(' ')[0].split('/');
          console.log(time)
          var year = time[0] + '年';
          var month = time[1] + '月';
          var date = time[2] + '日';
          // console.log([year, month, date].join('/'));
          return [year, month, date].join('');
        }
        var s_temp = null;
        s_temp = self.data.order_list;
        res.data.data.order_list.forEach(function (item, index) {
          item.addtime = new Date(parseInt(item.addtime) * 1000).toLocaleString().replace(/\\/, '-');
          item.start_time = time(item.start_time);
          item.end_time = time(item.end_time);
          s_temp.push(item);
        });
        console.log(s_temp);
        self.setData({
          order_list: s_temp,
          cur_page: res.data.data.NextFirstRow,
          all_total: res.data.data.total
        })
        if (self.data.order_list.length < 1) {
          self.setData({
            nothing_show: 'block'
          })
        } else {
          self.setData({
            nothing_show: 'none'
          })
        }
      }
    })
//-------------------------------请求--------------------------------------------------//
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
