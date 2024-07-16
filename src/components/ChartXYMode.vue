<template>
  <canvas ref="chartXYCanvas"></canvas>
</template>

<script>
import HeaderData from "@/components/HeaderData.vue";
import MeasurementData from "@/components/MeasurementData.vue";
import {ParsedData} from "@/classes/ParsedData.js";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";

let ctx2 = null;
let chart2 = null;
export default {
  components: {HeaderData, MeasurementData},
  props: {
    ParseData:{ParsedData}
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
    chart2.destroy();
    this.renderChart();
  },
  methods: {
    renderChart() {
      const mergedArray = [];
      for (let i = 0; i < this.ParseData.CH1Data1.length; i++) {
        const x = this.ParseData.CH1Data1[i];
        const y = this.ParseData.CH2Data1[i];
        mergedArray.push({ x, y });
      }
      // Создание нового массива с заданной структурой
      ctx2 = this.$refs.chartXYCanvas.getContext('2d');
      Chart.register(zoomPlugin);
      chart2 = new Chart(ctx2, {
        type: 'scatter',
        update: 'active',
        data: {
          labels: this.generateLabels(),
          datasets: [{
            label: 'XY mode',
            borderColor: 'rgb(228,41,241)',
            backgroundColor: 'rgb(116,33,157)',
            data: mergedArray,
            borderWidth: 1,
            pointStyle: 'line',
            showLine: true,
          }]
        },
        options: {
          responsive: true,
          animation: false,
          scales: {
            x: {
              min: -300, // Минимальное значение по оси
              max: 300,
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
                maxTicksLimit: 20
              },
            },
            y: {
              min: -300, // Минимальное значение по оси
              max: 300,
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
                maxTicksLimit: 20
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
                mode: 'xy', // Зумирование и по x и по y
              }
            }
          }
        }
      });
    },
    generateLabels() {
      return this.ParseData.header.TimeScale.GetScalePoint();
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

</style>