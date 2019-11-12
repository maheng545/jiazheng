Page({

  tiao:function(){
    wx.navigateTo({
      url: '../bangyinhangka/bangyinhangka',
    })
  },
  onLoad:function(e){
    var that=this;
    var id = wx.getStorageSync('id');
    wx.request({
      url: 'http://localhost:3000/per/selectBank/' + id,
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
      fail: function (err) {
        console.log(err.data);
      },

      complete: function () { }
    })
   
  }
})