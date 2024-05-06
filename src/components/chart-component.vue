<template>
  <input type="range" v-model="zoomValue" min="1" max="512" @input="updateZoom" />
  <div class="grid-container">
    <HeaderData :header = "ParseData.header"/>
    <div class="main-cell">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <div class="right-column1">
      <div class="cell">Channel 1</div>
      <MeasurementData :measurement="ParseData.CH1Measurement" />
    </div>
    <div class="right-column2">
      <div class="cell">Channel 2</div>
      <MeasurementData :measurement="ParseData.CH2Measurement" />
    </div>
  </div>
  <canvas ref="chartXYCanvas"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import MeasurementData from "@/components/MeasurementData.vue";
import HeaderData from "@/components/HeaderData.vue";
import {ParsedData} from "@/classes/ParsedData.js";
let ctx = null;
let ctx2 = null;
let chart = null;
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
    chart.destroy();
    chart2.destroy();
    this.renderChart();
  },
  methods: {
    renderChart() {
      // Создание нового массива с заданной структурой
      const mergedArray = [];
      for (let i = 0; i < this.ParseData.CH1Data1.length; i++) {
        const x = this.ParseData.CH1Data1[i];
        const y = this.ParseData.CH2Data1[i];
        mergedArray.push({ x, y });
      }

      ctx = this.$refs.chartCanvas.getContext('2d');
      ctx2 = this.$refs.chartXYCanvas.getContext('2d');
      Chart.register(zoomPlugin);
      chart = new Chart(ctx, {
        type: 'line',
        update: 'active',
        data: {
          labels: this.generateLabels(),
          datasets:[
            {
              label: 'Channel 1',
              borderColor: 'rgb(241,219,41)',
              backgroundColor: 'rgb(157,127,33)',
              data: this.ParseData.CH1Data1,
              borderWidth: 1,
              pointStyle: 'line',
              hidden: !this.ParseData.header.CH1ON
            },
            {
              label: 'Channel 2',
              borderColor: 'rgb(54,229,235)',
              backgroundColor: 'rgba(54,214,235,0.2)',
              data: this.ParseData.CH2Data1,
              borderWidth: 1,
              pointStyle: 'line',
              hidden: !this.ParseData.header.CH2ON
            },
            {
              label: 'Channel 1 data 2',
              borderColor: 'rgb(41,241,58)',
              backgroundColor: 'rgb(101,157,33)',
              data: this.ParseData.CH1Data2,
              borderWidth: 1,
              pointStyle: 'line',
              hidden: true
            },
            {
              label: 'Channel 2 data 2',
              borderColor: 'rgb(54,96,235)',
              backgroundColor: 'rgba(54,172,235,0.2)',
              data: this.ParseData.CH2Data2,
              borderWidth: 1,
              pointStyle: 'line',
              hidden: true
            }
          ]
        },
        options: {
          animation: false,
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
              min: -200, // Минимальное значение по оси
              max: 200,
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
              min: -200, // Минимальное значение по оси
              max: 200,
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
.grid-container {
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: repeat(13, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  gap: 5px; /* Промежуток между ячейками */
  justify-items: self-start;
}
.main-cell {
  grid-area: 2 / 1 / 13 / 14;
}
.right-column1 {
  color: rgb(241,219,41);
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(12, 1fr);
  display: grid;
  grid-area: 1 / 14 / 13 / 15;
  gap: 0px; /* Промежуток между ячейками */
}
.right-column2 {
  color: rgb(54,229,235);
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(12, 1fr);
  display: grid;
  grid-area: 1 / 15 / 13 / 15;
  gap: 0px; /* Промежуток между ячейками */
}
canvas {
  height: 100%;
  width: 100%;
}
</style>
