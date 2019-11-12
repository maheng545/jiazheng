var util = require('../../utils/util.js');

Page({
  
  data: {
    flag: 0,
    noteMaxLen: 300, // 最多放多少字
    info: "",
    noteNowLen: 0,//备注当前字数
  },
  // 监听字数
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({ info: value, noteNowLen: len })

  },
  // 提交清空当前值
  bindSubmit: function () {
    var that=this;
    var phone=wx.getStorageSync("phone");
    var phone1 = phone.substring(0, 3) + '****' + phone.substring(7);
    var time = util.formatTime(new Date());
    var p_id = wx.getStorageSync("p_id");
    var id = wx.getStorageSync("id");
    var info=this.data.info
    var flag = this.data.flag
    if(info ==""){
      wx.showToast({
        title: '请给出您的评价',
        icon: 'none',
        duration: 1000
      })
    }else if(flag==0){
      wx.showToast({
        title: '请评价您的服务',
        icon: 'none',
        duration: 1000
      })
    }
    else{
      var c_id = wx.getStorageSync("c_id", c_id)
      wx.request({
        url: 'http://localhost:3000/per/addEvalute',
        method: 'post',
        data: {
          info: this.data.info,
          time: util.formatTime(new Date()),
          phone1: phone.substring(0, 3) + '****' + phone.substring(7),
          p_id: wx.getStorageSync("p_id"),
          flag: this.data.flag,
          id: wx.getStorageSync("id"),
          c_id:wx.getStorageSync("c_id", c_id)
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          var o_id1 = wx.getStorageSync("o_id1")
          wx.request({
            url: 'http://localhost:3000/per/updateOrdersPingjia/' + o_id1,
            method: 'post',
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
             
            },
            fail: function (err) {
            },
            complete: function () { }
          })



          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1500,
            mask: false,
            success: function () {
              that.setData({ 
                info: '', noteNowLen: 0, flag: 0 
                })
            }
          }) 
          wx.navigateTo({
            url: '../dingdan/dingdan',
          })
        },
        fail: function (err) {
        },
        complete: function () { }
      })
       
        }
   
   

  },
  changeColor1: function () {
    var that = this;
    that.setData({
      flag: 1
    });
  },
  changeColor2: function () {
    var that = this;
    that.setData({
      flag: 2
    });
  },
  changeColor3: function () {
    var that = this;
    that.setData({
      flag: 3
    });
  },
  changeColor4: function () {
    var that = this;
    that.setData({
      flag: 4
    });
  },
  changeColor5: function () {
    var that = this;
    that.setData({
      flag: 5
    });
  },
  onLoad: function () {
    var that=this;
      var o_id1=wx.getStorageSync("o_id1")
    wx.request({
      url: 'http://localhost:3000/per/selectPingjiaById/' +o_id1,
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        that.setData({
          date: res.data.data
        })
      },
      fail: function (err) { console.log(err.data); },

      complete: function () { }
    })

  }

})