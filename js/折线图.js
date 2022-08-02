let dataList = [];
let timeList = [];
$(function () {
  $.get('https://xiyoulvma.xyz/personmanage/suspected_statistics', (data, status) => {
    console.log(JSON.parse(data));
    let da = JSON.parse(data);
    console.log(da.before);
    let daa = da.before;
    for (let item in daa) {
      console.log(item);
    }
    Object.keys(daa).forEach(x => {
      dataList.push(x);
      timeList.push(daa[x])
    })
    console.log(dataList);
    console.log(timeList);
    var chartDom_line = document.getElementById('main_line');
    var myChart_line = echarts.init(chartDom_line);
    var option_line;

    option_line = {
      xAxis: {
        type: 'category',
        data: dataList
      },
      yAxis: {
        type: 'value',
        interval: 50 //设置y轴之间的跨度
      },
      series: [{
        data: timeList,
        type: 'line',
        smooth: true
      }],
      title: {
        text: '每日病例新增病例情况',
        z: 20,
        link: 'http://baidu.com',
        textStyle:{
          color: 'rgb(204,204,204)'
        }
      },
      color: ['#d71345'],
      tooltip:{
        trigger:'item',
      }
    };
    option && myChart_line.setOption(option_line);
  })
})