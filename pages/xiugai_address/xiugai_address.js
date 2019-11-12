Page({
  data: {
    a_address: '',
    a_xiangxi: '',
    a_name: '',
    a_phone: ''

  },
  getA_name: function(e) {
    this.setData({
      aa_name: e.detail.value
    })
  },
  getA_phone: function(e) {
    this.setData({
      aa_phone: e.detail.value
    })
  },
  getA_address: function(e) {
    this.setData({
      aa_address: e.detail.value
    })
  },
  getA_xiangxi: function(e) {
    this.setData({
      aa_xiangxi: e.detail.value
    })
  },
  onLoad: function(e) {
    var a_address = e.a_address
    var a_xiangxi = e.a_xiangxi
    var a_name = e.a_name
    var a_phone = e.a_phone

    this.setData({
      a_address: e.a_address,
      a_xiangxi: e.a_xiangxi,
      a_phone: e.a_phone,
      a_name: e.a_name

    })

  },
  xiugai(e) {
    var aa_name = this.data.aa_name
    var a_id = wx.getStorageSync("a_id");
    wx.request({
      url: 'http://localhost:3000/per/updateAddressById',
      method: 'post',
      data: {
        a_id: wx.getStorageSync("a_id"),
        aa_name: this.data.aa_name,
        aa_phone: this.data.aa_phone,
        aa_address: this.data.aa_address,
        aa_xiangxi: this.data.aa_xiangxi
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',

          duration: 1000

        })
        wx.navigateTo({
          url: '../address/address',
        })

      },
      fail: function(err) {
      },

      complete: function() {}
    })
  }
})