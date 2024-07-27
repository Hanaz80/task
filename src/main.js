import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { Chart } from 'chart.js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ("./assets/style/main.scss");
import "bootstrap-icons/font/bootstrap-icons.css";

// Initialize Vue app
const app = createApp(App);

// Make Chart.js and Leaflet available globally
app.config.globalProperties.$Chart = Chart;
app.config.globalProperties.$L = L;

// Mount the app
app.mount('#app');
