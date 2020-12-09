Component({
  properties: {
    placeholder: {
      type: String,
      value: '搜索'
    },
    inputValue: {
      type: String,
      value: ''
    },
    focused: {
      type: Boolean,
      value: true
    }
  },
  data: {
    showClear: false,
  },
  methods: {
    focus(e) {
      let value = e.detail.value;
      this.setData({
        showClear: !!value
      });
      this.triggerEvent('focus');
      this.triggerEvent('clear');
      this.triggerEvent('input', value);

    },
    input(e) {
      let value = e.detail.value;
      this.setData({
        showClear: !!value
      })
      this.triggerEvent('input', value);
    },
    clearText(e) {
      this.setData({
        showClear: false,
        inputValue: ''
      })
      this.triggerEvent('clear');
    },
    confirm(e) {
      this.triggerEvent('confirm', e.detail.value);
    },

  }
})