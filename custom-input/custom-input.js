Component({
  properties: {
    type: {
      type: String,
      value: 'number'
    },
    count: {
      type: Number,
      value: 0
    },
    content: {
      type: String,
      value: ''
    },
    maxLength: {
      type: Number,
      value: 5
    }
  },
  data: {
    max: 0
  },
  attached() {
    let str = '';
    for(let i = 0; i < this.properties.maxLength; i++) {
      str += '9';
    }
    this.setData({
      max: parseInt(str)
    })
  },
  methods: {
    catchTouchMove() { 
      this.hide();
      return; 
    },

    inputValueChanged(e) {
      let value = e.detail.value;
      const { type, maxLength } = this.properties;
      if (type === 'number') {
        value = value.length > maxLength ? this.data.max : value;
        this.setData({
          count: value
        })
      } else {
        this.setData({
          content: value
        })
      }
    },

    hide() {
      const { type, count, content } = this.properties;
      let value = type === 'number' ? count : content;
      this.triggerEvent('hideCountInput', value);
    },

    confirm() {
      this.hide();
    }
  }
})