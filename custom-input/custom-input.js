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
    }
  },
  data: {

  },
  methods: {
    catchTouchMove() { 
      this.hide();
      return; 
    },

    inputValueChanged(e) {
      let value = e.detail.value;
      if (this.properties.type === 'number') {
        if (value.length > 5) {
          value = 99999;
        }
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
      let value = this.properties.type === 'number' ? this.properties.count : this.properties.content;
      this.triggerEvent('hideCountInput', value);
    },

    confirm() {
      this.hide();
    }
  }
})