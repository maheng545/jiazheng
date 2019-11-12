Page({
  data: {
    // logs: []
    name: '',
    val: '',
    phone: '',
    address: '',
    xiangxi: '',
    id: '',
    dizhi: '收货地址',
    mydata: '',



  },
  laternext: function(e) {
    // console.log(e);
    var val = e.detail.value; //获取radio值，类型：字符串
    wx.setStorageSync('val', val);


  },
  getName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getPhone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getAddress: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  getXiangXi: function(e) {
    this.setData({
      xiangxi: e.detail.value
    })
  },

  save(e) {
    let name = this.data.name
    var val = wx.getStorageSync('val');
    var id = wx.getStorageSync('id');
    let phone = this.data.phone
    let address = this.data.dizhi
    let xiangxi = this.data.xiangxi

    if (name == "" || phone == "" || address == "" || xiangxi == "") {
      wx.showModal({
        title: '提示',
        content: '请完善地址信息!',
        success: function(res) {
          if (res.confirm) {} else {}
        }
      })
    } else {
      wx.request({
        url: 'http://localhost:3000/per/addAddress',
        method: 'post',
        data: {
          name: this.data.name,
          val: wx.getStorageSync('val'),
          phone: this.data.phone,
          address: this.data.dizhi,
          xiangxi: this.data.xiangxi,
          id: wx.getStorageSync('id')
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          wx.navigateTo({
            url: '../address/address',
          })
        },
        fail: function(err) {
          console.log(err.data);
        },
        complete: function() {}
      })
    }
  },
  tiaodao: function() {
    wx.navigateTo({
      url: '../ditu/ditu',
    })

  },
  //获取上个页面的值
  onShow: function() {
    var that = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let json = currPage.data.mydata;
    var dizhi_data = currPage.data.mydata.dizhi_data
    this.setData({
      dizhi: dizhi_data
    })


  }
})