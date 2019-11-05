Page({
  data: {
    // logs: []
    a_address: '',
    a_xiangxi: '',
    a_name: '',
    a_phone: '',



  },
  onLoad: function(e) {
    var that = this;
    var id = wx.getStorageSync('id')
    wx.request({
      url: 'http://localhost:3000/per/selectAddressById/' + id,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        that.setData({
          date: res.data.data,
        })
      },
    })

  },
  clickImage(e) {
    let a_address = e.currentTarget.dataset.a_address
    let a_xiangxi = e.currentTarget.dataset.a_xiangxi
    let a_name = e.currentTarget.dataset.a_name
    let a_phone = e.currentTarget.dataset.a_phone
    let a_id = e.currentTarget.dataset.a_id
    wx.setStorageSync("a_id", a_id)

    wx.navigateTo({
      url: '../xiugai_address/xiugai_address?a_address=' + a_address + '&a_xiangxi=' + a_xiangxi + '&a_name=' + a_name + '&a_phone=' + a_phone,

    })
  },
  deleteImage(e) {
    let a_id = e.currentTarget.dataset.a_id
    wx.request({
      url: 'http://localhost:3000/per/deleteAddressById/' + a_id,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000

        })
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
        // that.setData({
        //   date: res.data.data
        // })
      },
      fail: function(err) {
        console.log(err.data);
      },

      complete: function() {}
    })
  }
})