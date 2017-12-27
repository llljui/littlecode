'use strict';
let choose_year = null,
  choose_month = null;
const conf = {
  data: {
    hasEmptyGrid: false,
    showPicker: false,
    count:0,
    bg_show:'none',
    chose_type1_x:'0',
    chose_type1_y: '0',
    chose_type2_x: '0',
    chose_type2_y: '0',
    btn_left: 0,
    btn_top: 0,
    ifshow_:"none",
    page_time:null,
    borrow1:[],
    borrow2: [],
    cannot_time:null,
    cannotTime1:[],
    cannotTime2: []
  },
  onLoad() {
    var self=this;
    const date = new Date();
    const cur_year = date.getFullYear();
    var cur_year2 = date.getFullYear();//看是否是十二月
    const cur_month = date.getMonth() + 1;
    var nex_month = null;//2
    
    if (cur_month==12){
      cur_year2 = cur_year+1;
      nex_month=1;
    } else { cur_year2 = cur_year; nex_month = cur_month+1}
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
     
    this.calculateEmptyGrids2(cur_year2, nex_month);//2
    this.calculateDays2(cur_year2, nex_month);//2
    this.setData({
      cur_year,
      cur_year2,
      cur_month,
      nex_month,
      weeks_ch
    });

  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },//获取这个月的天数
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },//获取这个月第一天在星期几
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },//计算网格
  calculateDays(year, month) {
    var self=this;
    var temp_not1 = [];
    
    let days = [];
    const thisMonthDays = this.getThisMonthDays(year, month);
    wx.request({
      url: wx.getStorageSync('weburl'), //接口地址
      data: {
        api_name: 'car.car.getUseDayByCar',
        appid: 'cariosappid@u8ms@nsN2G8M2',
        token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
        PHPSESSID: wx.getStorageSync('phpsessid'),
        item_id: wx.getStorageSync('cur_car_id')
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
       // console.log(res.data.data);
        var temp_time = []
        function getTime(nS) {
          return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        }
        res.data.data.forEach(function (item, index) {
          temp_time.push(getTime(item).split(" ")[0]);
          let a = getTime(item).split(" ")[0].toString().split('/');
          if (a[1] == month) {
            temp_not1.push(a[2]);
          }

        });
        function sortNumber(a, b) {
          return a - b
        }
        self.setData({
          cannot_time: temp_time,
          cannotTime1: temp_not1.sort(sortNumber)
        });
        for (let i = 1; i <= thisMonthDays; i++) {
          days.push({
            day: i,
            choosed: false
          });
        }
        //console.log(temp_not1);
        temp_not1.forEach(function (item, index) {
          days.splice(item - 1, 1, {
            day: item ,
            choosed: true,
            active:'red'
          });
          console.log(item)
        });
        self.setData({
          days
        });
      }
    })//获取车辆可预约时间
    
  },//计算天数
  calculateEmptyGrids2(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids2 = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids2.push(i);
      }
      this.setData({
        hasEmptyGrid2: true,
        empytGrids2
      });
    } else {
      this.setData({
        hasEmptyGrid2: false,
        empytGrids2: []
      });
    }
  },//计算网格
  calculateDays2(year, month) {
    let days2 = [];
  //  var temp_not1 = [];
    var temp_not2 = [];
    var self=this;
    const thisMonthDays = this.getThisMonthDays(year, month);
    wx.request({
      url: wx.getStorageSync('weburl'), //接口地址
      data: {
        api_name: 'car.car.getUseDayByCar',
        appid: 'cariosappid@u8ms@nsN2G8M2',
        token: 'CcYjxf0ql8UGg5deWPVYjXQsdRJCBt0u',
        PHPSESSID: wx.getStorageSync('phpsessid'),
        item_id: wx.getStorageSync('cur_car_id')
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
       // console.log(res.data.data);
        var temp_time = []
        function getTime(nS) {
          return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        }
        res.data.data.forEach(function (item, index) {
          temp_time.push(getTime(item).split(" ")[0]);
          let a = getTime(item).split(" ")[0].toString().split('/');
          if (a[1] == month) {
            temp_not2.push(a[2]);
          } 
          //temp_not2=['21','1','11']
        });
        function sortNumber(a, b) {
          return a - b
        }
        self.setData({
          cannot_time: temp_time,
          cannotTime2: temp_not2.sort(sortNumber)
        });
        for (let i = 1; i <= thisMonthDays; i++) {
          days2.push({
            day2: i,
            choosed2: false
          });
        }
      //  console.log(temp_not1);
        temp_not2.forEach(function (item, index) {
          days2.splice(item - 1, 1, {
            day2: item,
            choosed2: true,
            active: 'red'
          });
         // console.log(item)
        });
        self.setData({
          days2
        });
      }
    })//获取车辆可预约时间

  },//计算天数2
  handleCalendar(e) {
    const hand = e.currentTarget.dataset.hand;
    if (hand==1){
      const handle = e.currentTarget.dataset.handle;
      const cur_year = this.data.cur_year;
      const cur_month = this.data.cur_month;
      if (handle === 'prev') {
        let newMonth = cur_month - 1;
        let newYear = cur_year;
        if (newMonth < 1) {
          newYear = cur_year - 1;
          newMonth = 12;
        }

        this.calculateDays(newYear, newMonth);
        this.calculateEmptyGrids(newYear, newMonth);

        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        });

      } else {
        let newMonth = cur_month + 1;
        let newYear = cur_year;
        if (newMonth > 12) {
          newYear = cur_year + 1;
          newMonth = 1;
        }

        this.calculateDays(newYear, newMonth);
        this.calculateEmptyGrids(newYear, newMonth);

        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        });
      }
    }else{
      const handle = e.currentTarget.dataset.handle;
      const cur_year2 = this.data.cur_year2;
      const nex_month = this.data.nex_month;
      if (handle === 'prev') {
        let newMonth = nex_month - 1;
        let newYear = cur_year2;
        if (newMonth < 1) {
          newYear = cur_year2 - 1;
          newMonth = 12;
        }

        this.calculateDays2(newYear, newMonth);
        this.calculateEmptyGrids2(newYear, newMonth);

        this.setData({
          cur_year2: newYear,
          nex_month: newMonth
        });

      } else {
        let newMonth = nex_month + 1;
        let newYear = cur_year2;
        if (newMonth > 12) {
          newYear = cur_year2 + 1;
          newMonth = 1;
        }

        this.calculateDays2(newYear, newMonth);
        this.calculateEmptyGrids2(newYear, newMonth);

        this.setData({
          cur_year2: newYear,
          nex_month: newMonth
        });
      }//2
    }
  },//获取未来时间
  tapDayItem(e) {
    var p_time = e.currentTarget.dataset.ptime;
    //console.log(e)
    const idx = e.currentTarget.dataset.idx;
    const days = this.data.days;
    const color = e.currentTarget.dataset.color;
    if (color=='red'){
       console.log('hhda')
    }else{

    const idxx = e.currentTarget.dataset.idxx;
    const days2 = this.data.days2;
    var day_start = '';
    var day_end = '';
    //点击获取时间以及参宿
    if (p_time=="1"){
      days[idx].choosed = !days[idx].choosed;
      const borrow1 = this.data.borrow1;
      if (days[idx].choosed ){
        try {
          wx.setStorageSync("cur_month", this.data.cur_month);
        } catch (e) {
          console.log(e);
        }//设置月
        try {
          var value = wx.getStorageSync('cur_month');
          if (value) {
            borrow1.push(this.data.cur_year + '-' + value + '-' + (idx + 1) + ' ' + '00:00:00');
           // console.log(this.data.cur_year + '-' + value + '-' + (idx + 1) + ' ' + '00:00:00')//
          //  console.log(this.data.borrow1);
            this.setData({
              borrow1
            })
          }
        } catch (e) {
          console.log(e)// Do something when catch error
        }
      }else{
        try {
          wx.setStorageSync("cur_month", this.data.cur_month);
        } catch (e) {
          console.log(e);
        }//设置月
        try {
          var value = wx.getStorageSync('cur_month');
          if (value) {
            borrow1.splice(this.return_index(borrow1, this.data.cur_year + '-' + value + '-' + (idx + 1) + ' ' + '00:00:00'),1);
            console.log(this.data.borrow1)//         
            this.setData({
              borrow1
            })
          }
        } catch (e) {
          console.log(e)// Do something when catch error
        }
      }//如果是chosed

      ///
      this.setData({
        days
      });
    //本月的日历时间------------------------------------------------------------------------------------------------
    }else{
      days2[idxx].choosed2 = !days2[idxx].choosed2;
      const borrow2 = this.data.borrow2;
      if (days2[idxx].choosed2) {
        try {
          wx.setStorageSync("nex_month", this.data.nex_month);
        } catch (e) {
          console.log(e);
        }
        try {
          var value = wx.getStorageSync('nex_month')
          if (value) {
           // console.log(this.data.cur_year2 + '年' + value + '月' + (idxx + 1) + '日')// 获取当前时间
            borrow2.push(this.data.cur_year2 + '-' + value + '-' + (idxx + 1) + ' ' + '00:00:00');
            console.log(this.data.cur_year2 + '-' + value + '-' + (idxx + 1) + ' ' + '00:00:00')//
            console.log(this.data.borrow2);
            this.setData({
              borrow2
            })          }
        } catch (e) {
          // Do something when catch error
        }
      }else{
        try {
          wx.setStorageSync("nex_month", this.data.nex_month);
        } catch (e) {
          console.log(e);
        }//设置月
        try {
          var value = wx.getStorageSync('nex_month');
          if (value) {
            borrow2.splice(this.return_index(borrow2, this.data.cur_year2 + '-' + value + '-' + (idxx + 1) + ' '+'00:00:00'), 1);
            console.log(this.data.borrow2)//         
            this.setData({
              borrow2
            })
          }
        } catch (e) {
          console.log(e)// Do something when catch error
        }
      }    
      this.setData({
        days2
      });
    }
    //下月的日历时间-------------------------------------------------------------------------------------
    try {
      wx.setStorageSync("order_time", this.data.borrow1.concat(this.data.borrow2));
    } catch (e) {
      console.log(e);
    }
    if (wx.getSystemInfoSync().system.indexOf('Android')!=-1){
    // console.log('安卓')
    } else { 
     // console.log('ios');
     // console.log(wx.getStorageSync('order_time'));
      var temp;
      var temparr=[];
      wx.getStorageSync('order_time').forEach(function(item,index){
        temp=item.replace(/-/g,'/');
       // temp = item.split(' ');
        //temp.splice(1,0,'T');
       // temp.push('.000Z');
        //temp=temp.join('');
        temparr.push(temp);
        //console.log(temp);//.splice(3,0,'.000Z').join()
      });
      wx.setStorageSync('order_time',temparr);
    }

    //console.log(wx.getStorageSync('order_time'));
    }
   // -------------------------------------------------------------------------------------------------
  },//点击时间选择
  chooseYearAndMonth(e) {
    const val = e.currentTarget.dataset.val;
    if(val==1){
      const cur_year = this.data.cur_year;
      const cur_month = this.data.cur_month;
      let picker_year = [],
        picker_month = [];
      for (let i = 1900; i <= 2100; i++) {
        picker_year.push(i);
      }
      for (let i = 1; i <= 12; i++) {
        picker_month.push(i);
      }
      const idx_year = picker_year.indexOf(cur_year);
      const idx_month = picker_month.indexOf(cur_month);
      this.setData({
        picker_value: [idx_year, idx_month],
        picker_year,
        picker_month,
        showPicker: true,
      });
    }else{
      const cur_year2 = this.data.cur_year2;
      const nex_month = this.data.nex_month;
      let picker_year = [],
        picker_month = [];
      for (let i = 1900; i <= 2100; i++) {
        picker_year.push(i);
      }
      for (let i = 1; i <= 12; i++) {
        picker_month.push(i);
      }
      const idx_year = picker_year.indexOf(cur_year);
      const idx_month = picker_month.indexOf(cur_month);
      this.setData({
        picker_value: [idx_year, idx_month],
        picker_year,
        picker_month,
        showPicker: true,
      });
    }
    
  },//打开时间选择器
  pickerChange(e) {
    const val = e.detail.value;
    choose_year = this.data.picker_year[val[0]];
    choose_month = this.data.picker_month[val[1]];
  },//时间选择器时间改变
  tapPickerBtn(e) {
    const type = e.currentTarget.dataset.type;
    const o = {
      showPicker: false,
    };
    if (type === 'confirm') {
      o.cur_year = choose_year;
      o.cur_month = choose_month;
      this.calculateEmptyGrids(choose_year, choose_month);
      this.calculateDays(choose_year, choose_month);
    }
    this.setData(o);
  },//时间选择确认或者取消
  onShareAppMessage() {
    return {
      title: '小程序日历',
      desc: '新鲜日历',
      path: 'pages/index/index'
    };
  },
  choseTime:function(){
   // console.log(666);
  },
  cancel:function(){
    var self=this;
    self.setData({
      bg_show:'none'
    })
  },
  borrow_:function(){
    console.log('借');
    console.log(this.data.page_time);
    this.setData({
      ifshow_: "none"
    })
  },
  back_:function(){
    console.log('还')
    console.log(this.data.page_time);
    this.setData({
      ifshow_: "none"
    })
  },
  cancel_:function(){
    console.log('body')

  },
  return_index:function(arr,val){
    for(let i=0;i<arr.length;i++){
      if(arr[i]==val){
        return i;
      }else{
        console.log('找不到');
      }
    }
  },
  navto1:function(){
    console.log(2);

    wx.switchTab({
       url: '../index/index'
     })
  },
  navto2:function(){
    if(wx.getStorageSync('order_time')){
   //   console.log(wx.getStorageSync('order_time'));
      wx.navigateTo({
        url: '../details/details'
      })
    }else{
     console.log('您还未选时间');
    }
  }
};

Page(conf);