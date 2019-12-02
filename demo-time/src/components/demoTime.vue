<template>
  <div class="main">
    <div class="timeBox">
      <div class="yearBox box">{{year}}</div>
      <!-- transform: rotate()定义 2D 旋转; (360/一个星期有几天)*今天是星期几 。-->
      <!-- 即：每个的星期旋转的角度 -->
      <div class="monDay box"
           :style="'transform: rotate('+(360/month.length)*curMon+'deg)'">
        <ul class="container">
          <li v-for="(v,i) in month"
              :key="i"
              :style="'transform: rotate('+(-360/month.length) * (i+1) +'deg);transform-origin: -100% 50% 0px;margin-left:150px;margin-top:90px'">{{v}}</li>
        </ul>
      </div>
      <div class="dayBox box"
           :style="'transform: rotate('+(360/day.length)*curDay+'deg)'">
        <ul class="container">
          <li v-for="(v,i) in day"
              :key="i"
              :style="'transform: rotate('+(-360/day.length) * (i+1) +'deg);transform-origin: -200% 50% 0px;margin-left:300px;margin-top:190px'">{{v}}</li>
        </ul>
      </div>
      <div class="hourBox box"
           :style="'transform: rotate('+(-360/hour.length)*curHour+'deg)'">
        <ul class="container">
          <li v-for="(v,i) in hour"
              :key="i"
              :style="'transform: rotate('+(360/hour.length)*i+'deg);transform-origin: -300% 50% 0px;margin-left:450px;margin-top:290px'">{{v}}</li>
        </ul>
      </div>
      <div class="minutesBox box"
           :style="'transform: rotate('+(-360/minutes.length)*curMin+'deg)'">
        <ul class="container">
          <li v-for="(v,i) in minutes"
              :key="i"
              :style="'transform: rotate('+(360/minutes.length)*i+'deg);transform-origin: -400% 50% 0px;margin-left:600px;margin-top:390px'">{{v}}</li>
        </ul>
      </div>
      <div class="secondBox"
           :style="'transform: rotate('+(-360/seconds.length)*curSec+'deg)'">
        <ul class="container">
          <li v-for="(v,i) in seconds"
              :key="i"
              :style="'transform: rotate('+(360/seconds.length)*i+'deg);transform-origin: -500% 50% 0px;margin-left:750px;margin-top:490px'">{{v}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      data: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '佰', '仟', '万'],
      curSec: 0, // 当前秒数
      curDay: 0, // 当前天数
      curMin: 0, // 当前分钟
      curHour: 0, //当前小时
      curMon: 0, //当前月
      day: [], // 星期
      hour: [], // 小时
      minutes: [], // 分钟
      month: [], // 月
      year: '2019', // 年
      seconds: [],
    }
  },
  created () {
    this.dealData()
    var sky = ['', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚']
    var land = ['', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申']
    var one = new Date().getFullYear() % 10 // 当前年除以10取余 对应的是古法纪年
    var two = new Date().getFullYear() % 12 // 当前年除以12取余 
    this.year = sky[one] + land[two]
    this.seconds = JSON.parse(JSON.stringify(this.minutes))
    // 每一秒跟新一次时间
    setInterval(() => {
    this.getTime()
    }, 1000)

  },
  methods: {
    dealData () { // 生成数据
      // 星期
      for (let i = 0; i < 7; i++) {
        this.day.push('星期' + this.data[i + 1])
      }
      // 小时
      for (let i = 0; i < 24; i++) {
        if (i < 11) {
          this.hour.push('零' + this.data[i])
        } else {
          // parseInt(i / 10) > 1 ? this.data[parseInt(i/10)] : '' 当i除以10大于1的时候取整并获得this.data里面的第parseInt(i / 10)个
          // parseInt(i % 10) !== 0 ? this.data[i % 10] : ''  当i除以10的余数不等于0的时候获取到this.data里面的第i % 10个
          this.hour.push((parseInt(i / 10) > 1 ? this.data[parseInt(i / 10)] : '') + '拾' + (parseInt(i % 10) !== 0 ? this.data[i % 10] : ''))
        }
      }
      // 分钟
      for (let i = 0; i < 60; i++) {
        if (i < 11) {
          this.minutes.push('零' + this.data[i])
        } else {
          this.minutes.push((parseInt(i / 10) > 1 ? this.data[parseInt(i / 10)] : '') + '拾' + (parseInt(i % 10) !== 0 ? this.data[i % 10] : ''))
        }
      }
      // 月
      for (let i = 0; i < 12; i++) {
        if (i < 10) {
          this.month.push('零' + this.data[i + 1])
        } else {
          this.month.push('拾' + this.data[(i % 10) + 1])
        }
      }
    },

    getTime () {
      let now = new Date();
      this.curSec = now.getSeconds()
      this.curMon = now.getMonth() + 1
      this.curDay = now.getDay()
      this.curMin = now.getMinutes()
      this.curHour = now.getHours()
    }

  }
}
</script>
<style scoped>
.box {
  position: absolute;
  transition: 1s;
}
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #ccc;
}

.timeBox {
  width: 800px;
  height: 800px;
  margin: 0 auto;
  position: relative;
}
.yearBox {
  top: 50%;
  left: 50%;
  height: 40px;
  width: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}
.monDay {
  width: 286px;
  height: 234px;
  top: 305px;
  left: 278px;
}
.dayBox {
  width: 481px;
  height: 434px;
  top: 201px;
  left: 181px;
}
.hourBox {
  width: 680px;
  height: 630px;
  top: 104px;
  left: 82px;
}
.minutesBox {
  width: 879px;
  height: 834px;
  top: 2px;
  left: -16px;
}
.secondBox {
  width: 1080px;
  height: 1033px;
  top: -97px;
  left: -117px;
  position: absolute;
}
.container {
  overflow: auto;
  list-style: none;
}
.container > li {
  width: 50px;
  height: 20px;
  font-size: 12px;
  position: absolute;
}
</style>

