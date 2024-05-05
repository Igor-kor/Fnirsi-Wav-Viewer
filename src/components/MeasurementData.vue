<template>
<!--  <div class="cell">{{Name}}</div>-->
  <div class="cell">VMax {{measurement.VMax/1000}}V</div>
  <div class="cell">VMin {{measurement.VMin/1000}}V</div>
  <div class="cell">Vavg {{measurement.Vavg/1000}}V</div>
  <div class="cell">Vrms {{measurement.Vrms/1000}}V</div>
  <div class="cell">Vpp {{measurement.Vpp/1000}}V</div>
  <div class="cell">Vp {{measurement.Vp/1000}}V</div>
  <div class="cell">Freq {{measurement.Freq.value.toFixed(2)}} {{measurement.Freq.unit}}</div>
  <div class="cell">Cysle {{measurement.Cysle}}</div>
  <div class="cell">TimePlus {{measurement.TimePlus}}</div>
  <div class="cell">TimeMinus {{measurement.TimeMinus}}</div>
  <div class="cell">DutyPlus {{measurement.DutyPlus}}%</div>
  <div class="cell">DutyMinus {{measurement.DutyMinus}}%</div>
</template>

<script>
import {Measurement} from "@/classes/Measurement.js";

export default {
  props: {
    measurement: Measurement
  }
}
</script>

<style scoped>

</style>