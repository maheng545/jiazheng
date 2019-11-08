Page({

  data: {
    showPayPwdInput: false, //是否展示密码输入层
    pwdVal: '', //输入的密码
    payFocus: true, //文本框焦点
    showyincang: false,
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['1', '2', '3', '4', '5', '6'],//下拉列表的数据
    index: 0//选择的下拉列表下标

  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  onLoad: function (options) {

  },
  /**
  * 显示支付密码输入层
  */
  showInputLayer: function () {
    this.setData({
      showPayPwdInput: true,
      payFocus: true,
      showyincang: true
    });
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function () {
    /**获取输入的密码**/
    var val = this.data.pwdVal;
    console.log(val);
    /**在这调用支付接口**/
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      showyincang:false,
      pwdVal: ''
    }, function () {
      /**弹框**/
      wx.showToast({
        title: '充值成功', //标题
        icon: 'loading', //图标，支持"success"、"loading"
        image: '../../image/zfcg.png', //自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
      })
     
    });

  },
  /**
   * 获取焦点
   */
  getFocus: function () {
    this.setData({
      payFocus: true
    });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function (e) {
    this.setData({
      pwdVal: e.detail.value
    });

    if (e.detail.value.length >= 6) {
      this.hidePayLayer();
    }
  },
  guanbi: function () {
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      showyincang: false
    })
  }


})