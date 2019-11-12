Page({
  data: {
    biao: "",
    textarea: '',
    bianji: '去编辑',
    fanwei: '去选择 >',
    mydata: '',
    bg: '',
    ditudata: '',
    tg: '',
    dizhi_text: '',
    yincang:'yincang1'

  },
  //点击到收费标准页面
  bianjishoufai: function() {
    wx.navigateTo({
      url: '../price/price',
    })
   
  },
  //获取上个页面的值
  onShow: function() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let json = currPage.data.mydata;
    var xiangmu_data = currPage.data.mydata.xiangmu_data
    var dizhi_data = currPage.data.mydata.dizhi_data
    
    if (xiangmu_data!=null){
      this.setData({
        bianji:'已编辑',
        bg:'bg1'
      })
    }
   
    if (dizhi_data != null) {
      var jiequ = dizhi_data.substring(0, 7);
       var zongchangdu=jiequ+'..'
      
      this.setData({
        fanwei: zongchangdu,
        tg: 'tg1',
        yincang: 'yincang2'
      })
    }
  },

  //点击跳到地图页面
  ditu: function() {
    wx.navigateTo({
      url: '../ditu/ditu',
    })
  },
  //获取文本框得值
  biaoti: function(e) {
    this.setData({
      biao: e.detail.value
    })

  },
  //获取多行文本的值
  bindTextAreaBlur: function(e) {
    this.setData({
      textarea: e.detail.value,

    })
  },

  checkedTap: function() {

    var checked = this.data.checked;
    var ch = this.data;
    this.setData({

      "checked": !checked

    })
    //选中是出现弹框
    if (checked != true) {
      wx.showModal({
        title: '立即上门/服务表示，承诺可以30分钟内上门/服务',
        showCancel: false,
        confirmText: '我知道了',
      })
    }
  },
  //按钮事件
  btn_fabu: function() {

    //获取文本框得值
    var shuju = this.data.biao;
    //获取多行文本的值
    var biaozhu = this.data.textarea;
    //获取去编辑框得值
    var qubianji = this.data.bianji;
    //获取服务地址范围
    var fanwei = this.data.fanwei;
    if (shuju == 0) {
      wx.showToast({
        title: '请填写服务标题',
        icon: 'none',
        duration: 1000
      })
    } else if (biaozhu == 0) {
      wx.showToast({
        title: '请填写服务介绍',
        icon: 'none',
        duration: 1000
      })
    } else if (qubianji == '去编辑') {
      wx.showToast({
        title: '请填写服务收费项',
        icon: 'none',
        duration: 1000
      })
    } else if (fanwei == '去选择 >') {
      wx.showToast({
        title: '请选择服务范围',
        icon: 'none',
        duration: 1000
      })
    } else {

      var xiangmu_data = wx.getStorageSync('xiangmu_data');
      var jiage_data = wx.getStorageSync('jiage_data');
      var danwei_data = wx.getStorageSync('danwei_data');
      var area_data = wx.getStorageSync('area_data');
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
          var id = res.data.data[0].id
           wx.request({
             url: 'http://localhost:3000/per/add_ruzhu',
        method: 'post',
        data: {
          r_biaoti: shuju,
          r_liucheng: biaozhu,
          r_xiangmu: xiangmu_data,
          r_price: jiage_data,
          r_jijia: danwei_data,
          r_beizhu: area_data,
          id:id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
             //查询所属id带到下一页面
          wx.request({
            url: 'http://localhost:3000/per/ruzhu_selectid',
            method: 'post',
            data: {
              r_biaoti: shuju,
              r_liucheng: biaozhu,
              r_xiangmu: xiangmu_data,
              r_price: jiage_data,
              r_jijia: danwei_data,
              r_beizhu: area_data,
              id: id
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
             var r_id=res.data.data[0].r_id;
              wx.setStorageSync('r_id', r_id);
             wx.navigateTo({
               url: '../fabuchenggong/fabuchenggong',
             })
            },

          })
        },

      })
        }
      })
     

    }
  }


})