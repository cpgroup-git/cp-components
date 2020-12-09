const app = getApp();

Component({
  properties: {
    min: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: 99
    },
    quantity: {
      type: Number,
      value: 0
    },
    pid: {
      type: String,
    },
    imgUrl: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    currentPrice: {
      type: Number,
      value: 0
    },
    originPrice: {
      type: Number,
      value: 0
    },
    stockState: {
      type: Number,
      value: 0
    },
    activity: {
      type: String,
      value: ''
    },
    unit: {
      type: String,
      value: ''
    },
    showPrice: {
      type: Boolean,
      value: true
    },
    small: {
      type: Boolean,
      value: false
    },
    isReductionSale: {
      type: Number,
      value: 0
    },
    diffPrice: {
      type: Number,
      value: 0
    }
  },
  data: {
    isSalesman: false,
  },
  attached() {
    this.setData({
      isSalesman: app.globalData.userInfo.isSalesman ? true : false,
    })
  },
  methods: {
    checkStoreAuditStatus() {
      const currentUserStatus = app.globalData.currentUserStatus;
      let toast = currentUserStatus.toast;
      if (toast) {
        wx.showToast({
          title: toast,
          icon: 'none',
          duration: 1000
        })
        return false;
      }
      if (currentUserStatus.link && currentUserStatus.link.length !== 0) {
        wx.navigateTo({ url: currentUserStatus.link });
        return false;
      }
      return true;
    },

    add() {
      if (!this.checkStoreAuditStatus()) { return; }

      if (!this.properties.showPrice) { 
        this.triggerEvent("changeQuantity");
        return;
      }
      let quantity = this.properties.quantity;
      if (quantity >= 99999) { 
        wx.showToast({
          title: '超过可购买数量',
          icon: 'none',
          duration: 1000
        });
        return;
       }

      if (quantity >= this.properties.max) {
        wx.showToast({
          title: '库存不足',
          icon: 'none',
          duration: 1000
        });
        return;
      }

      if (quantity < this.properties.max) {
        quantity++;
        this.setData({
          quantity: quantity
        });
        let obj = {};
        obj.id = this.properties.pid;
        obj.quantity = this.properties.quantity;
        obj.status = 'add';
        this.triggerEvent("changeQuantity", obj);
      }
    }
  }
});