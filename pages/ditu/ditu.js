// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: '4WZBZ-GEOER-FD2WB-WAFUE-YIYC7-YPFNI' // 必填
});

Page({
  data: {
    latitude: '',
    longitude: '',
    centerX: '',
    centerY: '',
    w: '',
    //可能我标识的地点和你所在区域比较远，缩放比例建议5;
    scale: 18,
    markers: [],
    controls: [{
      id: 1,
      iconPath: '../../image/marker_red.png',
      position: {
        left: 0,
        top: 10,
        width: 25,
        height: 30

      },
      clickable: true

    }],

  },

  onReady(e) {
    this.mapCtx = wx.createMapContext('myMap')

  },
  onChangeAddress() {
    var _page = this;
    wx.chooseLocation({
      success: (res) => {
        _page.setData({
          address: res.name,
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            iconPath: "../../image/marker_red.png",
            id: res.id || 0,
            name: res.name || '',
            latitude: res.latitude,
            longitude: res.longitude,
            width: 25,
            height: 30
          }]
        });
      },
      fail: (err) => {
        console.log(err);
      }
    });

  },
  onLoad: function() {
    console.log('地图定位！')
    let that = this

    that.moveToLocation(),
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: (res) => {
          let latitude = res.latitude;
          let longitude = res.longitude;
          let marker = this.createMarker(res);
          this.setData({
            centerX: longitude,
            centerY: latitude,

          })
        }
      });

  },

  /**
   * 标示点移动触发
   */
  regionchange(e) {
    console.log(e.type)

  },

  /**
   * 点击标识点触发
   */
  markertap(e) {
    console.log(e);


  },

  /**
   * control控件点击事件
   */
  controltap(e) {
    // console.log(e.controlId)
    this.moveToLocation()

  },


  /**
   * 获取标识
   */


  /**
   * 移动到自己位置
   */
  moveToLocation: function() {
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();

  },
  /**
   * 还有地图标识，可以在name上面动手
   */
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "../../image/marker_yellow.png",
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 25,
      height: 30

    };
    return marker;

  },
  dizhi_input: function(e) {
    this.setData({
      biao: e.detail.value
    })

  },
  onShow: function() {
    //获取文本框得值
    var dizhi_data = this.data.address
    if (dizhi_data != null) {
      //返回上一个页面
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        mydata: {
          dizhi_data: dizhi_data
        }
      })
      wx.navigateBack({ //返回
        delta: 1
      })
    }
  }
})