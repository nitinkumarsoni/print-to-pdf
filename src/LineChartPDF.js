import React from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const chartConfig = {
    options: {
      chart: {
        id: 'line-chart',
        toolbar: {
            show: false
          }
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: 'Crimes',
        data: [],
      },
    ],
  };

const LineChartPDF = () => {
    const [chartData, setChartData] = React.useState(chartConfig);

    const reportDate = () => {
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    const fetchReportData = async () => {
        const response = await axios.get('https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv')
        if(response?.data?.data) {
            const series = [];
            const chartData = [];
            response.data.data.map((element, index) => {
                series.push(element.data_year);
                let sum = 0;
                for (const key in element) {
                    // console.log(key, element[key])
                    if (key !== "data_year") {
                        sum = sum + parseInt(element[key], 10);
                    }
                }
                chartData.push(sum);
            });
            const _chartConfig = {...chartConfig};
            _chartConfig.series = [{
                data: chartData,
                name: 'Crimes',
            }];
            _chartConfig.options.xaxis.categories = series;
            setChartData(_chartConfig);
        }
    }
    
    React.useEffect(() => {
        try{
            fetchReportData()
        } catch(e){
            console.log('Error while fetching report data', e);
        }
    }, []);

  return (
    <div className='reportWrapper'>
        <div className='reportHeader'>
            <h3>RealAssist.ai</h3>
            <strong>123, main stret, Dover, 4667</strong>
        </div>
        <span className='clear'></span>
        <div>
            <h3 className='chart-head'>Crime</h3>
            <div className='h-bar'></div>
        </div>
        <span className='clear'></span>
        <div className='chrtBox'>
            <div className='chrtBox-head'>
            Burglary
            </div>
            <div className='chrtBox-body'>
                <div className='chaer-name'><div class="text">Arrests</div></div>
                <div className='chart-container'>
                <ApexCharts options={chartData.options} series={chartData.series} type="line" height={350} width="580"/>
                </div>
            </div>
        </div>

        <div className='reportFooter'>
            <h3>Report generated on {reportDate()}</h3>
            <strong>123, main stret, Dover, 4667</strong>
        </div>
    </div>
  );
};

export default LineChartPDF;