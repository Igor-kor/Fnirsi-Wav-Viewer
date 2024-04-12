<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
export default {
  props: {
    channel1Data: {
      type: Array,
      required: true
    },
    channel2Data: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      Chart.register(zoomPlugin); // Регистрация плагина Zoom
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.generateLabels(),
          datasets: [
            {
              label: 'Channel 1',
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              data: this.channel1Data,
              borderWidth: 1,
              pointStyle: 'line'
            },
            {
              label: 'Channel 2',
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              data: this.channel2Data,
              borderWidth: 1,
              pointStyle: 'line'
            }
          ]
        },
        options: {
          scales: {
            x: {
              grid: {
                display: true,
                drawBorder: false,
                color: ctx => {
                  if (ctx.tick && ctx.tick.value % 2 === 0) {
                    return 'rgba(255, 0, 0, 0.7)';
                  }
                  return 'transparent';
                }
              },
              ticks: {
                maxTicksLimit: 14
              }
            },
            y: {
              grid: {
                display: true,
                drawBorder: false,
                color: ctx => {
                  if (ctx.tick && ctx.tick.value % 2 === 0) {
                    return 'rgba(255, 0, 0, 0.7)';
                  }
                  return 'transparent';
                }
              },
              ticks: {
                maxTicksLimit: 8
              }
            }
          },
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'x' // Включение прокрутки по обеим осям X и Y
              },
              zoom: {
                wheel: {
                  enabled: true, // Включение зума по колесику мыши
                },
                // drag:{
                //   enabled: true,
                //   modifierKey: 'ctrl'
                // },
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
      // Генерация меток (по умолчанию используются числа 1, 2, 3,...)
      return this.channel1Data.map((_, index) => `Point ${index + 1}`);
    }
  }
};
</script>

<style scoped>
/* Можно добавить стили для вашего компонента здесь */
</style>
