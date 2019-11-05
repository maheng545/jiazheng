Page({
  

 

  onLoad: function (e) {
    this.setData({
      o_name: wx.getStorageSync('p_name'),
      count: wx.getStorageSync('count'),
      o_time: wx.getStorageSync('o_time'),
      o_total: wx.getStorageSync('o_total'),
      aa_address: wx.getStorageSync('aa_address'),
      a_phone: wx.getStorageSync('a_phone')


    })
  

  }
})