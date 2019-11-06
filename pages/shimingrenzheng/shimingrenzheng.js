Page({
  data:{
    username:'',
    phone:''
  },
//获取姓名
username_input:function(e){
  this.setData({
    username: e.detail.value
  })
},
phone_input:function(e){
  this.setData({
    phone:e.detail.value
  })
},
  tijiao:function(){
    var user=this.data.username;
    var number=this.data.phone
    var phone=wx.getStorageSync('phone')
    var r_id=wx.getStorageSync('r_id')
     if(user==0){
       wx.showToast({
         title: '认证必须填写真实姓名',
         icon: 'none',
         duration: 1000
       })
     }else if(number==0){
       wx.showToast({
         title: '认证必须填写身份证号码',
         icon: 'none',
         duration: 1000
       })
     } else if (!(/(\d{15}$)|(^\d{18}$)|(\d{17}(\d|X|x)$)/.test(number))){
       wx.showToast({
         title: '身份证号码格式错误',
         icon: 'none',
         duration: 1000
       })
     } else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(user))){
       wx.showToast({
         title: '姓名格式有误',
         icon: 'none',
         duration: 1000
       })
     }else{
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
           wx.request({
             url: 'http://localhost:3000/per/add_shiming',
             method: 'post',
             data: {
               s_name: shuju,
               s_number: biaozhu,
             
               id: id,
               r_id:r_id
             },
             header: {
               'content-type': 'application/x-www-form-urlencoded'
             },
             success(res) {
               wx.showToast({
                 title: '认证成功，请等待审核',
                 icon: 'success',
                 duration: 1000
               })
               wx.switchTab({
                 url: '../wode/wode',
               })
             }
           })
         }
       })
     }
  }
})