Page({
  data: {
    // logs: []
    name: '',
    val: '',
    phone: '',
    address: '',
    xiangxi: '',
    id: ''


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
    let address = this.data.address
    let xiangxi = this.data.xiangxi
    // console.log("联系人姓名是:" + name);
    // console.log("单选按钮的值是:" + val);
    // console.log("电话是:" + phone);
    // console.log("地址的值是:" + address);
    // console.log("门牌号值是:" + xiangxi);
    // console.log("传过来编号是:" + id);
    if (name == "" || phone == "" || address == "" || xiangxi == "") {
      wx.showModal({
        title: '提示',
        content: '请完善地址信息!',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }
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
          address: this.data.address,
          xiangxi: this.data.xiangxi,
          id: wx.getStorageSync('id')
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          console.log("添加成功")
          wx.navigateTo({
            url: '../add_address/add_address',
          })
        },
        fail: function(err) {
          console.log(err.data);
        },
        complete: function() {}
      })
    }
  }
})