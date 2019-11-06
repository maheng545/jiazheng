Page({
  onLoad: function(e) {
    this.setData({

      o_total: wx.getStorageSync('o_total'),
    })


  }
})