Component({
  properties: {
    quantity: {
      type: Number,
      value: 0
    },
    imgUrl: {
      type: String,
      value: ''
    },
    title: {
      type: String
    },
    originQuantity: {
      type: Number,
      value: 0
    },
    currentPrice: {
      type: Number,
      value: 0
    },
    originPrice: {
      type: Number,
      value: 0
    },
    unit: {
      type: String,
      value: ''
    },
    isGifts: {
      type: Boolean,
      value: false
    },
    isBalanceChange: {
      type: Boolean,
      value: false
    },
    size: {
      type: String,
      value: 'normal'
    },
    titleSize: {
      type: String,
      value: 'normal'
    },
    priceSize: {
      type: String,
      value: 'normal'
    }
  },
  data: {
  },
  created() {
  },
})