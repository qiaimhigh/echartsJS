function mapEcharts() {
  $(".anchorBL").css("width","400px").css("height","400px")
  var ROOT_PATH =
      'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
  var app = {};

  var chartDom = document.getElementById('main');
  var myChart = echarts.init(chartDom);
  var option;

  $.get(ROOT_PATH + '/data/asset/data/hangzhou-tracks.json', function (data) {
      var points = [].concat.apply(
          [],
          data.map(function (track) {
              return track.map(function (seg) {
                  return seg.coord.concat([1]);
              });
          })
      );
      myChart.setOption(
          (option = {
              animation: false,
              bmap: {
                  center: [120.13066322374, 30.240018034923],
                  zoom: 14,
                  roam: true
              },
              visualMap: {
                  show: false,
                  top: 'top',
                  min: 0,
                  max: 5,
                  seriesIndex: 0,
                  calculable: true,
                  inRange: {
                      color: ['blue', 'blue', 'green', 'yellow', 'red']
                  }
              },
              series: [
                  {
                      type: 'heatmap',
                      coordinateSystem: 'bmap',
                      data: points,
                      pointSize: 5,
                      blurSize: 5
                  }
              ]
          })
      );
      // 添加百度地图插件
      var bmap = myChart.getModel().getComponent('bmap').getBMap();
      bmap.addControl(new BMap.MapTypeControl());
      bmap.enableScrollWheelZoom(true); 
  });

  option && myChart.setOption(option);
}