Page({
  data: {
    // logs: []


  },

  onLoad: function(e) {
    var id1 = e.id;
    wx.setStorageSync("id1", id1)
    this.setData({
      id1: id1
    })
    this.getType();
    this.getType1();
  },
  getType() {
    var that = this;
    var id1 = wx.getStorageSync("id1")
    wx.request({
      url: 'http://localhost:3000/per/fuwu_price/' + id1,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        var p_id=res.data.data[0].p_id
        that.setData({
          date: res.data.data,
        })
      },
    })
  },
  getType1() {
    var that = this;



    var phone = wx.getStorageSync("phone")

    var phone = wx.getStorageSync("phone")
    wx.request({
      url: 'http://localhost:3000/per/user_id/' + phone,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {

        that.setData({
          date1: res.data.data,
        })
        var id = res.data.data[0].id
        wx.setStorageSync('id', id);
      }
    })
  },
  goumai: function(e) {
    let p_name = e.currentTarget.dataset.p_name
    let p_price = e.currentTarget.dataset.p_price
    wx.setStorageSync('p_name', p_name);
    wx.setStorageSync('p_price', p_price)
    data: {
      this.setData({
        p_name: e.currentTarget.dataset.p_name
      })

      wx.navigateTo({
        url: '../goumai/goumai?p_name=' + p_name + '&p_price=' + p_price,
      })
    }
  }



})