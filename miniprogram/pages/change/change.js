// miniprogram/pages/change/change.js
var app = getApp()
const db = wx.cloud.database()
Page({

  data: {
    bz:'',
    pkey:''
  },
  getbz: function (e) {
    var val = e.detail.value;
    this.setData({
        bz: val
    });console.log(this.data.bz)
   
},   
addbz:function(e){
  db.collection('beizhu').add({
    data:{
      bz:this.data.bz
    },
    success:(res)=>{
      wx.showToast({
            title: '修改成功',
             });
    },
    fail: err => {
          wx.showToast({
            icon: 'none',
            title: '修改失败'
          })
          console.error('修改失败：', err)
        }
  })
},
updatebz:function(e){
  db.collection('beizhu').doc(this.data.pkey).update({
    data:{
      bz:this.data.bz
    },
    success:(res)=>{
      wx.showToast({
            title: '修改成功',
             });
    },
    fail: err => {
          wx.showToast({
            icon: 'none',
            title: '修改失败'
          })
          console.error('修改失败：', err)
        }
  })
},
bindChangebz:function(e){
  console.log(app.appopenid)
  db.collection('beizhu').where({
    _openid:app.appopenid
  }).get({
        success:(res) =>{
          if(res.data.length==0){
            console.log('数据库没有备注')
            this.addbz()
          }
          else{
            console.log('成功获取主键',res.data[0]._id)
            this.setData({
              pkey:res.data[0]._id
            })
            this.updatebz()
          }
        },
        fail: res => {
          console.log('没有找到主键')
        }
    })

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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