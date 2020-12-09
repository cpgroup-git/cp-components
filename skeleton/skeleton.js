Component({
  properties: {
    selector: {
      type: String,
      value: 'skeleton'
    }
  },
  data: {
    skeletonRectLists: [],
    skeletonCircleLists: []
  },

  attached: function () {
  },
  ready: function () {
    //绘制矩形
    this.rectHandle();

    //绘制圆形
    this.radiusHandle();

  },
  methods: {
    rectHandle: function () {
      const that = this;
      wx.createSelectorQuery().selectAll(`.${this.data.selector} >>> .${this.data.selector}-rect`).boundingClientRect().exec(function (res) {
        that.setData({
          skeletonRectLists: res[0]
        })
      });

    },
    radiusHandle: function () {
      const that = this;
      wx.createSelectorQuery().selectAll(`.${this.data.selector} >>> .${this.data.selector}-radius`).boundingClientRect().exec(function (res) {
        that.setData({
          skeletonCircleLists: res[0]
        })
      });
    },

  }

})