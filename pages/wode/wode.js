Page({
data:{
  user:'立即登录',
  
},
onLoad:function(){
  var that=this;
 
  var phone = wx.getStorageSync('phone');
  var user = phone.replace(phone.substring(3, 8),'*****');
 
   if(phone!=0){
     that.setData({
       user: user,
       
     })
   } else if (phone==0){
     that.setData({
       user: "立即登录",
      
     })
   }

},
login:function(){
wx.navigateTo({
  url: '../login/login',
})
},
  tuichu:function(){
    var that=this;
wx.clearStorageSync();
   
    this.onLoad()
  }

})