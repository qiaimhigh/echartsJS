$(function () {
  console.log(data_list);
  $.get('https://xiyoulvma.xyz/personmanage/untest_statistics', (data, status) => {
   
    let da = JSON.parse(data)
    console.log(da);

    var chartDom = document.getElementById('circle');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '风险人群统计',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [{
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [{
            value: 1048,
            name: '密接'
          },
          {
            value: 735,
            name: '次密接'
          },
          {
            value: 580,
            name: '疑似病例'
          },
          {
            value: 484,
            name: '确诊'
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }],
      color: ['#ef4136', '#f3715c', '#ed1941', '#d71345']
    };

    option && myChart.setOption(option);
  })
})