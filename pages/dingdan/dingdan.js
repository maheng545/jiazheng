var time = require('../../utils/util.js');
Page({
  data: {

  },

  onLoad: function() {

    var that = this;
    var phone = wx.getStorageSync('phone');

    //根据用户查id
    wx.request({
      url: 'http://localhost:3000/per/user_id/' + phone,
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success(res) {
        // console.log(res.data.data[0].id)
        var id = res.data.data[0].id
        //查询待支付
        wx.request({
            url: "http://localhost:3000/per/select_orders_daizhifu/" + id,
            method: 'GET',
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {

              that.setData({
                date: res.data.data
              })

            },
            fail: function(err) {
              console.log(err.data);
            },

            complete: function() {}
          }),
          //查询已付款
          wx.request({
            url: "http://localhost:3000/per/select_orders_yifukuan/" + id,
            method: 'GET',
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
              that.setData({
                date2: res.data.data
              })
            },
            fail: function(err) {},
            complete: function() {}
          }),
          //查询已取消
          wx.request({
            url: "http://localhost:3000/per/select_orders_yiquxiao/" + id,
            method: 'GET',
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
              that.setData({
                date3: res.data.data
              })
            },
            fail: function(err) {},

            complete: function() {}
          }),
          //查询完成未评价
          wx.request({
            url: "http://localhost:3000/per/select_orders_yiwanchengdaipingjia/" + id,
            method: 'GET',
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
              that.setData({
                date4: res.data.data
              })
            },
            fail: function(err) {},

            complete: function() {}
          }),
          //查询完成已评价
          wx.request({
            url: "http://localhost:3000/per/select_orders_yiwanchengpingjia/" + id,
            method: 'GET',
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
              that.setData({
                date5: res.data.data
              })
            },
            fail: function(err) {},

            complete: function() {}
          })
      }
    })


  },
  quxiao_btn: function(e) {
    let o_id = e.currentTarget.dataset.o_id
    

    console.log("当前订单编号是:" + o_id)

    wx.request({
      url: 'http://localhost:3000/per/deleteOrdersById/' + o_id,
      method: 'post',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000
        })
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
        // that.setData({
        //   date: res.data.data
        // })
      },
      fail: function(err) {
        console.log(err.data);
      },
      complete: function() {}
    })
  }
  , goPingjia(e){
    let o_id1 = e.currentTarget.dataset.o_id 
    let c_id = e.currentTarget.dataset.c_id
    
    wx.setStorageSync("o_id1", o_id1)
    wx.setStorageSync("c_id", c_id)
   wx.navigateTo({
     url: '../pingjia/pingjia',
   })
  },
  tuikuan: function (e) {
    let o_id = e.currentTarget.dataset.o_id
    let o_total1 = e.currentTarget.dataset.o_total
    let id = wx.getStorageSync("id")
    var that=this;
wx.setStorageSync("o_total1",o_total1)
    wx.request({
      url: 'http://localhost:3000/per/tuikuanOrdersById/' + o_id,
      method: 'post',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.showToast({
          title: '退款成功',
          icon: 'success',
          duration: 1000
        })
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
        wx.request({
          url: 'http://localhost:3000/per/selectBank/' + id,
          method: 'GET',
          data: {},
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            that.setData({
              date: res.data.data,
            })
            var b_id = res.data.data[0].b_id;
            wx.setStorageSync("b_id", b_id)
            wx.request({
              url: 'http://localhost:3000/per/tuikuanAddBank',
              method: 'post',
              data: {
                b_id: wx.getStorageSync("b_id"),
                o_total1: wx.getStorageSync("o_total1")

              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success(res) {

              },
              fail: function (err) { },
              complete: function () { }
            })
          },
          fail: function (err) {
            console.log(err.data);
          },

          complete: function () { }
        })
      
          
      
 
      },
      fail: function (err) {
        console.log(err.data);
      },
      complete: function () { }
    })
  }
})