// pages/chooseLib/chooseLib.js
//var app = getApp();
//console.log(app.globalData.op)
const db = wx.cloud.database({});
const cont = db.collection('users');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      items:[],
      ne:[],
      id:[],
      openid:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
    //console.log(this.data.nickName, this.data.avaUrl)
  
  onLoad: function (options) {
    //console.log(this.data.Myopenid)
    var that = this;
    wx.getStorage({//获取本地缓存
      key:"openid",
      success:function(res){
        that.setData({
          openid:res.data
        });console.log(that.data.openid)
      },
    })
    //1、引用数据库   
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'dev-115990'
    })

   
    
     //2、开始查询数据了  news对应的是集合的名称  
      db.collection('users').get({
      //如果查询成功的话    
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          ne: res.data,
          nickName:'',
          avatarUrl:''
        })
      }
    })
  }

})