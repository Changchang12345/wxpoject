// pages/chooseLib/chooseLib.js
var app = getApp();
//console.log(app.globalData.op)
const db = wx.cloud.database({});
Page({
  data: {
      userInfo: {},
      items:[],
      ne:[],
      id:[],
      myopenid:'',
      aUrl:'',
      nkName:'',
      bz:''
  },
  onLoad: function (options) {
    //console.log('全部变量appopenid',app.appopenid)
  },
  onShow: function () {
    this.getUserInfo();
    db.collection('beizhu').where({
      _openid:app.appopenid
    }).get({
          success:(res) =>{
              console.log('成功获取备注',res.data)
              this.setData({
                bz:res.data[0].bz
              })
          },
          fail: res => {
            console.log('没有找到备注')
          }
      })
  },
  getUserInfo(){
    //判断用户是否授权
    wx.getSetting({
     success: (data) => {
       console.log(data)
       if(data.authSetting['scope.userInfo']){
         this.setData({
           isShow:false
         })
       }else{
         this.setData({
           isShow:true
         })
       }
       
     }
   })
   //获取用户信息
   wx.getUserInfo({
     success: (data) => {
       console.log(data)
       this.setData({
         userInfo: data.userInfo,
         nkName:data.userInfo.nickName,
         aUrl:data.userInfo.avatarUrl
       })
     },
     fail: (data) => {
       console.log('shibai')
     }
   })
 },
 handleGetUserInfo(data){
   //用户是否点击的允许授权
   if(data.detail.rawData){
     this.getUserInfo();
   }
 },
})