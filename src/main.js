import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
// import { registerSW } from 'virtual:pwa-register'
//
// const updateSW = registerSW({
//     onOfflineReady() {},
// })
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('/sw.js').then(function(registration) {
//             console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         }, function(err) {
//             console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }
createApp(App).mount('#app')
