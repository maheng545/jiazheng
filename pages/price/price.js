Page({
data:{
bg:'bg1',
  neirong:'请选择 ⅴ',
  jijiafangshi:'',
  xiangmu_input_name:'',
  price_input_name:'',
  textarea:''
},
  xuanze:function(e){
this.setData({
  bg:'bg2'
})
},
  remove:function(e){
    this.setData({
      bg:'bg1'
    })
  },
  //获取单选按钮值
  radiodengjiChange: function (e) {
    this.setData({
      jijiafangshi:e.detail.value
    });
  
  },
  //获取项目input框值
  xiangmu_input_bind:function(e){
    this.setData({
      xiangmu_input_name: e.detail.value
    });
  },
  //获取价格框值
  price_input_bind:function(e){
    this.setData({
      price_input_name: e.detail.value
    });
  },
  //赋值到计价单位
  queren: function () {
    var jijia = this.data.jijiafangshi
    if(jijia!=0){
   this.setData({
     neirong: jijia,
     bg:'bg1'
   })
    }else{
      wx.showToast({
        title: '请选择计价单位',
        icon: 'none',
        duration: 1000
      })
    }
  },
  //获取多行文本的值
  bindTextAreaBlur: function (e) {
    this.setData({
      textarea: e.detail.value,

    })
  },
  //保存数据按钮
  baocunshuju:function(){
    var xiangmu = this.data.xiangmu_input_name
    var jiage = this.data.price_input_name
    var danwei=this.data.neirong
    var area=this.data.textarea
   if(xiangmu==0){
     wx.showToast({
       title: '请填写服务项目',
       icon: 'none',
       duration: 1000
     })
   }else if(jiage==0){
     wx.showToast({
       title: '请填写收费明细',
       icon: 'none',
       duration: 1000
     })
   } else if (danwei =='请选择 ⅴ'){
     wx.showToast({
       title: '请选择计价单位',
       icon: 'none',
       duration: 1000
     })
   }else if(area==0){
     wx.showToast({
       title: '请填写备注，方便客户了解',
       icon: 'none',
       duration: 1000
     })
   } else if (!(/^\+?[1-9][0-9]*$/.test(jiage))){
     wx.showToast({
       title: '请更正您的价格数目',
       icon: 'none',
       duration: 1000
     })
   }else{
     var xiangmu_data = this.data.xiangmu_input_name
     var jiage_data = this.data.price_input_name
     var danwei_data = this.data.neirong
     var area_data = this.data.textarea
      //用户存到本地
    wx.setStorageSync('xiangmu_data', xiangmu_data);
    //用户存到本地
    wx.setStorageSync('jiage_data', jiage_data);
    //用户存到本地
    wx.setStorageSync('danwei_data', danwei_data);
    //用户存到本地
    wx.setStorageSync('area_data', area_data);
    //返回上一个页面
     var pages = getCurrentPages();
     var prevPage = pages[pages.length - 2]; //上一个页面
     prevPage.setData({
       mydata: {
         xiangmu_data: xiangmu_data
       }
     })
     wx.navigateBack({//返回
       delta: 1
     })
   }
  }
})