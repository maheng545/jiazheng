Page({
  data:{
    bg:'bg1'
  },
  getMianJi: function (e) {
    this.setData({
      id: e.detail.value
    })
  },
  // 点击选择按钮出现选择时间框
  search_shijian:function(e){
    this.setData({
      bg: "bg2"
    })
  },
  // 点击取消时间框隐藏
  search_quxiao:function(e){
    this.setData({
      bg:"bg1"
    })
  }
})