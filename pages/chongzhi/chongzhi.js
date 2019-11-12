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
  getMoney: function (e) {
    this.setData({
      money: e.detail.value
    })
  },
  onLoad: function (options) {
    var that=this;
    that.setData({
      b_name:wx.getStorageSync("b_name"),
    
    })
  },
  
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function (e) {
    
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
      var that = this;
      wx.request({
        url: 'http://localhost:3000/per/updateMoney',
        method: 'post',
        data: {
          money: this.data.money,
          b_id: wx.getStorageSync("b_id")
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {

          wx.showToast({
            title: '充值成功', //标题
            icon: 'loading', //图标，支持"success"、"loading"
            image: '../../image/zfcg.png', //自定义图标的本地路径，image 的优先级高于 icon
            duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
          })
          wx.navigateTo({
            url: '../zhifu/zhifu',
          })
        },
        fail: function (err) {
          console.log(err.data);
        },
        complete: function () { }
      })


    }
  },
  guanbi: function () {
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      showyincang: false
    })
  }, 
  /**
  * 显示支付密码输入层
  */
  // showInputLayer: function () {
  //   this.setData({
  //     showPayPwdInput: true,
  //     payFocus: true,          
  //     showyincang: true
  //   });
  // },
  showInputLayer:function(e){
    var that=this;
    var money = this.data.money;
    if(money ==null) {
      wx.showModal({
        title: '温馨提示',
        content: '请填写正确金额!', 
      })
} else {
      that.setData({
        showPayPwdInput: true,
        payFocus: true,
        showyincang: true
      });
      
   }

  }


})