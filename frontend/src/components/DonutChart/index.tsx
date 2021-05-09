import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

type ChartData = {
    labels: string[];
    series: number[];
}

function DonutChart() {

    // Nome da variável, nome da função setState
    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`).then(response => {
            // Fazendo um cast para dizer que este data é do tipo saleSum
            // E controlar para esse componente ser chamado apenas uma vez e não várias vezes
            const data = response.data as SaleSum[];
            const mylabels = data.map(x => x.sellerName);
            const myseries = data.map(x => x.sum);

            setChartData({ labels: mylabels, series: myseries });

            // .data porque é corpo da resposta
            // console.log(chartData);
        })
        // Lista de objetos que useEffect vai observar, qdo mudar valores o useEffect vai mudar
    }, []);

    //const mockData = {
    //    series: [477138, 499928, 444867, 220426, 473088],
    //    labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    //}

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );

}

export default DonutChart;