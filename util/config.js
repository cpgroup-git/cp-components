const ROOTPATH = 'https://fe-ifarm.cpgroupcloud.com/static_resource/'

const CONFIG = {
  '1': {
    imgPath: ROOTPATH + 'cpmart-customer/',
    themeColor: '#FF8727'
  },
  '2': {
    imgPath: ROOTPATH + 'cpplus/',
    themeColor: '#00A762'
  }
}

function getImagePath(type = 1) {
  return CONFIG[type].imgPath;
}

function getThemeColor(type = 1) {
  return CONFIG[type].themeColor;
}

module.exports = { getImagePath, getThemeColor }