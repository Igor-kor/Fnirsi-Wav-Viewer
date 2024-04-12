<template>
  <div>
    {{ParseData.header.ScrollSpeed}}
  </div>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
  <input type="range" v-model="zoomValue" min="1" max="512" @input="updateZoom" />
</template>

<script>
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
let ctx = null;
let chart = null;
export default {
  props: {
    ParseData:{
      required: true,
      header:{
        CH1VerticalScale:{},
        CH2VerticalScale:{},
        CH1Coupling:{},
        CH2Coupling:{},
        CH1Probe:{},
        CH2Probe:{},
        TimeScale:{},
        TriggerType:{},
        TriggerEdge:{},
        ScreenBrightness:{},
        GridBrightness:{},
        ScrollSpeed:{}
      },
      CH1Data1:{},
      CH2Data1:{},
      CH1Data2:{},
      CH2Data2:{},
      OverData:{},
    }
  },
  data() {
    return {
      zoomValue: 256
    };
  },
  mounted() {
    this.renderChart();
  },
  updated() {
    chart.destroy();
    this.renderChart();
  },
  methods: {
    renderChart() {
      ctx = this.$refs.chartCanvas.getContext('2d');
      Chart.register(zoomPlugin); // Регистрация плагина Zoom
      chart = new Chart(ctx, {
        type: 'line',
        update: 'active',
        data: {
          labels: this.generateLabels(),
          datasets: [
            {
              label: 'Channel 1',
              borderColor: 'rgb(241,219,41)',
              backgroundColor: 'rgb(157,127,33)',
              data: this.ParseData.CH1Data2,
              borderWidth: 1,
              pointStyle: 'line'
            },
            {
              label: 'Channel 2',
              borderColor: 'rgb(54,229,235)',
              backgroundColor: 'rgba(54,214,235,0.2)',
              data: this.ParseData.CH2Data2,
              borderWidth: 1,
              pointStyle: 'line'
            }
          ]
        },
        options: {
          animation: false, // отключение анимации
          scales: {
            x: {
              auto: false, // Отключаем автоматическое масштабирование по оси x
              grid: {
                display: true,
                drawBorder: false,
                color: ctx => {
                  if( ctx.tick.value == 0)return 'rgba(255,0,195,0.5)';
                  return 'rgba(255, 0, 0, 0.5)';
                }
              },
              ticks: {
                maxTicksLimit: 28
              },
            },
            y: {
              min: -255, // Минимальное значение по оси x
              max: 255,
              auto: false ,// Отключаем автоматическое масштабирование по оси y
              grid: {
                display: true,
                drawBorder: false,
                color: ctx => {
                  if( ctx.tick.value == 0)return 'rgba(255,0,195,0.5)';
                  return 'rgba(255, 0, 0, 0.5)';
                }
              },
              ticks: {
                maxTicksLimit: 16
              },
            }
          },
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy' // Включение прокрутки по обеим осям X и Y
              },
              zoom: {
                wheel: {
                  enabled: true, // Включение зума по колесику мыши
                },
                pinch: {
                  enabled: true // Включение зума по масштабированию жестами
                },
                mode: 'x', // Зумирование и по x и по y
              }
            }
          }
        }
      });
    },
    generateLabels() {
      return this.ParseData.CH1Data2.map((_, index) => `Point ${index}`);
    },
    updateZoom() {
      if (chart) {
        chart.options.scales.y.min = -this.zoomValue;
        chart.options.scales.y.max = this.zoomValue-1;// todo: bug - draw float value if = this.zoomValue
        chart.update();
      }
    },
  },
};
</script>

<style scoped>
/* Можно добавить стили для вашего компонента здесь */
</style>
