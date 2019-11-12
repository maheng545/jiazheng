//index.js
var zhenzisms = require('../../utils/zhenzisms.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    hidden: true,
    btnValue: '',
    btnDisabled: false,
    name: '',
    phone: '',
    code: '',
    second: 60
  },
  onLoad: function() {

  },
  //姓名输入
  bindNameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //手机号输入
  bindPhoneInput(e) {
    //console.log(e.detail.value);
    var val = e.detail.value;
    this.setData({
      phone: val
    })
    if (val != '') {
      this.setData({
        hidden: false,
        btnValue: '获取验证码'
      })
    } else {
      this.setData({
        hidden: true
      })
    }
  },
  //验证码输入
  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取短信验证码
  getCode(e) {
    var that = this;
    zhenzisms.client.init('https://sms_developer.zhenzikj.com', '103151', 'a7a25586-b1f9-49ae-a095-c5ea793bc6ce');
    zhenzisms.client.sendCode(function(res) {
      wx.showToast({
        title: res.data.data,
        icon: 'none',
        duration: 2000
      })
    }, that.data.phone, '验证码为:{code}', '', 60 * 5, 4);

  },
  timer: function() {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second + '秒',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  //保存
  save(e) {

    

    var that = this;
    //检验验证码
    var result = zhenzisms.client.validateCode(this.data.phone, this.data.code);
    if (result == 'ok') {
      console.log('验证正确');
      wx.showToast({

        title: '验证正确',

        icon: 'success',

        duration: 1000

      })
      var phone = this.data.phone;
      wx.request({
        url: 'http://localhost:3000/per/user_id/' + phone,
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          var data = res.data.data;
          if (data == 0) {
            // 如果没有用户就新建
           wx.request({
              url: 'http://localhost:3000/per/add_user/' + phone,
              data: {},
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              success(res) {
                //用户存到本地
                wx.setStorageSync('phone', phone);
                //跳到首页
                wx.switchTab({
                  url: '../shouye/shouye'
                })
               
              }

            })
          }
          else {
            //用户存到本地
            wx.setStorageSync('phone', phone);
            wx.switchTab({
              url: '../shouye/shouye'
            })
          }
        },

      })
    } else if (result == 'empty') {
      console.log('验证错误, 未生成验证码!');
    } else if (result == 'number_error') {
      console.log('验证错误，手机号不一致!');
    } else if (result == 'code_error') {
      wx.showToast({

        title: '验证码错误！',

        icon: 'none',

        duration: 1000

      })
      console.log('验证错误，验证码不一致!');
    } else if (result == 'code_expired') {
      console.log('验证错误，验证码已过期!');
    }
  }
})