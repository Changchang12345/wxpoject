//app.js
var app = getApp(); 
App({
      
  globalData:{
   // appid:'wx68262e135382e8cf',//appid需自己提供，此处的appid我随机编写
    //secret:'acdd38bc20750418c9f7f9527ff9ea61',//secret需自己提供，此处的secret我随机编写
    op:''
    
},
  onLaunch: function () { var that=this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {//console.log('chusa'),
      wx.cloud.init({
        
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
         env: 'zxcloud',
        traceUser: true,
      })
    }
    wx.login({ 
      success: res => {
       // 发送 res.code 到后台换取 openId, sessionKey, unionId
       if (res.code) {
        wx.request({
         url: 'http://localhost:8081/user/login',
         method: 'POST',
         data: {
          code: res.code
         },
         header: {
          'content-type': 'application/x-www-form-urlencoded'
         },
         success(res) {
          console.log("openid:"+res.data.openid);
          if (res.data.openid != "" || res.data.openid!=null){
           // 登录成功
           that.globalData.op=res.data.openid;
           console.log(that.globalData.op)
           wx.setStorageSync("openid", res.data.openid);//将用户id保存到缓存中
           wx.setStorageSync("session_key", res.data.session_key);//将session_key保存到缓存中
          }else{
           // 登录失败
           // TODO 跳转到错误页面，要求用户重试
    
    
           return false;
          }
         }
        })
       } else {
        console.log('获取用户登录态失败！' + res.errMsg)
       }
      }
     })
  }
})