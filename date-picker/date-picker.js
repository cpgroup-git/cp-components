function dateFormat(date, fmt = 'yyyy-MM-dd') {
  let o = {  
    "M+": date.getMonth() + 1, //月份   
    "d+": date.getDate(), //日   
    "h+": date.getHours(), //小时   
    "m+": date.getMinutes(), //分   
    "s+": date.getSeconds(), //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds() //毫秒   
  };  
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));  
  }
  for (var k in o)  {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
    }
  }
  return fmt;  
}


let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// 根据年月获取当月的总天数
function getDays(year, month) {
  if (month === 2) {
    return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
  } else {
    return daysInMonth[month - 1]
  }
}

Component({
  properties: {
    startDate: {
      type: String,
      value: '开始时间'
    },
    endDate: {
      type: String,
      value: '结束时间'
    }
  },
  data: {
    years: [],
    months: [],
    days: [],
    value: [9999, 6, 30],
    isStartDate: true,
    tempStart: '',
    tempEnd: ''
  },
  methods: {
    catchTouchMove() {
      return;
    },

    startDateSelected() {
      this.setData({
        isStartDate: true
      })

      let dateArray = this.data.tempStart.split('-');
      const [year, month, day] = dateArray;
      let startYear = year ? +(year) : 0;
      let startMonth = month ? +(month) : 0;
      let startDay = day ? +(day) : 0;
      this.updateDate(startYear, startMonth, startDay);
    },

    endDateSelected() {
      this.setData({
        isStartDate: false
      })

      if (this.data.tempEnd === '结束时间') {
        this.setData({
          tempEnd: this.data.tempStart
        })
      }

      let dateArray = this.data.tempEnd.split('-');
      const [year, month, day] = dateArray;
      let startYear = year ? +(year) : 0;
      let startMonth = month ? +(month) : 0;
      let startDay = day ? +(day) : 0;
      this.updateDate(startYear, startMonth, startDay);
    },

    cancel() {
      this.triggerEvent('hideDatePicker');
      let { startDate, endDate } = this.data;
      if (endDate === '结束时间' || endDate === '') {
        endDate = '';
        this.setData({
          endDate: ''
        })
      }
      this.triggerEvent('selectedDate', {
        start: startDate,
        end: endDate
      });
    },

    confirm() {
      this.triggerEvent('hideDatePicker');
      let { tempStart, tempEnd } = this.data;
      if (tempEnd === '结束时间') {
        tempEnd = '';
        this.setData({
          tempEnd: ''
        })
      }
      this.triggerEvent('selectedDate', {
        start: tempStart,
        end: tempEnd
      });
    },

    bindValueChanged(e) {
      const { years, months, days, isStartDate } = this.data;
      const val = e.detail.value;
      const [y,m,d] = val;

      let year = years[y];
      let month = months[m];
      let day = days[d];
      this.updateDate(year, month, day);

      let dateStr = dateFormat(new Date(year, month - 1, day), 'yyyy-MM-dd');
      if (isStartDate) {
        this.setData({
          tempStart: dateStr
        })
      } else {
        this.setData({
          tempEnd: dateStr
        })
      }
    },

    // 根据年月日设置当前月有多少天 并更新年月日数组
    updateDate(year, month, day) {
      let daysNum = getDays(year, month);
      day = day > daysNum ? 1 : day;

      let dayList = [];
      // 重新设置日期列表
      for (let i = 1; i <= daysNum; i++) {
        dayList.push(i)
      }
      this.setData({
        days: dayList
      })

      const { years, months, days } = this.data;
      let yearIndex = years.indexOf(year);
      let monthIndex = months.indexOf(month);
      let dayIndex = days.indexOf(day);
      this.setData({
        value: [yearIndex, monthIndex, dayIndex]
      })
    }
  },

  attached() {
    const date = new Date();

    let arr1 = [], arr2 = [], arr3 = [];
    for (let i = 2015; i <= date.getFullYear(); i++) {
      arr1.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      arr2.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      arr3.push(i);
    }

    const { startDate, endDate } = this.properties;
    this.setData({
      years: arr1,
      months: arr2,
      days: arr3,
      tempStart: startDate,
      tempEnd: endDate === '' ? '结束时间' : endDate
    })

    let dateArray = startDate.split('-');
    const [year, month, day] = dateArray;
    let startYear = year ? +(year) : 0;
    let startMonth = month ? +(month) : 0;
    let startDay = day ? +(day) : 0;
    this.updateDate(startYear, startMonth, startDay);
  }
});