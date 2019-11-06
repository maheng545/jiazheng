var dateTimePicker = require('../../utils/dateTimePicker.js');
var util = require('../../utils/util.js');
var timeUtil = require('../../utils/timeUtil.js');


Page({
  data: {
    bg: 'bg1',
    dateTime: util.formatTime(new Date()),
    dateTime: '',
    startYear: 2019,
    endYear: 2050,
    o_time: '',
    a_phone: '',
    id: '',
    p_name: '',
    p_price: ''

  },

  pressView: function(e) {
    let a_phone = e.currentTarget.dataset.a_phone
    let a_address = e.currentTarget.dataset.a_address
    let a_xiangxi = e.currentTarget.dataset.a_xiangxi
    let aa_address = a_address + a_xiangxi
    wx.setStorageSync('a_phone', a_phone);
    wx.setStorageSync('aa_address', aa_address);
    console.log("标签的值是:" + a_phone + aa_address); //获取上一个view的文本，不需要自定义data-*了
  },
  getTime: function(e) {
    this.setData({
      o_time: e.detail.value
    })
  },
  changeDateTime(e) {
    this.setData({
      dateTime: e.detail.value
    });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  onLoad: function(e) {

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
    var that = this;
    var id = wx.getStorageSync('id');
    console.log("购买js传过来的id是:" + id)
    wx.request({
      url: 'http://localhost:3000/per/selectAddress/' + id,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        that.setData({
          date1: res.data.data,
        })
      },
      fail: function(err) {
        console.log(err.data);
      },
      complete: function() {}
    })

  },

  getMianJi: function(e) {
    this.setData({
      count: e.detail.value
    })
  },
  // 点击选择按钮出现选择时间框
  search_shijian: function(e) {
    this.setData({
      bg: "bg2"
    })
  },
  // 点击取消时间框隐藏
  search_quxiao: function(e) {
    this.setData({
      bg: "bg1"
    })
  },
  next1: function(e) {

    wx.navigateTo({
      url: '../address/address',
    })

  },
  next: function(e) {
    var p_name = wx.getStorageSync('p_name');
    var myDate = new Date();
    var count = this.data.count;
    wx.setStorageSync("count", count)
    var p_price = wx.getStorageSync('p_price');
    console.log(p_price)
    var o_total = count * p_price;
    console.log("总价是:" + o_total)
    wx.setStorageSync('o_total', o_total);
    let o_time = this.data.o_time;
    wx.setStorageSync("o_time", o_time)
    wx.setStorageSync("o_total", o_total)
    var date2 = util.formatTime(new Date());
    var stdt = new Date(o_time.replace("-", "/"));
    var etdt = new Date(date2.replace("-", "/"));
    if (count < 10 || count > 80) {
      wx.showModal({
        title: '温馨提示',
        content: '服务面积不再限定范围!',
      })
    } else if (stdt < etdt) {
      wx.showModal({
        title: '温馨提示',
        content: '不在服务时间范围!',
      })
    } else {
      var o_name = wx.getStorageSync('p_name');
      var o_price = wx.getStorageSync('p_price');
      wx.request({
        url: 'http://localhost:3000/per/addOrders',
        method: 'post',
        data: {
          o_name: wx.getStorageSync('p_name'),
          o_time: this.data.o_time,
          aa_address: wx.getStorageSync('aa_address'),
          a_phone: wx.getStorageSync('a_phone'),
          o_price: wx.getStorageSync('p_price'),
          o_count: this.data.count,
          o_total: o_total,
          id: wx.getStorageSync('id')
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          wx.navigateTo({
            url: '../yuyuedingdan/yuyuedingdan',
            //  url: '../goumai/goumai?p_name=' + p_name + '&p_price=' + p_price,
          })
        },
        fail: function(err) {
          console.log(err.data);
        },
        complete: function() {}
      })
    }
  }
})