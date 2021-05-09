import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';
import { BASE_URL } from 'utils/requests';

type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[];
    }
    series: SeriesData[];
}

function BarChart() {

    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`).then(response => {
            // Fazendo um cast para dizer que este data é do tipo saleSum
            // E controlar para esse componente ser chamado apenas uma vez e não várias vezes
            const data = response.data as SaleSuccess[];
            const mylabels = data.map(x => x.sellerName);
            const myseries = data.map(x => round(100.0 * x.deals / x.visited, 1));

            setChartData({
                labels: {
                    categories: mylabels
                },
                series: [
                    {
                        name: "% Sucesso",
                        data: myseries
                    }
                ]
            });

            // .data porque é corpo da resposta
            // console.log(chartData);
        })
        // Lista de objetos que useEffect vai observar, qdo mudar valores o useEffect vai mudar
    }, []);

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    return (
        <Chart
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type="bar"
            height="240"
        />
    );
}

export default BarChart;