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
    /*
    db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'dev-115990'
    })*/
    var __data = JSON.parse(wx.getStorageSync('__data'));
    const _ = db.command;
    db.collection('users').where({
      dsum: _.lte(Number(__data.dsum) + Number(__data.dtime)).and(_.gte(Number(__data.dsum) - Number(__data.dtime)))
    }).get({
      success: res => {
        console.log(' [匹配记录] 成功：');
        console.log(res.data);
        this.setData({
          ne: res.data,
          nickName:'',
          avatarUrl: ''
        });
      },
      fail: err => {
        console.error(' [匹配记录] 失败：', err);
      }
    });
    wx.clearStorageSync('__data');

    /*
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
    })*/
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  go(e){
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '/pages/room/room?id='+e.currentTarget.dataset.id,
    })
    //console.log(e);
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})