<template>
  <div class="hello">
    <span>please input a number:</span>
    <input type="text" v-model="count" placeholder="input a number">
    <div ref="echarts" id="homeChart" class="chart"></div>
    <div ref="echarts2" id="totalChart" class="chart"></div>
  </div>
</template>

<script>
  import { Api } from '../../api.js'
  var echarts = require('echarts')

  export default {
    name: 'HelloWorld',
    data () {
      return {
        chart: 1,
        test1: {
          title: {text: 'test1'},
          tooltip: {},
          xAxis: {
            data: []
          },
          yAxis: {},
          series: [{
            name: 'Price',
            type: 'bar',
            data: []
          }]
        },
        test2: {
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%']
            }
          },
          title: {
            left: 'center',
            text: 'Total'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2010', '2011', '2012']
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          series: [
            {
              name: 'Total',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: 'rgb(255, 70, 131)'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                  }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                  }])
                }
              },
              data: [1, 2, 3]
            }
          ]
        },
        count: 3
      }
    },
    methods: {
      initChart () {
        let myChart = echarts.init(this.$refs.echarts)
        // 基于准备好的dom，初始化echarts实例
        myChart.setOption(this.test1)
      },
      getMarketHistory (count) {
        let that = this
        if (count !== 0) {
          Api.getMarketHistory(count).then((result) => {
            let data = result.query.results.json.result
            that.test1.xAxis.data = []
            that.test1.series[0].data = []
            that.test2.xAxis.data = []
            that.test2.series[0].data = []
            if (data.length > 1) {
              data = data.reverse()
              data.forEach((i) => {
                that.test1.xAxis.data.push(i.TimeStamp)
                that.test1.series[0].data.push(i.Price)
                that.test2.xAxis.data.push(i.TimeStamp)
                that.test2.series[0].data.push(i.Total)
              })
            } else {
              that.test1.xAxis.data.push(data.TimeStamp)
              that.test1.series[0].data.push(data.Price)
              that.test2.xAxis.data.push(data.TimeStamp)
              that.test2.series[0].data.push(data.Total)
            }
            that.initChart()
            that.initChart2()
          })
        }
      },
      initChart2 () {
        let myChart = echarts.init(this.$refs.echarts2)
        // 基于准备好的dom，初始化echarts实例
        myChart.setOption(this.test2)
      }
    },
    mounted () {
      this.getMarketHistory(this.count)
//      this.initChart2()
    },
    watch: {
      count (i) {
        if (i !== 0) {
          this.getMarketHistory(i)
        } else {
          this.getMarketHistory(1)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .chart {
    width: 100%;
    height: 400px;
  }
</style>
