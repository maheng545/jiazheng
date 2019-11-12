var app = getApp()
Page({
  data: {
    xianshi:false,
    kongbai:false
  },

  onLoad: function() {
    var that = this;
    var phone = wx.getStorageSync('phone')
    wx.request({
      url: 'http://localhost:3000/per/user_id/' + phone,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
      
       var id=res.data.data[0].id
        wx.request({
          url: 'http://localhost:3000/per/select_ruzhu_shenhe/' + id,
          method: 'GET',
          data: {},
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
           var data=res.data.data
        if (data != 0) {
          that.setData({
            xianshi:true,
           kongbai:false
          })
        }else{
          that.setData({
            xianshi: false,
            kongbai: true
          })
        }
          }
        })
      }
    })
  },

chakan: function() {
  wx.navigateTo({
    url: '../shengexiangqing/shengexiangqing',
  })
},
shoye: function() {
  wx.switchTab({
    url: '../shouye/shouye',
  })
}

})