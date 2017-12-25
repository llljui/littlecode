Page({
  data: {
    objectMultiArray: [
      [
        {
          name: '绑定车辆'
        },
        {
          name: '其他车辆'
        }
      ], wx.getStorageSync('car_list').data
    ],
    multiIndex2: [0, 0],
  },
  getdata:function(){
    console.log(wx.getStorageSync('car_list').data);
    let temp = wx.getStorageSync('car_list').data;
    temp.shift();
    this.setData({
      list1: wx.getStorageSync('car_list').data[0],
      list2: temp
    })
    //console.log(temp);
  },
  onShow:function(){
    //console.log(wx.getStorageSync('carList'));
  },
  bindMultiPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex2: e.detail.value
    })
  },
  bindMultiPickerColumnChange2: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      objectMultiArray: this.data.objectMultiArray,
      multiIndex2: this.data.multiIndex2
    };
    data.multiIndex2[e.detail.column] = e.detail.value;
    console.log(this.data.list1);
    console.log(this.data.list2);
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex2[0]) {
          case 0:
            data.objectMultiArray[1] = [this.data.list1];
            break;
          case 1:
            data.objectMultiArray[1] = this.data.list2;
            break;
        }
        data.multiIndex2[1] = 0;
        // data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  }
})

