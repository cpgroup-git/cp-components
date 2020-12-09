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
          fade: true,
        },
        () => {
          this.setData({
            fade: false,
          });
        }
      );
    },
    _fadeOut: function () {
      this.setData({
        fade: true,
      });
    },
    transitionend: function () {
      console.log('this.data.visible:',this.data.visible)
      if (this.data.visible) {
        this.setData({
          hidden: false,
          fade: false,
        });
      } else {
        this.setData({
          hidden: true,
          fade: false,
        });
      }
    },
     // 禁止蒙层穿透
    catchTouchMove() {
      return;
    },
  },
});
