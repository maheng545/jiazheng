Page({

  onLoad: function (e) {
    var id = e.id;
    this.setData({
      id: id
    })

    var that = this;
    wx.request({
      url: 'http://localhost:3000/per/fuwu_price/' + id,
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        that.setData({
          date: res.data.data,
        })
  
      },

    })
   
  }
  
})