const data_list = [
    { name: '江苏', value: 192836 },
    { name: '安徽', value: 118491 },
    { name: '湖北', value: 117036 },
    { name: '湖南', value: 110666 },
    { name: '广东', value: 109915 },
    { name: '浙江', value: 69540 }, { name: '福建', value: 45146 },
    { name: '山东', value: 42753 }, { name: '河南', value: 31141 },
    { name: '四川', value: 30287 }, { name: '河北', value: 29890 },
    {id:1, name: '江西', value: 23649 }, { name: '黑龙江', value: 20475 },
    { name: '陕西', value: 17942 }, { name: '贵州', value: 16019 },
    { name: '吉林', value: 15441 }, { name: '广西', value: 11875 },
    { name: '山西', value: 11077 }, { name: '云南', value: 9238 },
    { name: '辽宁', value: 6538 }, { name: '甘肃', value: 6128 },
    { name: '重庆', value: 5883 }, { name: '内蒙古', value: 5605 },
    { name: '海南', value: 4596 }, { name: '天津', value: 4244 },
    { name: '新疆', value: 4125 }, { name: '上海', value: 3429 },
    { name: '宁夏', value: 3225 }, { name: '青海', value: 1833 },
    { name: '北京', value: 1765 },{name:'西藏',value:1000}]
const data_value_list = [192836, 118491, 117036, 110666, 109915, 69540, 45146, 42753, 31141, 30287, 29890, 23649, 20475, 17942, 16019, 15441, 11875, 11077, 9238, 6538, 6128, 5883, 5605, 4596, 4244, 4125, 3429, 3225, 1833, 1765, 0,]
// const data_value_list = [1000,900,800,700,600,500,400,300,200,100];
const option = {
    title: {
        text: '全国疫情分布展示',
        // subtext: '数据源：前程无忧',
        x: 'center',
        textStyle:{
            color: 'white',
            
        }
    },
    tooltip: { // 悬浮显示框
        trigger: 'item',
        formatter: '名称：{a}<br/>省份：{b}<br/>数值：{c}',
    },
    dataRange: {
        min: 0,
        max: Math.max.apply(null, data_value_list),
        x: 'left',
        y: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true,
        //inRange: {
        //    color: ['#FFFFFF','#0000FF'],
        //    symbolSize: [10, 100]
        //}
    },
    series: [
        {
            name: '数据', // 名称，可以自行设置
            type: 'map', // 固定值
            mapType: 'china', // 固定值
            roam: false, 
            itemStyle: { // 鼠标悬浮效果
                normal: { label: { show: true } },
                emphasis: { label: { show: true } }
            },
            data: data_list
        }
    ]
};
ec_map = echarts.init(document.getElementById('main'));
function randomData() {
    return Math.round(Math.random() * 500);
};
ec_map.on('click', function (params) {
    console.log(params);
        window.location.href = `../html/new/echarts.html?name=${encodeURIComponent(params.name)}`
});
ec_map.setOption(option)