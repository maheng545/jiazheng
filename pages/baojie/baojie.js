Page({
  data: {
    // logs: []
  

  },
  
  onLoad: function (e) {
    var id = e.id;
    wx.setStorageSync("id", id)
    this.setData({
      id: id
    })
    this.getType();
    this.getType1();
  }
 ,
 getType(){
   var that = this;
   var id=wx.getStorageSync("id")
   wx.request({
     url: 'http://localhost:3000/per/fuwu_price/' + id,
     method: 'GET',
     data: {
     },
     header: {
       'content-type': 'application/x-www-form-urlencoded'
     },
     success(res) {
       that.setData({
         date: res.data.data,
       })
     },
   })
  }, 
  getType1() {
    var that = this;

   

    var phone = wx.getStorageSync("phone")

    wx.request({
      url: 'http://localhost:3000/per/user_id/' + phone,
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        that.setData({
          date1: res.data.data,
        })
      }
    })
  }, 
     clickGetId: function (e) {
       let id = e.currentTarget.dataset.id
   
       wx.setStorageSync('id', id);

       console.log("用户的编号是:"+id); //获取上一个view的文本，不需要自定义data-*了
     },
  goumai:function(e){
    let p_name = e.currentTarget.dataset.p_name
    let p_price = e.currentTarget.dataset.p_price
    wx.setStorageSync('p_name', p_name);
    wx.setStorageSync('p_price', p_price)
    data: {
     

    this.setData({

      p_name: e.currentTarget.dataset.p_name
    })
 
    wx.navigateTo({
      url: '../goumai/goumai?p_name=' +p_name+'&p_price='+p_price,
    })
  }
  }
})