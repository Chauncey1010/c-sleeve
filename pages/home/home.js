//pages/home/home.js

import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    bannerB: null,
    grid: [],
    activityD: null,
    spuPaging: null,
    loadingType: 'loading'
  },

  async onLoad() {
    this.initAllData()
    this.initBottomSpuList()
  },

  async initBottomSpuList() {
    const paging = await SpuPaging.getLatestPaging()
    this.data.spuPaging = paging
    const data = await paging.getMoreDate()
    if (!data) {
      return
    }

    wx.lin.renderWaterFlow(data.items)
  },

  async initAllData() {
    const theme = new Theme()
    await theme.getThemes()

    const themeA = await theme.getHomeLocationA()
    const themeE = await theme.getHomeLocationE()

    let themeESpu = []
    if(themeE.online){
      const data = await Theme.getHomeLocationESpu()
      if(data){
        themeESpu = data.spu_list.slice(0,8)
      }
    }

    const themeF= await theme.getHomeLocationF()

    const bannerB = await Banner.getHomeLocationB()
    const grid = await Category.getHomeLocationC()
    const activityD = await Activity.getHomeLocationD()
    const bannerG = await Banner.getHomeLocationG()
    const themeH = await theme.getHomeLocationH()

    this.setData({
      themeA,
      bannerB,
      bannerG,
      themeE,
      themeESpu,
      themeF,
      grid,
      activityD,
      themeH
    })
  },


  onPullDownRefresh: function() {
  },

  onReachBottom: async function () {
    const data = await this.data.spuPaging.getMoreDate()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })
    }
  },

  onShareAppMessage: function() {
  }
})