Page({

    data:{
        imgUrls: [
       {
        
         url: '/image/7.jpg'
       }, {
        
         url: '/image/8.jpg'
       }, {
         
         url: '/image/9.jpg'
       }
     ],
     indicatorDots: true,  //小点
     autoplay: true,  //是否自动轮播
     interval: 3000,  //间隔时间
     duration: 2000,  //滑动时间
    },
   onLoad: function (options) {

    this.getType();   //调用getdata 函数

  },
  getType() {
    var that = this;
    wx.request({
      url: "http://localhost:3000/per/getType",
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          date: res.data.data
        })
      },
      fail: function (err) {  },

      complete: function () { }
    })
  },
  dianji:function(e){
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    var lujing="擦玻璃";
    if(name==lujing){
    wx:wx.navigateTo({
      url: '../baojie/baojie?id='+id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
  }
})