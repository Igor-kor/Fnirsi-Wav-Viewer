

<template>
  <input class="patientPorting"
         type="file"
         @change="handleFile( $event )"/>
  <div>
    <chart-component v-if="text" :ParseData="text"  />
  </div>
  <p>{{ text }}</p>

<!--  <p>{{ headerData }}</p>-->
<!--  <p>{{ CH1data1 }}</p>-->
<!--  <p>{{ CH2data1 }}</p>-->
<!--  <p>{{ CH1data2 }}</p>-->
<!--  <p>{{ CH2data2 }}</p>-->
<!--  <div>{{ jsonObj }}</div>-->
</template>

<script>
import ChartComponent from './chart-component.vue';
import axios from 'axios';
export default {
  components: {
    ChartComponent
  },
  data() {
    return {
      text: null,
      // header: null,
      // CH1Data1: null,
      // CH2Data1: null,
      // CH1Data2: null,
      // CH2Data2: null,
    }
  },
  mounted() {
    this.loadFileUrl('https://github.com/Igor-kor/fnirsi-wav-explorer/raw/main/test.wav');
  },
  methods: {
    // loadFile(fileName) {
    //   // создаем объект File для имитации события change
    //   const file = new File([], fileName);
    //   // вызываем метод handleFile с имитированным событием
    //   this.handleFile({ target: { files: [file] } });
    // },
    loadFileUrl(fileUrl) {
      axios.get(fileUrl, { responseType: 'stream' })
          .then(response => {
            const file = new File([response.data], fileUrl.split('/').pop()); // Создаем объект File с полученными данными и именем файла из URL
            this.handleFile({ target: { files: [file] } });
          })
          .catch(error => {
            console.error('Error loading file:', error);
          });
    },
    handleFile(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const binaryData = new Uint8Array(reader.result);
        this.parseBinaryFile(binaryData);
      };

      reader.readAsArrayBuffer(file);
    },

    parseBinaryFile(data) {
      const view = new DataView(data.buffer);
      const parsedData = {
        // Реализация вашего алгоритма парсинга
        // Например:
        header: this.parseHeader(view),
        CH1Data1: this.parseChannelData(view, 1000, 3999),
        CH2Data1: this.parseChannelData(view, 4000, 6999),
        CH1Data2: this.parseChannelData(view, 7000, 8499),
        CH2Data2: this.parseChannelData(view, 8500, 9999),
        OverData: this.parseChannelData(view, 10000, 14999)

      };
      this.text = parsedData;
    },
    parseHeader(view) {
      const headerData = {};

      // CH1 vertical scale
      const ch1VerticalScale = view.getInt8(4);
      headerData.CH1VerticalScale = this.parseVerticalScale(ch1VerticalScale);

      // CH2 vertical scale
      const ch2VerticalScale = view.getInt8(14);
      headerData.CH2VerticalScale = this.parseVerticalScale(ch2VerticalScale);

      // CH1 coupling
      const ch1Coupling = view.getInt8(8);
      headerData.CH1Coupling = this.parseCoupling(ch1Coupling);

      // CH2 coupling
      const ch2Coupling = view.getInt8(18);
      headerData.CH2Coupling = this.parseCoupling(ch2Coupling);

      // CH1 probe
      const ch1Probe = view.getInt8(10);
      headerData.CH1Probe = this.parseProbe(ch1Probe);

      // CH2 probe
      const ch2Probe = view.getInt8(20);
      headerData.CH2Probe = this.parseProbe(ch2Probe);

      // Time scale
      const timeScale = view.getInt8(22);
      headerData.TimeScale = this.parseTimeScale(timeScale);

      // Trigger type
      const triggerType = view.getInt8(26);
      headerData.TriggerType = this.parseTriggerType(triggerType);

      // Trigger edge
      const triggerEdge = view.getInt8(28);
      headerData.TriggerEdge = this.parseTriggerEdge(triggerEdge);

      // Screen Brightness
      headerData.ScreenBrightness = view.getInt8(120);

      // Grid Brightness
      headerData.GridBrightness = view.getInt8(122);

      // Scroll speed
      headerData.ScrollSpeed = this.parseScrollSpeed(view.getInt8(24));

      return headerData;
    },
    parseVerticalScale(value) {
      const scales = [5.0, 2.5, 1.0, 0.5, 0.2, 0.1, 0.05];
      return scales[value] || "Unknown";
    },
    parseCoupling(value) {
      return value === 0 ? "DC" : "AC";
    },
    parseProbe(value) {
      const probes = ["x1", "x10", "x100"];
      return probes[value] || "Unknown";
    },
    parseTimeScale(value) {
      const scales = [
        "50S", "20S", "10S", "5S", "2S", "1S", "500mS", "200mS",
        "100mS", "50mS", "20mS", "10mS", "5mS", "2mS", "1mS",
        "500uS", "200uS", "100uS", "50uS", "20uS", "10uS", "5uS",
        "2uS", "1uS", "500nS", "200nS", "100nS", "50nS", "20nS", "10nS"
      ];
      return scales[value] || "Unknown";
    },
    parseTriggerType(value) {
      const types = ["Auto", "Single", "Normal"];
      return types[value] || "Unknown";
    },
    parseTriggerEdge(value) {
      return value === 0 ? "RISING" : "FALLING";
    },
    parseScrollSpeed(value) {
      return value === 0 ? "Fast" : "Slow";
    },
    parseChannelData(view, start, end) {
      const channelData = [];
      for (let i = start; i <= end; i += 4) {
        // Предположим, что данные для каждого канала - это 32-битные целые числа (Int32)
        const value = view.getInt8(i);
        channelData.push(value);
      }
      return channelData;
    }
  }
}
</script>

<style scoped>

</style>