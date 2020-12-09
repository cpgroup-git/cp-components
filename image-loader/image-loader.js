const { ImageLoadQueue } = require('../util/imageLoadQueue');

Component({
  properties: {
    url:{
      type: String,
      value: '',
    },
    width: {
      type: Number,
      value: 0,
    },
    height: {
      type: Number,
      value: 0
    },
    mode: {
      type: String,
      value: 'scaleToFill'
    }
  },
  data: {
    imageUrl: ''
  },
  observers: {
    'url': function(url) {
      this.addTask();
    }
  },
  methods: {
    addTask() {
      const { url } = this.properties;
      ImageLoadQueue.addLoadTask(() => {
        return new Promise((resolve, reject) => {
          if (!url) {
            reject();
          } else {
            this.setData({
              imageUrl: url
            }, () => {
              resolve();
            });
          }
        })
      });
    }
  },
  attached: function(){
    // this.addTask();
  }
});