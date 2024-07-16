<template>
  <!-- Верхняя строка из 12 ячеек -->

  <div class="cell ch2Color">
    CH2 ON<br>{{header.CH2ON}}
  </div>
  <div class="cell ch2Color">
    CH2 FFT<br>{{header.CH2FFT}}
  </div>
  <div class="cell ch2Color">
    CH2VerticalScale {{header.CH2VerticalScale}}
  </div>
  <div class="cell ch2Color">
    CH2Coupling {{header.CH2Coupling}}
  </div>
  <div class="cell ch2Color">
    CH2Probe<br>{{header.CH2Probe}}
  </div>

  <div  class="cell">
    TimeScale {{header.TimeScale.GetStringTimeScale()}}
  </div>
  <div class="cell">
    TriggerType {{header.TriggerType}}
  </div>
  <div class="cell">
    TriggerEdge {{header.TriggerEdge}}
  </div>
  <div class="cell">
    ScreenBrightness {{header.ScreenBrightness}}
  </div>
  <div class="cell">
    GridBrightness {{header.GridBrightness}}
  </div>
  <div class="cell">
    ScrollSpeed {{header.ScrollSpeed}}
  </div>
  <div class="cell">
    XYMode<br>{{header.XYMode}}
    <input type="checkbox" v-model="header.XYMode" v-bind:true-value=1 v-bind:false-value=0>
  </div>
</template>

<script>
import {Header} from "@/classes/Header.js";
export default {
  props: {
    header:{Header}
  },
}
</script>

<style scoped>
.ch1Color{
  color: #f1db29;
}
.ch2Color{
  color: #36e5eb;
}
</style>