// pages/databaseGuide/databaseGuide.js
const app = getApp()

Page({

  data: {
    avaUrl:'',
    nkname:'',
    step: 1,
    counterId: '',
    openid: '',
    queryResult: '',
    year:'',
    month:'',
    day:'',
    province:'',
    district:'',
    dtime: '',               //时间差
    dsum: 0,                 //日期换算成天数
    current: '',
    dot:'true',
    count:'3',
    selectArray1: [{
      "id": "1",
      "text": "2020"
  }],
  selectArray2: [{
    "id": "1",
    "text": "12"
},{
  "id": "2",
  "text": "11"
}],
selectArray3: [{
  "id": "1",
  "text": "1"
},{
  "id": "2",
  "text": "2"
},{
  "id": "3",
  "text": "3"
}],
selectArray4: [{
  "id": "1",
  "text": "辽宁"
}],
selectArray5: [{
  "id": "1",
  "text": "沈阳"
}],
selectArray6: [{
  "id": "5",
  "text": "与出发时间相差5天内"
},{
  "id": "3",
  "text": "与出发时间相差3天内"
}],
  },
  
//页面初始化就加载的数据
  onLoad: function (options) {
   
    // if (app.globalData.openid) {
    //   this.setData({
    //     openid: app.globalData.openid
    //   })
    // } 
    wx.cloud.callFunction({
      name:"login",
      success(res){
        console.log("获取成功",res);
      },
      fail(res){
        console.log("获取失败");
      }
    })
  },
  bindGetUserInfo(e){
   
    this.setData({
      nkname: e.detail.userInfo.nickName,
      avaUrl:e.detail.userInfo.avatarUrl,
    })    ,console.log(this.data.nkname)
  },

  handleChange (e) {
    //console.log(e.detail);
    this.setData({
        current: e.detail.key
    });
    wx.navigateTo({
      url: '/pages/'+e.detail.key+'/'+e.detail.key,
    })
},
  getDate1:function(e){
    //console.log(e.detail),
   this.setData({
    year:e.detail.text
   }) 
},
getDate2:function(e){
 // console.log(e.detail),
  this.setData({
   month:e.detail.text
  })
},
getDate3:function(e){
  //console.log(e.detail),
  this.setData({
   day:e.detail.text
  }),
  console.log(this.data.day)
},
getDate4:function(e){
  //console.log(e.detail.text),
  this.setData({
   province:e.detail.text
  })
},
getDate5:function(e){
 
  this.setData({
   district:e.detail.text
  }) ,
  console.log(e.detail)
},
// by -llj
getDate6: function(e) {
  this.setData({
    dtime: e.detail.text
  })
},
// by -llj
preSolveWhenAddOrMatch: function(){ // 更新dsum, 把日期转换为天数
  this.data.dsum = Math.ceil(new Date(this.data.year + '-' + this.data.month + '-' + this.data.day).getTime() / 24 / 3600 / 1000);
},
// by -llj
onAdd: function() {
  this.preSolveWhenAddOrMatch();
  const db = wx.cloud.database()
  db.collection('users').add({
    data: {
      year: this.data.year,
      month: this.data.month,
      day: this.data.day,
      province: this.data.province,
      district: this.data.district,
      dsum: this.data.dsum
    },
    success: res => {
      // 在返回结果中会包含新创建的记录的 _id
      this.setData({
        counterId: res._id,
      })
      wx.showToast({
        title: '发布成功',
      })
      console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '发布失败'
      })
      console.error('[数据库] [新增记录] 失败：', err)
    }
  })
},
// by -llj  此处有代码需要实现
onMatch: function() {
  this.preSolveWhenAddOrMatch();
  const db = wx.cloud.database();
  const _ = db.command;
  db.collection('users').where({
    dsum: _.lte(this.data.dsum + dtime).and(_.gte(this.data.dsum - this.data.dtime))
  }).get({
    success: function(res) {
      console.log(' [匹配记录] 成功：');
      // 按 dsum - res.data[i].dsum的从小到大绝对值排序，以便把最靠近当前日期的item放在前面展示
      //将res的每一条数据渲染成表单展示
      for(var i = 0; i < res.data.length; i++){
        console.log(res.data[i]);
      }
    },
    fail: err => {
      console.error(' [匹配记录] 失败：', err);
    }
  })
},
  onQuery: function() {
    // const db = wx.cloud.database()
    // // 查询当前用户所有的 counters
    // db.collection('users').where({
    //   _openid: this.data.openid
    // }).get({
    //   success: res => {
    //     this.setData({
    //       queryResult: JSON.stringify(res.data, null, 2)
    //     })
    //     console.log('[数据库] [查询记录] 成功: ', res)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
  },

  onCounterInc: function() {
    // const db = wx.cloud.database()
    // const newCount = this.data.count + 1
    // db.collection('counters').doc(this.data.counterId).update({
    //   data: {
    //     count: newCount
    //   },
    //   success: res => {
    //     this.setData({
    //       count: newCount
    //     })
    //   },
    //   fail: err => {
    //     icon: 'none',
    //     console.error('[数据库] [更新记录] 失败：', err)
    //   }
    // })
  },

  onCounterDec: function() {
    // const db = wx.cloud.database()
    // const newCount = this.data.count - 1
    // db.collection('counters').doc(this.data.counterId).update({
    //   data: {
    //     count: newCount
    //   },
    //   success: res => {
    //     this.setData({
    //       count: newCount
    //     })
    //   },
    //   fail: err => {
    //     icon: 'none',
    //     console.error('[数据库] [更新记录] 失败：', err)
    //   }
    // })
  },

  onRemove: function() {
    // if (this.data.counterId) {
    //   const db = wx.cloud.database()
    //   db.collection('counters').doc(this.data.counterId).remove({
    //     success: res => {
    //       wx.showToast({
    //         title: '删除成功',
    //       })
    //       this.setData({
    //         counterId: '',
    //         count: null,
    //       })
    //     },
    //     fail: err => {
    //       wx.showToast({
    //         icon: 'none',
    //         title: '删除失败',
    //       })
    //       console.error('[数据库] [删除记录] 失败：', err)
    //     }
    //   })
    // } else {
    //   wx.showToast({
    //     title: '无记录可删，请见创建一个记录',
    //   })
    // }
  },

  nextStep: function () {
    // 在第一步，需检查是否有 openid，如无需获取
    if (this.data.step === 1 && !this.data.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          this.setData({
            step: 2,
            openid: res.result.openid
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查是否有部署 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        }
      })
    } else {
      const callback = this.data.step !== 6 ? function() {} : function() {
        console.group('数据库文档')
        console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html')
        console.groupEnd()
      }

      this.setData({
        step: this.data.step + 1
      }, callback)
    }
  },

  prevStep: function () {
    this.setData({
      step: this.data.step - 1
    })
  },

  goHome: function() {
    const pages = getCurrentPages()
    if (pages.length === 2) {
      wx.navigateBack()
    } else if (pages.length === 1) {
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      wx.reLaunch({
        url: '../index/index',
      })
    }
  }

})