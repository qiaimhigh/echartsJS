var chartDom_pi = document.getElementById('pi');
var myChart_pi = echarts.init(chartDom_pi);
var option_pi;

option_pi = {

  backgroundColor: '',
  title: {
    text: '今日疑似病例',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#ccc'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  visualMap: {
    show: false,
    // 设置最小最大的值
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  series: [
    {
      name: '疑似原因和人数',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
          // 设置数据
        { value: 301, name: ' 发烧' },
        { value: 310, name: '咳嗽' },
        { value: 274, name: '胸痛' },
        { value: 235, name: '乏力' },
        { value: 400, name: '喉咙痛鼻塞' }
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      label: {
        color: 'inherit',
        fontSize: 16,
        fontWeight: 800
      },
      labelLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        smooth: 0.2,
        length: 10,
        length2: 20
      },
      itemStyle: {
        color: '#c23531',
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
};

option && myChart_pi.setOption(option_pi);
