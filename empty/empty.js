const { getEmptyStatus } = require('../util/emptyPageConfig');
const { getThemeColor } = require('../util/config');

Component({
  properties: {
    type: {   // 1 cpmart 2 cp+
      type: Number,
      value: 1,
    },
    status: {
      type: String,
      value: ''
    },
    bgColor: {
      type: String,
      value: '#fff'
    },
    color: {
      type: String,
      value: '#999'
    }
  },
  data: {
    currentStatus: {},
  },
  attached() {
    const { status, type } = this.properties;
    this.setData({
      currentStatus: getEmptyStatus[status],
      themeColor: getThemeColor(type)
    });
  },
  methods: {
    catchTouchMove() { 
      return; 
    },

    btnClicked() {
      this.triggerEvent('btnClicked', {
        status: this.properties.status,
        btn: this.data.currentStatus.btn
      })
    },
  }
})