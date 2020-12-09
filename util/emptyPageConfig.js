const { 
  SHOPCART_EMPTY, 
  SEARCH_PRODUCT_EMPTY, 
  SEARCH_STORE_EMPTY, 
  ORDER_EMPTY, 
  BILL_EMPTY, 
  NETWORK_FAIL, 
  LOCATION, 
  STORE_AUDIT, 
  STORE_BIND, 
  CITY_EMPTY,
  CUSTOMER_EMPTY, 
  VISITCART_EMPTY, 
  PRODUCT_EMPTY, 
  ORDER_SUMMARY_EMPTY, 
  ADDRESS_EMPTY } = require('./constant');

const STARUSCONFIG = {
  [SHOPCART_EMPTY]: {
    'icon': 'empty-shopcart.png',
    'title': '啥也没有',
    'desc': '赶紧去shopping吧～',
    'btn': '去购物'
  },
  [SEARCH_PRODUCT_EMPTY]: {
    'icon': 'empty-search.png',
    'title': '对不起',
    'desc': '没有搜索到您要的产品',
    'btn': '去首页'
  },
  [SEARCH_STORE_EMPTY]: {
    'icon': 'empty-search.png',
    'title': '没有搜索到符合的门店',
    'desc': ''
  },
  [NETWORK_FAIL]: {
    'icon': 'empty-network.png',
    'title': '网络链接超时',
    'desc': '请检查您的手机是否联网',
    'btn': '刷新'
  },
  [LOCATION]: {
    'icon': 'empty-location.png',
    'title': '为了给您提供更好的服务',
    'desc': '需要您授权位置信息',
    'btn': '去设置'
  },
  [ORDER_EMPTY]: {
    'icon': 'empty-order.png',
    'title': '啥也没有',
    'desc': '赶紧去shopping吧～',
    'btn': '去购物'
  },
  [BILL_EMPTY]: {
    'icon': 'empty-bill.png',
    'title': '账单为空呦',
    'desc': '赶紧去shopping吧～',
    'btn': '去购物'
  },
  [STORE_BIND]: {
    'icon': 'empty-city.png',
    'title': '为了给您提供更好的服务',
    'desc': '需要您先去绑定门店',
    'btn': '去绑定门店'
  },
  [STORE_AUDIT]: {
    'icon': 'empty-city.png',
    'title': '您的门店正在审核中',
    'desc': '请耐心等待',
  },
  [CITY_EMPTY]: {
    'icon': 'empty-city.png',
    'title': '当前城市暂未开通城市服务',
    'desc': '敬请期待',
  },
  [CUSTOMER_EMPTY]: {
    'icon': 'empty-city.png',
    'title': '您还没有客户',
    'desc': '赶紧去添加客户吧~',
  },
  [VISITCART_EMPTY]: {
    'icon': 'empty-visit-cart.png',
    'title': '您还没有创建客户拜访卡',
    'desc': '赶紧去添加吧~',
  },
  [PRODUCT_EMPTY]: {
    'icon': 'empty-product.png',
    'title': '小正在努力备货中...',
    'desc': '',
  },
  [ORDER_SUMMARY_EMPTY]: {
    'icon': 'empty-order.png',
    'title': '没有相关订单～',
    'desc': '',
  },
  [ADDRESS_EMPTY]: {
    'icon': 'empty-location.png',
    'title': '您还没有地址～',
    'desc': '',
  }
};

const { getImagePath } = require('./config');

function getEmptyStatus(type = 1, status = SHOPCART_EMPTY) {
  let imagePath = getImagePath(type);
  let obj = STARUSCONFIG[status];
  obj.iconUrl = imagePath + obj.icon;
  return obj;
}

module.exports = { getEmptyStatus }


