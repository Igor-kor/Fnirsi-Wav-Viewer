<template>
  <!-- Верхняя строка из 12 ячеек -->
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
  <div class="cell ch1Color">
    CH1VerticalScale {{header.CH1VerticalScale}}
  </div>
  <div class="cell ch1Color">
    CH1Coupling {{header.CH1Coupling}}
  </div>
  <div class="cell ch1Color">
    CH1Probe<br>{{header.CH1Probe}}
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