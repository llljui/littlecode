'use strict';
let choose_year = null,
  choose_month = null;
const conf = {
  data: {
    hasEmptyGrid: false,
    showPicker: false,
    count:0
  },
  onLoad() {
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
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        day: i,
        choosed: false
      });
    }

    this.setData({
      days
    });
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

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days2.push({
        day2: i,
        choosed2: false
      });
    }//这里来请求数据哪些时间可预约

    this.setData({
      days2
    });
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
    console.log(p_time)
    const idx = e.currentTarget.dataset.idx;
    const days = this.data.days;

    const idxx = e.currentTarget.dataset.idxx;
    const days2 = this.data.days2;
    //console.log(days[idx].choosed);
    //console.log(days2[idxx].choosed2);
    if (p_time=="1"){
      days[idx].choosed = !days[idx].choosed;
      try {
        var value = wx.getStorageSync('click_count')
        if (value) {
         // console.log(value);
          if (value % 2 == 0) {
            console.log('被2整除');

          } else {
            console.log(value % 2)
          }
          try {
            wx.setStorageSync("click_count", Number(value) + 1);
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
      this.setData({
        days
      });

    }else{
      days2[idxx].choosed2 = !days2[idxx].choosed2;
      try {
        var value = wx.getStorageSync('click_count2')
        if (value) {
          //console.log(value);
          if (value % 2 == 0) {
            // console.log('被2整除');

          } else {
            //console.log(value % 2)
          }
          try {
            wx.setStorageSync("click_count2", Number(value) + 1);
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
      this.setData({
        days2
      });
    }
    
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
      desc: '还是新鲜的日历哟',
      path: 'pages/index/index'
    };
  },
  choseTime:function(){
   // console.log(666);
  }
};

Page(conf);