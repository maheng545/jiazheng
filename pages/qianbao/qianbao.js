Page({
  data: {

    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['1', '2', '3', '4', '5', '6'], //下拉列表的数据
    index: 0 //选择的下拉列表下标,


  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  onLoad: function(options) {
    var that = this;
    var b_number = wx.getStorageSync("b_number");
    var id = wx.getStorageSync('id');
    console.log("钱包页面用户编号是:" + id)
    //查看钱包余额
    wx.request({
      url: 'http://localhost:3000/per/selectBank/' + id,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log("进入查看钱包余额请求")
        // if (res.data.data == "") {
          that.setData({
            date2: res.data.data
            // o_money: 0
          })
        // }
      },
      fail: function(err) {
        console.log(err.data);
      },

      complete: function() {}
    })
    //查看消费记录
    wx.request({
      url: 'http://localhost:3000/per/selectJieSuanById/' + id,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        that.setData({
          date1: res.data.data,
        })

      },
      fail: function(err) {},
      complete: function() {}
    })
    if (b_number == "") {
      that.setData({

        // o_image:""
      })
    } else {
      wx.request({
        url: 'http://localhost:3000/per/selectBankByNumber/' + b_number,
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          that.setData({
            date: res.data.data,
            o_money: res.data.data[0].b_money
            // o_image: "timg.jpg"
          })
          var b_name = res.data.data[0].b_name
          var b_id = res.data.data[0].b_id

          wx.setStorageSync("b_name", b_name)
          wx.setStorageSync("b_id", b_id)


        },
        fail: function(err) {},
        complete: function() {}
      })
    }
  },


  fanhui: function() {
    wx.switchTab({

      url: '../wode/wode',
    })
  },
  add_yinhang: function() {
    var id = wx.getStorageSync('id');
    wx.request({
      url: 'http://localhost:3000/per/selectBank/' + id,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data.data == "") {
          wx.navigateTo({
            url: '../bangyinhangka/bangyinhangka',
          })

        }else{
          wx.navigateTo({
            url: '../tianjiayinhangka/tianjiayinhangka',
          })
        }
      },
      fail: function(err) {
        console.log(err.data);
      },

      complete: function() {}
    })
    // wx.navigateTo({
    //   url: '../tianjiayinhangka/tianjiayinhangka',
    // })
  },
  chongzhi_add: function() {
    wx.navigateTo({
      url: '../chongzhi/chongzhi',
    })
  }

})