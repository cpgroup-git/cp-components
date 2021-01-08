Component({
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    hidden: true,
    fade: false,
  },
  observers: {
    visible: function (visible) {
      if (visible) {
        this._fadeIn();
      } else {
        this._fadeOut();
      }
    },
  },
  methods: {
    _fadeIn: function () {
      this.setData(
        {
          hidden: false,
          fade: true
        },
        () => {
          this.setData({
            fade: false
          });
        }
      );
    },
    _fadeOut: function () {
      this.setData({
        fade: true
      });
    },
    transitionend: function () {
      this.setData({
        hidden: this.data.visible ? false : true,
        fade: false
      })
    },
    // 禁止蒙层穿透
    catchTouchMove() {
      return;
    },
  },
});
