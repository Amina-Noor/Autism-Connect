import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';

// Register elements and scales
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement);
