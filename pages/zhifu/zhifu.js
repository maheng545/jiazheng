var util = require('../../utils/util.js');
Page({
  data: {
    showPayPwdInput: false, //是否展示密码输入层
    pwdVal: '', //输入的密码
    payFocus: true, //文本框焦点
    showyincang: false

  },
  onLoad: function(e) {
    this.setData({
      o_total: wx.getStorageSync('o_total'),
    })


  },
  /**
   * 显示支付密码输入层
   */
  //  showInputLayer: function() {
  //     this.setData({
  //       showPayPwdInput: true,
  //       payFocus: true,
  //       showyincang: true

  //     })
  //   },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function() {
    /**获取输入的密码**/
    var val = this.data.pwdVal;
    /**在这调用支付接口**/
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      showyincang: false,
      pwdVal: ''
    }, function() {
      /**弹框**/
      wx.showToast({
        title: '支付成功', //标题
        icon: 'loading', //图标，支持"success"、"loading"
        image: '../../image/zfcg.png', //自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
      })
    });

  },
  /**
   * 获取焦点
   */
  getFocus: function() {
    this.setData({
      payFocus: true
    });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function(e) {
    this.setData({
      pwdVal: e.detail.value
    });

    if (e.detail.value.length >= 6) {
      if (wx.getStorageSync('o_total') > wx.getStorageSync('b_money')) {
        wx.showModal({
          title: '温馨提示',
          content: '卡背余额不足，请及时充值!',
          success: function(res) {

            if (res.confirm) {

              wx.navigateTo({
                url: '../qianbao/qianbao',
              })

            } else if (res.cancel) {


            }

          }
        })

      } else {
        var that = this;
        wx.request({
          url: 'http://localhost:3000/per/updateMoney1',
          method: 'post',
          data: {
            money: wx.getStorageSync('o_total'),
            b_id: wx.getStorageSync("b_id")
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.showToast({
              title: '支付成功', //标题
              icon: 'loading', //图标，支持"success"、"loading"
              image: '../../image/zfcg.png', //自定义图标的本地路径，image 的优先级高于 icon
              duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
            })
            //接着明天打
            wx.request({
              url: 'http://localhost:3000/per/addJieSuan',
              method: 'post',
              data: {
                j_money: wx.getStorageSync('o_total'),
                j_time: util.formatTime(new Date()),
                b_id: wx.getStorageSync('b_id'),
                id: wx.getStorageSync('id'),
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success(res) {
                wx.navigateTo({
                  url: '../qianbao/qianbao',
                })


              },
              fail: function(err) {},
              complete: function() {}
            })

          },
          fail: function(err) {},
          complete: function() {}
        })
      }


    }
  },
  guanbi: function() {
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      showyincang: false
    })
  },
  zhufu(e) {
    var that = this;
    var id = wx.getStorageSync('id')
    console.log("点击支付前获取用户编号是:" + id)
    wx.request({
      url: 'http://localhost:3000/per/selectBank/' + id,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {

        if (res.data.data == "") {
          wx.request({
            url: 'http://localhost:3000/per/selectBank/' + id,
            method: 'GET',
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {

              if (res.data.data == "") {
                wx.showToast({
                  title: '您还未绑定银行卡，请绑定银行卡',
                  icon: 'none',
                  duration: 1000
                })
                wx.navigateTo({
                  url: '../qianbao/qianbao',
                })
              } else {
                var b_money = res.data.data[0].b_money;
                var b_id = res.data.data[0].b_id;
                wx.setStorageSync("b_id", b_id)
                wx.setStorageSync("b_money", b_money)
                that.setData({
                  showPayPwdInput: true,
                  payFocus: true,
                  showyincang: true
                })
              }
              that.setData({
                date: res.data.data,
              })

            },
            fail: function(err) {},
            complete: function() {}
          })
          wx.showToast({
            title: '您还未绑定银行卡，请绑定银行卡',
            icon: 'none',
            duration: 1000
          })
          wx.navigateTo({
            url: '../qianbao/qianbao',
          })
        } else {
          var b_money = res.data.data[0].b_money;
          var b_id = res.data.data[0].b_id;
          wx.setStorageSync("b_id", b_id)
          wx.setStorageSync("b_money", b_money)
          that.setData({
            showPayPwdInput: true,
            payFocus: true,
            showyincang: true

          })
        }
        that.setData({
          date: res.data.data,
        })

      },
      fail: function(err) {},
      complete: function() {}
    })
  }


})