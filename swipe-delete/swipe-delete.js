Component({
  properties: {
    actions: {
      type: Array,
      value: ['删除']
    },
    swipeData: {
      type: Object,
      value: {}
    },
    canSwipe: {
      type: Boolean,
      value: true
    },
    height: {
      type: Number,
      value: 212
    }
  },

  data: {
    animation: [],
    swipeCheckX: 35, //激活检测滑动的阈值
    swipeCheckState:0, //0未激活 1激活
    maxMoveLeft: 185, //列表项最大左滑距离
    correctMoveLeft: 130, //显示菜单时的左滑距离
    thresholdMoveLeft: 60,//左滑阈值，超过则显示菜单
    moveX: 0,  //记录平移距离
    showState: 0, //0 未显示菜单 1显示菜单
    touchStartState: 0, // 开始触摸时的状态 0 未显示菜单 1 显示菜单
    swipeDirection: 0, //是否触发水平滑动 0:未触发 1:触发水平滑动 2:触发垂直滑动 
    lastSwipeData: {},
  },

  attached() {
    this.data.correctMoveLeft = this.properties.actions.length * 70;
    this.data.thresholdMoveLeft = this.properties.actions.length * 30;
  },
  methods: {
    ontouchstart(e) {
      if (!this.properties.canSwipe) { return; }

      if (this.data.showState === 1) {
        this.translateXMsgItem(this.data.lastSwipeData, 0, 200);

        this.data.touchStartState = 1;
        this.data.moveX = 0;
        this.data.showState = 0;
        this.data.lastSwipeData = {};

        this.setData({
          showState: this.data.showState
        })
        return;
      }
      this.firstTouchX = e.touches[0].clientX;
      this.firstTouchY = e.touches[0].clientY;
      if (this.firstTouchX > this.data.swipeCheckX) {
        this.data.swipeCheckState = 1;
      }
      this.lastMoveTime = e.timeStamp;
    },

    ontouchmove(e) {
      if (!this.properties.canSwipe) { return; }

      if (this.data.swipeCheckState === 0) {
        return;
      }
      //当开始触摸时有菜单显示时，不处理滑动操作
      if (this.data.touchStartState === 1) {
        return;
      }
      var moveX = e.touches[0].clientX - this.firstTouchX;
      var moveY = e.touches[0].clientY - this.firstTouchY;
      //已触发垂直滑动，由scroll-view处理滑动操作
      if (this.data.swipeDirection === 2) {
        return;
      }
      //未触发滑动方向
      if (this.data.swipeDirection === 0) {
        //触发垂直操作
        if (Math.abs(moveY) > 4) {
          this.data.swipeDirection = 2;
          return;
        }
        //触发水平操作
        if (Math.abs(moveX) > 4) {
          this.data.swipeDirection = 1;
        }
        else {
          return;
        }   
      }

      this.lastMoveTime = e.timeStamp;
      //处理边界情况
      if (moveX > 0) {
        moveX = 0;
      }
      //检测最大左滑距离
      if (moveX < -this.data.maxMoveLeft) {
        moveX = -this.data.maxMoveLeft;
      }
      this.data.moveX = moveX;
      this.triggerEvent('updateSwipeState', true);
      this.translateXMsgItem(this.properties.swipeData, moveX, 0);
    },

    ontouchend(e) {
      if (!this.properties.canSwipe) { return; }

      if (this.data.touchStartState === 1) {
        this.data.touchStartState = 0;
        return;
      } 

      // var swipeDirection = this.data.swipeDirection;
      // //垂直滚动，忽略
      // if (swipeDirection !== 1) {
      //   return;
      // }
      this.data.swipeCheckState = 0;
      this.data.swipeDirection = 0;
      
      if (this.data.moveX === 0) {
        this.setData({
          showState: 0
        })
        return;
      }
      if (this.data.moveX === this.data.correctMoveLeft) {
        this.data.lastSwipeData = this.properties.swipeData;
        this.setData({
          showState: 1,
        })
        return;
      }  
      if (this.data.moveX < -this.data.thresholdMoveLeft) {
        this.data.moveX = -this.data.correctMoveLeft;
        this.data.showState = 1;
        this.data.lastSwipeData = this.properties.swipeData;
      } else {
        this.data.moveX = 0;
        this.data.showState = 0;
      }

      this.data.moveX = this.data.moveX;
      this.data.lastSwipeData = this.data.lastSwipeData;
      this.setData({
        showState: this.data.showState,
      })
      this.translateXMsgItem(this.properties.swipeData, this.data.moveX, 500);
    },

    onActionTap(e) {
      const name = e.currentTarget.dataset.name;
      if (name === '删除') {
        this.onDeleteTap();
      } else if (name === '设为默认') {
        this.onEditTap();
      }
    },

    onDeleteTap() {
      var animation = wx.createAnimation({duration:200});
      animation.height(0).opacity(0).step();

      this.triggerEvent('deleteData', this.properties.swipeData);
      this.ontouchstart();

      this.data.touchStartState = 0;
      this.setData({
        showState: 0,
      })
    },
  
    onEditTap() {
      this.triggerEvent('updateData', this.properties.swipeData);
      this.ontouchstart();

      this.data.touchStartState = 0;
      this.setData({
        showState: 0,
      })
    },

    translateXMsgItem(data, x, duration) {
      var animation = wx.createAnimation({duration:duration});
      animation.translateX(x).step();
      this.setData({
        animation: animation.export()
      })
    },
  }
})