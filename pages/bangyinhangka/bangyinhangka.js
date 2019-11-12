Page({
  data: {
    b_number: '',
  }

  ,
  getNumber: function(e) {
    this.setData({
      b_number: e.detail.value
    })
  },
  getName: function(e) {
    this.setData({
      b_name: e.detail.value
    })
  },
  onLoad: function(e) {
    this.setData({
      phone: wx.getStorageSync('phone'),
    })
  },
  bingding(e) {
    var b_number = this.data.b_number
    var b_name = this.data.b_name
        wx.setStorageSync("b_number",b_number)

    wx.request({
      url: 'http://localhost:3000/per/addBank',
      method: 'post',
      data: {
        b_number: this.data.b_number,
        b_name: this.data.b_name,      
        id: wx.getStorageSync('id')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.showToast({
          title: '绑定成功',
          icon: 'none',
          duration: 1000
        })
        wx.navigateTo({
          url: '../zhifu/zhifu',
        })
      },
      fail: function(err) {
        console.log(err.data);
      },
      complete: function() {}
    })
  }
})