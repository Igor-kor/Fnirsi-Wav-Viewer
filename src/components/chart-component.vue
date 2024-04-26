<template>
  <input type="range" v-model="zoomValue" min="1" max="512" @input="updateZoom" />
  <div class="grid-container">

      <!-- Верхняя строка из 12 ячеек -->
      <div  class="cell">
        TimeScale {{ParseData.header.TimeScale.GetStringTimeScale()}}
      </div>
      <div class="cell">
        TriggerType {{ParseData.header.TriggerType}}
      </div>
      <div class="cell">
        TriggerEdge {{ParseData.header.TriggerEdge}}
      </div>
      <div class="cell">
        ScreenBrightness {{ParseData.header.ScreenBrightness}}
      </div>
      <div class="cell">
        GridBrightness {{ParseData.header.GridBrightness}}
      </div>
      <div class="cell">
        ScrollSpeed {{ParseData.header.ScrollSpeed}}
      </div>
      <div class="cell">
        CH1VerticalScale  {{ParseData.header.CH1VerticalScale}}
      </div>
      <div class="cell">
        CH2VerticalScale {{ParseData.header.CH2VerticalScale}}
      </div>
      <div class="cell">
        CH1Coupling {{ParseData.header.CH1Coupling}}
      </div>
      <div class="cell">
        CH2Coupling {{ParseData.header.CH2Coupling}}
      </div>
      <div class="cell">
        CH1Probe {{ParseData.header.CH1Probe}}
      </div>
      <div class="cell">
        CH2Probe {{ParseData.header.CH2Probe}}
      </div>

    <div class="main-cell">
      <!-- Большая ячейка слева -->
      <canvas ref="chartCanvas"></canvas>
    </div>
    <div class="right-column1">
      <!-- Первый столбец справа из 12 ячеек -->
      <div class="cell">Channel 1</div>
      <div class="cell">VMax {{ParseData.CH1Measurement.VMax/1000}}V</div>
      <div class="cell">VMin {{ParseData.CH1Measurement.VMin/1000}}V</div>
      <div class="cell">Vavg {{ParseData.CH1Measurement.Vavg/1000}}V</div>
      <div class="cell">Vrms {{ParseData.CH1Measurement.Vrms/1000}}V</div>
      <div class="cell">Vpp {{ParseData.CH1Measurement.Vpp/1000}}V</div>
      <div class="cell">Vp {{ParseData.CH1Measurement.Vp/1000}}V</div>
      <div class="cell">Freq {{ParseData.CH1Measurement.Freq.value.toFixed(2)}} {{ParseData.CH1Measurement.Freq.unit}}</div>
      <div class="cell">Cysle {{ParseData.CH1Measurement.Cysle}}</div>
      <div class="cell">TimePlus {{ParseData.CH1Measurement.TimePlus}}</div>
      <div class="cell">TimeMinus {{ParseData.CH1Measurement.TimeMinus}}</div>
      <div class="cell">DutyPlus {{ParseData.CH1Measurement.DutyPlus}}%</div>
      <div class="cell">DutyMinus {{ParseData.CH1Measurement.DutyMinus}}%</div>
    </div>
    <div class="right-column2">
      <!-- Второй столбец справа из 12 ячеек -->
      <div class="cell">Channel 2</div>
      <div class="cell">VMax {{ParseData.CH2Measurement.VMax/1000}}V</div>
      <div class="cell">VMin {{ParseData.CH2Measurement.VMin/1000}}V</div>
      <div class="cell">Vavg {{ParseData.CH2Measurement.Vavg/1000}}V</div>
      <div class="cell">Vrms {{ParseData.CH2Measurement.Vrms/1000}}V</div>
      <div class="cell">Vpp {{ParseData.CH2Measurement.Vpp/1000}}V</div>
      <div class="cell">Vp {{ParseData.CH2Measurement.Vp/1000}}V</div>
      <div class="cell">Freq {{ParseData.CH2Measurement.Freq.value.toFixed(2)}} {{ParseData.CH2Measurement.Freq.unit}}</div>
      <div class="cell">Cysle {{ParseData.CH2Measurement.Cysle}}</div>
      <div class="cell">TimePlus {{ParseData.CH2Measurement.TimePlus}}</div>
      <div class="cell">TimeMinus {{ParseData.CH2Measurement.TimeMinus}}</div>
      <div class="cell">DutyPlus {{ParseData.CH2Measurement.DutyPlus}}%</div>
      <div class="cell">DutyMinus {{ParseData.CH2Measurement.DutyMinus}}%</div>
    </div>
  </div>
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
      CH1Measurement:{},
      CH2Measurement:{},
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
              data: this.ParseData.CH1Data1,
              borderWidth: 1,
              pointStyle: 'line'
            },
            {
              label: 'Channel 2',
              borderColor: 'rgb(54,229,235)',
              backgroundColor: 'rgba(54,214,235,0.2)',
              data: this.ParseData.CH2Data1,
              borderWidth: 1,
              pointStyle: 'line'
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

.parent {

}


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
