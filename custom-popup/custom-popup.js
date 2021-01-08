/**
 * type --- coupon
 * data: [
 *  {
 *   expireDate: 
 *   value
 *   label
 *   subTitle
 *   title
 *  }
 * ]
 * 
 * type --- image
 * data: {
 *  image:  图片路径
 * }
 * 
 * type --- text 
 * data: {
 *  title: 标题
 *  content: 文本
 *  showCancel: 是否有取消按钮
 *  cancelText: 取消按钮文本
 *  confirmText: 确定按钮文本
 * }
 */
Component({
  properties: {
    type: {  // counpon image text
      type: String,
      value: 'counpon'
    },
    data: {
      type: Object,
      value: {}
    },
    textColor: {
      type: String,
      value: 'yellowColor',
    }
  },
  data: {
    contentArray: []    
  },

  attached() {
    const { type, data: { content } } = this.properties;
    if (type === 'text' && content) {
      let array = content.split('\n');
      this.setData({
        contentArray: array
      })
    }
  },

  methods: {
    catchTouchMove() { return; },

    closeModal() {
      this.triggerEvent('closeModal')
    },

    submitModal() {
      this.triggerEvent('submitModal')
    },

    clickImage() {
      this.triggerEvent('clickImage', this.properties.data)
    },

    confirm() {
      this.triggerEvent('confirm')
    },

    cancel() {
      this.triggerEvent('cancel')
    }
  }
});