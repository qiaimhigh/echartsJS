var ROOT_PATH =
  'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

myChart.showLoading();
$.get(ROOT_PATH + '/data/asset/data/flare.json', function (data) {
  console.log(data);
  myChart.hideLoading();
  myChart.setOption(
    (option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: `系类名称：{a}<br/>标点名称：{b}<br/>数值大小：{c}`
      }, 
      series: [
        {
          name: '树状图',
          type: 'tree',
          data: [data],
          left: '2%',
          right: '2%',
          top: '20%',
          bottom: '8%',
          symbol: 'emptyCircle',
          orient: 'BT',
          expandAndCollapse: true,
          label: {
            position: 'bottom',
            rotate: 90,
            verticalAlign: 'middle',
            align: 'right'
          },
          leaves: {
            label: {
              position: 'top',
              rotate: 90,
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          animationDurationUpdate: 750
        }
      ]
    })
  );
});

option && myChart.setOption(option);