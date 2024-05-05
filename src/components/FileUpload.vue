<template>
  <input class="patientPorting"
         type="file"
         accept=".wav"
         @change="handleFile( $event )"/>
  <div>
    <chart-component v-if="parsedData" :ParseData="parsedData"/>
  </div>
</template>

<script>
import ChartComponent from './chart-component.vue';
import axios from 'axios';
import {WavFile} from "@/classes/WavFile.js";

export default {
  components: {
    ChartComponent
  },
  data() {
    return {
      parsedData: null,
    }
  },
  mounted() {
    this.loadFileUrl('https://igor-kor.github.io/Fnirsi-Wav-Viewer/test.wav');
  },
  methods: {
    loadFileUrl(fileUrl) {
      axios.get(fileUrl, {responseType: 'blob'})
          .then(response => {
            const file = new File([response.data], fileUrl.split('/').pop()); // Создаем объект File с полученными данными и именем файла из URL
            this.handleFile({target: {files: [file]}});
          })
          .catch(error => {
            console.error('Error loading file:', error);
          });
    },
    handleFile(event) {
      const file = event.target.files[0];
      const wavFile = new WavFile();
      wavFile.readFile(file)
          .then((parsedData => {
            this.parsedData = parsedData
          }))
          .catch(error => {
            console.error(error);
          });
    },
  }
}
</script>

<style scoped>

</style>