<script>
import {Header} from "@/classes/Header.js";

export default {
  props: {
    header:{Header}
  },
}
</script>

<template>
  <div class="cell ch1Color">
    CH1 ON<br>{{header.CH1ON}}
  </div>
  <div class="cell ch1Color">
    CH1 FFT<br>{{header.CH1FFT}}
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
</template>

<style scoped>

</style>