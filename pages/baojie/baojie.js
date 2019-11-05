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
  ,
  goumai:function(e){
    let p_name = e.currentTarget.dataset.p_name
    let p_price = e.currentTarget.dataset.p_price
    data: {
     
      p_name: e.currentTarget.dataset.p_name
      p_password: this.data.p_price
       
    }
  }
})