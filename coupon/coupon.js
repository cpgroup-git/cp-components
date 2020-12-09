Component({
  properties: {
    couponId: {
      type: String,
      value: '',
    },
    status: {
      //是否可用
      type: Boolean,
      value: true,
    },
    size: {
      type: String,
      value: 'normal', // 枚举类型： 'small' 'normal' 'big'
    },
    type: {
      // 优惠券类型 1：满减券 2：折扣券
      type: String,
      value: '1',
    },
    label: {
      type: String,
      value: '',
    },
    value: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    subTitle: {
      type: String,
      value: '',
    },
    desc: {
      type: String,
      value: '',
    },
    startDate: {
      type: String,
      optionalTypes: [Object, String],
      value: '',
    },
    expireDate: {
      type: String,
      optionalTypes: [Object, String],
      value: '',
    },
    showRules: {
      type: Boolean,
      value: false,
    },
    rules: {
      type: String,
      value: '',
    },
    ableChecked: {
      type: Boolean,
      value: false,
    },
    checked: {
      type: Boolean,
      value: false,
    },
    signType: {
      type: String,
      value: '', // expire: 失效 used: 已使用
    },
    useBtn: {
      type: Boolean,
      value: false,
    },
    color: {
      type: String,
      value: 'yellow'
    }
  },
  data: {
    openRules: false,
    longText: false
  },
  lifetimes: {
    attached(){
      if(this.data.value.length > 3){
        this.setData({
          longText: true
        })
      }
    }
  },
  methods: {
    arrowClicked: function () {
      this.setData({
        openRules: !this.data.openRules,
      });
    },
    clickUseBtn: function () {
      this.triggerEvent('clickusebtn', {
        id: this.data.couponId
      });
    },
    clickCheckbox: function() {
      this.triggerEvent('checkedcoupon', {
        id: this.data.couponId,
        checked: !this.data.checked
      });
    } 
  },
});
