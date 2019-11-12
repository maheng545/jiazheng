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
  showInputLayer: function() {
    this.setData({
      showPayPwdInput: true,
      payFocus: true,
      showyincang: true
      
    });
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function() {
    /**获取输入的密码**/
    var val = this.data.pwdVal;
    console.log(val);
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
      this.hidePayLayer();
    }
  },
  guanbi: function() {
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      showyincang: false
    })
  }


})