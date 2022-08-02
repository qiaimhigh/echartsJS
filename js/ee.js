let res;
let data;
let map = new Map();
// let jsonUrl = '../../json/anhui.json'
$.get("https://www.xiyoulvma.xyz/personmanage/province_map", (data) => {
    res = JSON.parse(data);
    console.log(res);
})

let myChart = echarts.init(document.getElementById('main'))
let shanXi = jsonUrl
let mapname = shanXi;
// let mapJson = [
//     {
//         name: '陕西',
//         json: shanXi
//     }
// ]
let num = 0;
//提取自动播放的代码
function timing() {
    // 取消高亮指定的数据图形
    myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: index,
    });
    // 高亮指定的数据图形
    myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: index + 1,
    });
    index++;
    //判断长度是否和城市的长度一样，如果一样重新播放
    if (index > num) {
        index = -1;
    }
}
//加载时的文字提示
myChart.showLoading({ text: '正在加载数据' });  //增加等待提示
//设置开始位置（播放的位置）
let index = -1;
//定时播放
var timer = setInterval(function () {
    //调用定时播放代码
    timing()
}, 1500);
//鼠标移入
myChart.on('mouseover', function (e) {
    //取消定时
    clearInterval(timer);
    //取消高亮
    myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
    });
    //高亮鼠标移入的位置
    myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: e.dataIndex,
    });
});
//鼠标移出
myChart.on('mouseout', function (e) {
    //取消定时
    clearInterval(timer);
    //取消高亮
    myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: e.dataIndex,
    });
    //重新开始定时播放
    timer = setInterval(function () {
        //调用定时播放代码
        timing()
    }, 1500);
});

//点击事件
let i = true;
let indexw = -1;
myChart.on('click', function (e) {
    if (indexw !== e.dataIndex) {
        i = true;
    }
    clearInterval(timer);
    let name = e.name
    if (i && indexw !== e.dataIndex) {
        name = name.slice(0, 2)
        data = res[name]
        circleEvent(data)
        indexw = e.dataIndex;
        i = false;
        return;
    }
    if (!i && indexw === e.dataIndex) {
        circleEvent()
        i = true;
        indexw = -1;
        return;
    }

});




//创建地图
var mapInit = () => {
    //调用中国地图（同步）
    $.getJSON(mapname, function (geoJson) {
        //获取到长度（每个省里有几个市）
        num = geoJson.features.length;
        // console.log(num);
        //调用我们通过json对象注册的地图
        echarts.registerMap('China', geoJson);
        //文件加载的动画
        myChart.hideLoading();
        // 判断是否为祖国地图
        var convertData;
        // 设置小黄点
        var geoCoordMap = {
        };
        //设置每个区域的值
        var data = [
        ];
        //给每个地区赋值
        convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
        //地图开始
        option = {
            //设置背景颜色
            backgroundColor: '#020933',
            geo: {
                map: 'China',//地图为刚刚设置的China
                aspectScale: 0.75, //长宽比
                zoom: 1.1,//当前视角的缩放比例
                roam: false,//是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                itemStyle: {//地图区域的多边形 图形样式
                    normal: {
                        areaColor: '#013C62',//地区颜色
                        shadowColor: '#182f68',//阴影颜色
                        shadowOffsetX: 0,//阴影偏移量
                        shadowOffsetY: 25,//阴影偏移量
                    },
                    emphasis: {
                        areaColor: '#2AB8FF',//地区颜色
                        label: {
                            show: false,//是否在高亮状态下显示标签
                        },
                    },
                },
            },
            series: [//数据系列
                {
                    type: 'map',//地图类型
                    //地图上文字
                    label: {
                        normal: {
                            show: true,//是否显示标签
                            textStyle: {
                                color: '#fff',
                            },
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff',
                            },
                        },
                    },
                    //地图区域的多边形 图形样式
                    itemStyle: {
                        normal: {
                            borderColor: '#2ab8ff',
                            borderWidth: 1.5,
                            areaColor: '#12235c',
                        },
                        emphasis: {
                            areaColor: '#2AB8FF',
                            borderWidth: 0,
                        },
                    },
                    zoom: 1.2,//当前视角的缩放比例
                    //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                    roam: false,
                    map: 'China', //使用中国地图

                },
                {

                    //设置为分散点
                    type: 'scatter',
                    //series坐标系类型
                    coordinateSystem: 'geo',
                    //设置图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    symbol: 'pin',
                    // //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
                    symbolSize: [40, 40],
                    //气泡字体设置
                    label: {
                        normal: {
                            show: true,//是否显示
                            textStyle: {
                                color: '#fff',//字体颜色
                                fontSize: 8,//字体大小
                            },
                            //返回气泡数据
                            formatter(value) {
                                return value.data.value[2]
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#1E90FF', //标志颜色
                        }
                    },
                    //给区域赋值
                    data: convertData(data),
                    showEffectOn: 'render',//配置何时显示特效。可选：'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
                    rippleEffect: {//涟漪特效相关配置。
                        brushType: 'stroke'//波纹的绘制方式，可选 'stroke' 和 'fill'
                    },
                    hoverAnimation: true,//是否开启鼠标 hover 的提示动画效果。
                    zlevel: 1//所属图形的 zlevel 值
                },
            ],
        };
        myChart.setOption(option);
    });
};


//设置初始化时间
setTimeout(function () {
    mapInit();
}, 1000);


function circleEvent(res = { '确诊': 0, '疑似': 40, '密接': 23 }) {
    // let dataList = [];

    let chartDom = document.getElementById('circle');
    let myChart = echarts.init(chartDom);
    let option;
    option = {
        title: {
            text: '风险人群统计',
            // subtext: 'Fake Data',
            left: 'center',
            textStyle:{
                color: 'red',
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle:{
                color: 'white',
                fontSize: 16
            }
        },
        series: [{
            name: '人数',
            type: 'pie',
            radius: '50%',
            label: {
                color: 'inherit',
                fontSize: 16,
                fontWeight: 800
            },
            data: [{
                value: res.确诊,
                name: '确诊'
            },

            {
                value: res.密接,
                name: '密接'
            },
            {
                value: res.疑似,
                name: '疑似病例'
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
        color: ['red', '#f3715c', '#ed1941', '#d71345']
    };
    option && myChart.setOption(option);

}


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
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                type: 'line'
            }],
            title: {
                text: '每日新增病例情况',
                z: 20,
                link: 'http://baidu.com',
                textStyle: {
                    color: 'red'
                }
            },
            color: ['#d71345'],
            tooltip: {
                trigger: 'item',
            }
        };
        option_line && myChart_line.setOption(option_line);
    })
})