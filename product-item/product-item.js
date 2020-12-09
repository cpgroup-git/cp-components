const app = getApp();

Component({
  properties: {
    min: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: 999
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
      type: String
    },
    currentPrice: {
      type: Number,
      value: 0
    },
    originPrice: {
      type: Number,
      value: 0
    },
    unit: {
      type: String,
      value: ''
    },
    stockState: {
      type: Number,
      value: 0
    },
    size: {
      type: String,
      value: 'normal'
    },
    priceSize: {
      type: String,
      value: 'normal'
    },
    titleSize: {
      type: String,
      value: 'normal'
    },
    padding: {
      type: String,
      value: 'normal'
    },
    activity: {
      type: String,
      value: ''
    },
    canCountInput: {
      type: Boolean,
      value: true
    },
    showPrice: {
      type: Boolean,
      value: true
    },
    unit: {
      type: String,
      value: ''
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
    showCountInput: false,
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
    },
    
    reduce() {
      if (!this.checkStoreAuditStatus()) { return; }
      
      if (!this.properties.showPrice) { 
        this.triggerEvent("changeQuantity");
        return;
      }
      let quantity = this.properties.quantity;
      if (quantity > this.properties.min) {
        quantity--;
        this.setData({
          quantity: quantity
        })
        let obj = {};
        obj.id = this.properties.pid;
        obj.quantity = this.properties.quantity;
        obj.status = 'reduce';
        this.triggerEvent("changeQuantity", obj);
      } else {
        wx.showToast({
          title: '数量不能再减少了哦',
          icon: 'none',
          duration: 2000
        })
      }
    },

    hideCountInput(e) {
      let value = e.detail;
      if (value > this.properties.max) {
        value = this.properties.max;
      } else if (value < this.properties.min) {
        value = this.properties.min;
      }
      this.setData({
        showCountInput: false,
        quantity: value
      })
      let obj = {};
      obj.id = this.properties.pid;
      obj.quantity = this.properties.quantity;
      obj.status = 'update';
      this.triggerEvent("changeQuantity", obj);
    },

    inputCount() {
      if (!this.checkStoreAuditStatus()) { return; }

      if (!this.properties.showPrice) { 
        this.triggerEvent("showCountInput");
        return;
      }
      if (!this.properties.canCountInput) {
        let obj = {};
        obj.id = this.properties.pid;
        obj.quantity = this.properties.quantity;
        obj.stockNumber = this.properties.max;
        this.triggerEvent("showCountInput", obj);
        return;
      }
      this.setData({
        showCountInput: true
      })
    }
  }
});