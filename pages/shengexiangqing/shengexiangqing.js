Page({
data:{
  tongguo:true,
  butongguo:false
},
  onLoad: function () {
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

        var id = res.data.data[0].id
        wx.request({
          url: 'http://localhost:3000/per/select_ruzhu_shenhe/' + id,
          method: 'GET',
          data: {},
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            console.log(res.data.data)
            var data = res.data.data[0].r_shenhe
            that.setData({
              data:res.data.data
            })
            if (data == '审核通过') {
              that.setData({
                tongguo: true,
                butongguo: false
              })
            } else if (data == '审核不通过'){
              that.setData({
                tongguo: false,
                butongguo: true
              })
              var r_id = res.data.data[0].r_id
              wx.request({
                url: 'http://localhost:3000/per/select_ruzhu_bohui/' + r_id,
                method: 'GET',
                data: {},
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                 that.setData({
                   data2:res.data.data
                 })
                }
              })
            }
          }
        })
      }
    })
  },

})