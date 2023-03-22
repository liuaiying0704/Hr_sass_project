<template>
  <!--下载 -->
  <div id="main" style="width: 700px; height: 500px" ref="main"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initRadar()
  },
  methods: {
    initRadar() {
      let myChart = echarts.init(this.$refs.main)
      let option = {
        title: {
          text: 'Basic Radar Chart'
        },
        legend: {
          data: ['A', 'B']
        },
        radar: {
          // shape: 'circle',
          //   center: ['60%'],
          radius: 200, //半径，圆的大小
          startAngle: 90, //轴的角度
          splitNumber: 4, //圈数
          shape: 'circle',
          axisName: {
            formatter: '【{value}】', //坐标轴的字体样式
            color: 'red'
          },
          indicator: [
            { name: '迟到', max: 100 },
            { name: '早退', max: 100 },
            { name: 'bug', max: 100 },
            { name: '摸鱼', max: 100 },
            { name: '技术', max: 100 },
            { name: '创新', max: 100 }
          ],
          splitArea: {
            areaStyle: {
              color: ['#64AFE9', '#428BD4']
            }
          },
          //   坐标轴
          axisLine: {
            lineStyle: {
              color: 'blue'
            }
          }
        },

        series: [
          {
            name: '人员绩效表',
            type: 'radar',
            emphasis: {
              lineStyle: {
                width: '90px'
              }
            },
            data: [
              {
                value: [80, 80, 9, 55, 66, 11],
                name: '张三'
              },
              {
                value: [99, 77, 55, 55, 33, 77],
                name: '李四',
                itemStyle: {
                  color: 'red'
                },
                areaStyle: {
                  color: 'red'
                }
              }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped></style>
