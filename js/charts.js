// 省份柱状图
var barcity = document.getElementById("barcity");
var citychart = echarts.init(barcity);
let dataAxis = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆'];
let data = [2134.4070,1354.5797,7243.9512,3392.8649,2346.4323,4181.5183,2366.2578,3141.0630,2441.6307,8275.6266,6297.2305,5906.9275,4021.4295,4374.2550,9826.0916,9611.8610,5613.0945,6448.8195,12162.3816,4820.3362,972.9218,3122.4389,8148.3925,3683.9875,4548.6128,347.7047,3829.4926,2412.9001,570.3979,692.7596,2523.6430];
// 将省份和人口数据组合成对象数组并按人口数量排序
let combinedData = dataAxis.map((province, index) => {
    return {
        province: province,
        population: data[index]
    };
});
// 按人口数量从高到低排序
combinedData.sort((a, b) => b.population - a.population);
// 提取排序后的省份和人口数据
let sortedDataAxis = combinedData.map(item => item.province);
let sortedData = combinedData.map(item => item.population);
let yMax =12000;
let dataShadow = [];
for (let i = 0; i < data.length; i++) {
  dataShadow.push(yMax);
}
option = {
  title: {
    text: '第七次人口普查各省人口数量（单位：万人）',
    left:'center',
    margin:20,
    top:'10px',
    textStyle:{
        color:'#fff',
        fontSize:16,
        fontWeight:'normal'
    }
  },
  grid:{
    left:'10%',
    right:'5%',
    bottom:'15%',
    top:'20%',
    containLabel:true
  },
  xAxis: {
    data: sortedDataAxis,
    axisLabel: {
      inside: true,
      color: '#fff'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  },
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  tooltip:{
    trigger:'axis',
    axisPointer:{
        type:'shadow'
    },
    formatter:function(params){
        let province=params[0].name;
        let value=params[0].value;
        return province+':'+value.toLocaleString()+'万'
    }
  },
  series: [
    {
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: function(params) {
                let colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];
                return colors[params.dataIndex % colors.length];
            }
      },
      emphasis: {
        itemStyle: {
          color: function(params) {
                    let colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];
                    return colors[params.dataIndex % colors.length];
                }
        }
      },
      data: sortedData
    }
  ]
};

const zoomSize = 6;
citychart.on('click', function (params) {
  console.log(sortedDataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
  citychart.dispatchAction({
    type: 'dataZoom',
    startValue: sortedDataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
    endValue:
      sortedDataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
  });
  var provinceName=params.name;
  updatePieChart(provinceName);
});
citychart.setOption(option)

// 各省饼状图
// var  provincepie=document.getElementById("provincepie");
// var piechart=echarts.init(provincepie);
var pieChartContainer = document.getElementById("pieChart");
var piechart = echarts.init(pieChartContainer);
var provincedata={
  '北京': [
        { name: '未上过学', value: 1.41 },
        { name: '学前教育', value: 2.83 },
        { name: '小学', value: 10.77},
        { name: '初中', value: 23.89},
        { name: '高中', value: 18.05},
        { name: '大专', value: 13.72 },
        { name: '本科', value: 22.36 },
        { name: '硕士研究生', value: 5.92 },
        { name: '博士研究生', value: 1.07},
    ],
  '天津': [
        { name: '未上过学', value: 1.81 },
        { name: '学前教育', value: 2.91 },
        { name: '小学', value: 16.50},
        { name: '初中', value: 33.06},
        { name: '高中', value: 18.14},
        { name: '大专', value: 11.24 },
        { name: '本科', value: 14.39 },
        { name: '硕士研究生', value: 1.72 },
        { name: '博士研究生', value: 0.22},
    ],
  '河北': [
        { name: '未上过学', value: 2.19 },
        { name: '学前教育', value: 4.19 },
        { name: '小学', value: 25.40},
        { name: '初中', value: 41.15},
        { name: '高中', value: 14.28},
        { name: '大专', value: 7.28 },
        { name: '本科', value: 5.12 },
        { name: '硕士研究生', value: 0.36 },
        { name: '博士研究生', value: 0.03},
    ],
  '山西': [
        { name: '未上过学', value: 1.65 },
        { name: '学前教育', value: 3.37 },
        { name: '小学', value: 20.07},
        { name: '初中', value: 40.08},
        { name: '高中', value: 16.96},
        { name: '大专', value: 9.62 },
        { name: '本科', value: 7.57 },
        { name: '硕士研究生', value: 0.61 },
        { name: '博士研究生', value: 0.06},
    ],
  '内蒙古': [
        { name: '未上过学', value: 3.84 },
        { name: '学前教育', value: 2.90 },
        { name: '小学', value: 24.22},
        { name: '初中', value: 34.70},
        { name: '高中', value: 15.18},
        { name: '大专', value: 10.22 },
        { name: '本科', value: 8.28 },
        { name: '硕士研究生', value: 0.6 },
        { name: '博士研究生', value: 0.05},
    ],
  '江苏': [
        { name: '未上过学', value: 3.39 },
        { name: '学前教育', value: 3.52 },
        { name: '小学', value: 23.29},
        { name: '初中', value: 34.11},
        { name: '高中', value: 16.58},
        { name: '大专', value: 9.89 },
        { name: '本科', value: 8.22},
        { name: '硕士研究生', value: 0.88 },
        { name: '博士研究生', value: 0.12},
    ],
  '辽宁': [
        { name: '未上过学', value: 1.52 },
        { name: '学前教育', value: 2.15 },
        { name: '小学', value: 19.24},
        { name: '初中', value: 43.59},
        { name: '高中', value: 14.94},
        { name: '大专', value: 9.02 },
        { name: '本科', value: 8.69 },
        { name: '硕士研究生', value: 0.77 },
        { name: '博士研究生', value: 0.08},
    ],
  '吉林': [
        { name: '未上过学', value: 1.91 },
        { name: '学前教育', value: 2.08 },
        { name: '小学', value: 22.71},
        { name: '初中', value: 38.90},
        { name: '高中', value: 17.38},
        { name: '大专', value: 7.66 },
        { name: '本科', value: 8.56 },
        { name: '硕士研究生', value:0.70},
        { name: '博士研究生', value: 0.10},
    ],
  '黑龙江': [
        { name: '未上过学', value: 1.93 },
        { name: '学前教育', value: 1.77 },
        { name: '小学', value: 22.17},
        { name: '初中', value: 43.39},
        { name: '高中', value: 15.74},
        { name: '大专', value: 7.43 },
        { name: '本科', value: 6.98 },
        { name: '硕士研究生', value: 0.50 },
        { name: '博士研究生', value: 0.08},
    ],
  '上海': [
        { name: '未上过学', value: 2.05 },
        { name: '学前教育', value: 2.45 },
        { name: '小学', value: 12.15},
        { name: '初中', value: 29.47},
        { name: '高中', value: 19.37},
        { name: '大专', value: 12.58 },
        { name: '本科', value: 17.53 },
        { name: '硕士研究生', value: 3.84 },
        { name: '博士研究生', value: 0.55},
    ], 
  '浙江': [
        { name: '未上过学', value: 3.92 },
        { name: '学前教育', value: 3.15 },
        { name: '小学', value: 27.05},
        { name: '初中', value: 33.53},
        { name: '高中', value: 14.92},
        { name: '大专', value: 8.69 },
        { name: '本科', value: 7.86 },
        { name: '硕士研究生', value: 0.77 },
        { name: '博士研究生', value: 0.10},
    ], 
  '安徽': [
        { name: '未上过学', value: 5.80 },
        { name: '学前教育', value: 4.13 },
        { name: '小学', value: 27.77},
        { name: '初中', value: 34.84},
        { name: '高中', value: 13.74},
        { name: '大专', value: 7.47 },
        { name: '本科', value: 5.67 },
        { name: '硕士研究生', value: 0.52 },
        { name: '博士研究生', value: 0.06},
    ], 
  '福建': [
        { name: '未上过学', value: 3.79},
        { name: '学前教育', value: 4.68 },
        { name: '小学', value: 28.95},
        { name: '初中', value:33.28},
        { name: '高中', value: 14.68},
        { name: '大专', value: 7.21 },
        { name: '本科', value: 6.85 },
        { name: '硕士研究生', value: 0.49 },
        { name: '博士研究生', value: 0.07},
    ], 
  '江西': [
        { name: '未上过学', value: 2.70 },
        { name: '学前教育', value: 4.27 },
        { name: '小学', value: 28.42},
        { name: '初中', value: 36.67},
        { name: '高中', value: 15.65},
        { name: '大专', value: 6.95 },
        { name: '本科', value: 4.96 },
        { name: '硕士研究生', value: 0.35 },
        { name: '博士研究生', value: 0.04},
    ], 
  '山东': [
        { name: '未上过学', value: 4.44 },
        { name: '学前教育', value: 4.44 },
        { name: '小学', value: 24.48},
        { name: '初中', value: 36.97},
        { name: '高中', value: 14.81},
        { name: '大专', value: 7.99 },
        { name: '本科', value: 6.19 },
        { name: '硕士研究生', value: 0.61 },
        { name: '博士研究生', value: 0.07},
    ], 
  '河南': [
        { name: '未上过学', value: 3.18 },
        { name: '学前教育', value: 4.75},
        { name: '小学', value: 25.39},
        { name: '初中', value: 38.79},
        { name: '高中', value: 15.75},
        { name: '大专', value: 7.08 },
        { name: '本科', value: 4.68 },
        { name: '硕士研究生', value:0.34 },
        { name: '博士研究生', value: 0.04},
    ], 
  '湖北': [
        { name: '未上过学', value: 3.08 },
        { name: '学前教育', value: 3.57 },
        { name: '小学', value: 24.20},
        { name: '初中', value: 35.27},
        { name: '高中', value: 17.93},
        { name: '大专', value: 8.37 },
        { name: '本科', value: 6.73 },
        { name: '硕士研究生', value: 0.74 },
        { name: '博士研究生', value: 0.12},
    ], 
  '湖南': [
        { name: '未上过学', value: 2.46 },
        { name: '学前教育', value: 3.92 },
        { name: '小学', value: 25.98},
        { name: '初中', value: 36.72},
        { name: '高中', value: 18.31},
        { name: '大专', value: 7.32 },
        { name: '本科', value: 4.87 },
        { name: '硕士研究生', value: 0.37 },
        { name: '博士研究生', value: 0.05},
    ], 
  '广东': [
        { name: '未上过学', value: 2.39 },
        { name: '学前教育', value: 4.28 },
        { name: '小学', value: 21.42},
        { name: '初中', value: 36.76},
        { name: '高中', value: 18.88},
        { name: '大专', value: 8.90 },
        { name: '本科', value: 6.64 },
        { name: '硕士研究生', value: 0.65 },
        { name: '博士研究生', value: 0.08},
    ], 
  '广西': [
        { name: '未上过学', value: 3.17 },
        { name: '学前教育', value: 5.31 },
        { name: '小学', value: 28.97},
        { name: '初中', value: 37.84},
        { name: '高中', value: 13.48},
        { name: '大专', value: 6.30 },
        { name: '本科', value: 4.64 },
        { name: '硕士研究生', value: 0.27 },
        { name: '博士研究生', value: 0.03},
    ], 
  '海南': [
        { name: '未上过学', value: 3.13 },
        { name: '学前教育', value: 4.29 },
        { name: '小学', value: 20.41},
        { name: '初中', value: 41.63},
        { name: '高中', value: 16.12},
        { name: '大专', value: 7.57 },
        { name: '本科', value: 6.43 },
        { name: '硕士研究生', value:0.38 },
        { name: '博士研究生', value: 0.05},
    ], 
  '重庆': [
        { name: '未上过学', value: 2.25 },
        { name: '学前教育', value: 3.46 },
        { name: '小学', value: 30.69},
        { name: '初中', value: 31.39},
        { name: '高中', value: 16.38},
        { name: '大专', value: 8.37 },
        { name: '本科', value: 6.79 },
        { name: '硕士研究生', value: 0.58 },
        { name: '博士研究生', value: 0.07},
    ], 
  '贵州': [
        { name: '未上过学', value: 8.01 },
        { name: '学前教育', value: 4.81 },
        { name: '小学', value: 33.41},
        { name: '初中', value: 31.89},
        { name: '高中', value: 10.42},
        { name: '大专', value: 5.84 },
        { name: '本科', value: 5.37 },
        { name: '硕士研究生', value: 0.23 },
        { name: '博士研究生', value: 0.02},
    ], 
  '云南': [
        { name: '未上过学', value: 5.82 },
        { name: '学前教育', value: 4.05 },
        { name: '小学', value: 37.02},
        { name: '初中', value: 30.35},
        { name: '高中', value: 10.73},
        { name: '大专', value: 6.32 },
        { name: '本科', value: 5.37 },
        { name: '硕士研究生', value: 0.31 },
        { name: '博士研究生', value: 0.04},
    ], 
  '四川': [
        { name: '未上过学', value: 4.69 },
        { name: '学前教育', value: 3.58 },
        { name: '小学', value: 32.16},
        { name: '初中', value: 32.29},
        { name: '高中', value: 13.66},
        { name: '大专', value: 7.42 },
        { name: '本科', value: 5.62 },
        { name: '硕士研究生', value: 0.52 },
        { name: '博士研究生', value: 0.07},
    ], 
  '西藏': [
        { name: '未上过学', value: 25.91 },
        { name: '学前教育', value: 4.91 },
        { name: '小学', value: 33.69},
        { name: '初中', value: 16.53},
        { name: '高中', value: 7.40},
        { name: '大专', value: 5.44 },
        { name: '本科', value: 5.89 },
        { name: '硕士研究生', value: 0.22 },
        { name: '博士研究生', value: 0.02},
    ], 
  '陕西': [
        { name: '未上过学', value: 3.55 },
        { name: '学前教育', value: 3.92 },
        { name: '小学', value: 22.38},
        { name: '初中', value: 35.07},
        { name: '高中', value: 16.08},
        { name: '大专', value: 9.94 },
        { name: '本科', value: 8.06 },
        { name: '硕士研究生', value: 0.85 },
        { name: '博士研究生', value: 0.14},
    ], 
  '甘肃': [
        { name: '未上过学', value: 8.02 },
        { name: '学前教育', value: 4.17 },
        { name: '小学', value: 30.91},
        { name: '初中', value: 28.44},
        { name: '高中', value: 13.42},
        { name: '大专', value: 8.00 },
        { name: '本科', value: 6.54 },
        { name: '硕士研究生', value: 0.44 },
        { name: '博士研究生', value: 0.06},
    ], 
  '青海': [
        { name: '未上过学', value: 10.15 },
        { name: '学前教育', value: 4.15 },
        { name: '小学', value: 33.99},
        { name: '初中', value: 25.28},
        { name: '高中', value: 10.98},
        { name: '大专', value: 8.11 },
        { name: '本科', value: 6.98 },
        { name: '硕士研究生', value: 0.33 },
        { name: '博士研究生', value: 0.03},
    ], 
  '宁夏': [
        { name: '未上过学', value: 6.10 },
        { name: '学前教育', value: 3.86 },
        { name: '小学', value: 27.15},
        { name: '初中', value: 30.90},
        { name: '高中', value: 13.96},
        { name: '大专', value: 9.32 },
        { name: '本科', value: 8.16 },
        { name: '硕士研究生', value: 0.51 },
        { name: '博士研究生', value: 0.05},
    ], 
  '新疆': [
        { name: '未上过学', value: 2.46 },
        { name: '学前教育', value: 5.65 },
        { name: '小学', value: 29.10},
        { name: '初中', value: 32.33},
        { name: '高中', value: 13.53},
        { name: '大专', value: 10.03 },
        { name: '本科', value: 6.57},
        { name: '硕士研究生', value: 0.31 },
        { name: '博士研究生', value: 0.03},
    ]
};
var defaultProvince='北京';
updatePieChart(defaultProvince);
function updatePieChart(provinceName){
  var data=provincedata[provinceName] || provincedata['北京'];
  var pieOption={
    title:{
      text:provinceName+'受教育化程度比重',
      left:'center',
      top:'1%',
      textStyle:{
        color:'#fff',
        fontSize:14
      }
    },
    tooltip:{
      trigger:'item',
      formatter:'{a} <br/>{b}: {c}%'
    },
    legend:{
      orient: 'vertical',
      right: 10,
      top: '15%',
      bottom:'15%',
      itemGap:8,
      textStyle: {
        color: '#fff',
        fontSize: 10
      },
      data: [
        '未上过学', '学前教育', '小学', '初中', '高中',
        '大专', '本科', '硕士研究生', '博士研究生'
      ]
    },
    grid:{
      top:0,
      bottom:50,
      left:0,
      right:'35%'
    },
    series:[
      {
        name:'受教育程度比重',
        type:'pie',
        radius:['50%','80%'],
        center:['35%','50%'],
        avoidLabelOverlap:false,
        label:{
          show:false,
          position:'center'
        },
        emphasis:{
          label:{
            show:true,
            fontSize:'14',
            fontWeight:'bold'
          }
        },
        labelLine:{
          show:false
        },
        data:data,
        itemStyle:{
          color:function(params){
            var colorList=['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de','#8012dfff','#09f9f1ff','#fffb01ff','#fb0707ff'];
            return colorList[params.dataIndex];
          }
        }
      }
    ]
  };
  piechart.setOption(pieOption)
}

// 地图
var map=document.getElementById("map");
var mapcharts=echarts.init(map);
window.addEventListener('resize', function() {
    mapcharts.resize();
});
var mapoption = {
  tooltip: {  // 在这里添加tooltip配置
    trigger: 'item',
    formatter: function(params) {
      return `${params.name}<br/>人口数量: ${params.value.toLocaleString()}万人`;
    },
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    textStyle: {
      color: '#fff'
    }
  },
  series: [
    {
      type:'map',
      map:"china",
      roam:true,
      center:[104, 37.71],
      aspectScale:0.9,
      boundingCoords:null,
      zoom:1.5,
      scaleLimit:{
         min:1,
        max:2.5
                },
      nameMap:{
        china:"中国"
                },
      top:'5%',
      bottom:'5%',
      left:'5%',
      right:'5%',
      layoutCenter: ['50%', '50%'],  // 地图中心点位置
      layoutSize: '95%', 
      itemStyle:{
      areaColor: {
        type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {offset: 0, color: '#83bff6'},   // 顶部颜色
            {offset: 0.5, color: '#188df0'}, // 中间颜色
            {offset: 1, color: '#188df0'}    // 底部颜色
                        ]
                    },
            borderColor: '#fff',     // 区域边框颜色
            borderWidth: 1,          // 区域边框宽度
            shadowColor: 'rgba(0, 0, 0, 0.5)', // 阴影颜色
            shadowBlur: 10           // 阴影模糊度
                },
    color:"red",
      emphasis:{
          itemStyle:{
              areaColor: '#fe994e',  // 高亮时的区域颜色
              borderColor: '#fff',   // 高亮时的边框颜色
              borderWidth: 2,        // 高亮时的边框宽度
              shadowBlur: 20         // 高亮时的阴影模糊度
                    }
                },
        select:{
           itemStyle:{
              areaColor:'#f4e925',
              borderColor:'#333',
              borderWidth:2
                    }
                },
          data:dataAxis.map((province,index)=>{
            return{
              name:province,
              value:data[index]
            };
          })
            }
        ],
        visualMap: {
            type: 'continuous',  // 连续型
            min: 0,              // 最小值
            max: 13000,             // 最大值
            text: ['高', '低'],   // 文本
            realtime: false,     // 是否实时更新
            calculable: true,    // 是否显示拖拽用的手柄
            textStyle:{
              color:'#fff'
            },
            inRange: {
                color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'] // 蓝紫色渐变
            }
        }
    };
mapcharts.setOption(mapoption);
mapcharts.resize()

const awlElement=document.querySelector('.awl');
let mouseTiment=null;
// 显示awl
function showAwl(x,y,provinceName){
  clearTimeout(hideTimeout);
  awlElement.style.left=(x-50)+'px';
  awlElement.style.top=(y-50)+'px';
  awlElement.style.display='block';
  if(provinceName){
    updatePieChart(provinceName);
  }
}
// 隐藏awl
function hideAwl(){
  hideTimeout=setTimeout(()=>{
    awlElement.style.display='none';
  },150);
}
// 地图鼠标事件
mapcharts.on('mouseover',function(params){
  if(params.componentType==='series' && params.seriesType==='map'){
    const event=params.event.event;
    const x=event.clientX+window.pageXOffset;
    const y=event.clientY+window.pageYOffset;
    showAwl(x,y,params.name);
  }
});
mapcharts.on('mouseout',function(params){
  if(params.componentType==='series'&&params.seriesType==='map'){
    hideAwl();
  }
});
// 全局鼠标移动追踪
document.addEventListener('mousemove',function(event){
  if(awlElement.style.display==='block'){
    const x = event.clientX + window.pageXOffset;
    const y = event.clientY + window.pageYOffset;
    awlElement.style.left = (x-50) + 'px';
    awlElement.style.top = (y-50) + 'px';
  }
});
// 地图容器事件
const mapContainer = document.getElementById('map');
mapContainer.addEventListener('mouseenter', function() {
    clearTimeout(hideTimeout);
});
mapContainer.addEventListener('mouseleave', function() {
    hideAwl();
});

// 折线图
var line=document.getElementById("line");
var linechart=echarts.init(line)
var lineoption = {
  title: {
    text: '第六次普查和第七次普查(单位：万人)',
    left:'center',
    top:'0px',
    textStyle:{
      color:'#fff'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['第六次', '第七次'],
    top:'8%',
    textStyle:{
      color:'#fff'
    }
  },
  grid: {
    top:'15%',
    left: '5%',
    right: '5%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['未上过学', '小学', '初中', '高中', '专科', '本科', '研究生'],
    axisLabel:{
      rotate:45,
      interval:0,
      color:'#fff'
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '第六次',
      type: 'line',
      stack: 'Total',
      data: [6213.6405,35721.1733,51817.6222,18664.6865,6861.0519,4562.5793,413.8585],
      Symbol:'circle',
      SymbolSize:6,
      lineStyle:{
        width:2
      },
      emphasis:{
        focus:'Series',
        lineStyle:{
          width:4,
          shadowBlur:15,
          shadowColor:'rgba(6, 0, 124, 0.8)'
        },
        itemStyle: {
        borderWidth: 2,        // 数据点边框
        borderColor: '#fff',
        shadowBlur: 10,
        shadowColor: 'rgba(20, 20, 236, 0.96)'
      }
      }
    },
    {
      name: '第七次',
      type: 'line',
      stack: 'Total',
      data: [4859.5937,34965.8733,48709.5010,21220.9922,11230.3002,9415.6072,1076.5577],
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
      width: 2
      },
      emphasis: {
      focus: 'series',
      lineStyle: {
        width: 4,
        shadowBlur: 15,
        shadowColor: 'rgba(0, 203, 14, 0.8)'
      },itemStyle: {
        borderWidth: 2,
        borderColor: '#fff',
        shadowBlur: 10,
        shadowColor: 'rgba(2, 246, 30, 0.96)'
      }
    }
    }
  ]
};
linechart.setOption(lineoption);

// 男女图表
var gender=document.getElementById('gender');
var gendercharts=echarts.init(gender);
var genderoption = {
  title:{
    text:'各教育阶段性别分布对比（单位：万人）',
    left:'center',
    top:'10',
    textStyle:{
      color:'#fff',
      fontSize:16,
      fontWeight:'normal'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (params) {
      let result = params[0].name + '<br/>';
      params.forEach(function (item) {
        // let value = Math.abs(item.value);
        result += item.marker + item.seriesName + ': ' +Math.abs(item.value).toLocaleString() + ' 万人<br/>';
      });
      return result;
    }
  },
  legend: {
    top:'auto',
    bottom:10,
    left:'center',
    orient:'horizontal',
    textStyle:{
      color:'#fff',
      fontSize:12
    },
    data: [ '女生', '男生']
  },
  grid:{
    top: '15%',
    left: '3%',
    right: '15%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value',
      axisLabel:{
        color:'#999',
        formatter: function (value) {
        return Math.abs(value).toLocaleString();
        }
      },
      splitLine:{
        lineStyle:{
          color:'rgb(255,255,255,0.1)'
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLine:{
        show:false
      },
      axisLabel:{
        color:'#fff',
        fontSize:10,
        interval:0
      },
      data: ['学前教育','小学','初中', '高中','大学专科','大学本科','硕士研究生', '博士研究生'  ]
    }
  ],
  series: [
    {
      name: '男生',
      type: 'bar',
      stack: 'Total',
      label: {
        show: false,
        position:'right',
        color:'#fff',
        fontSize:11,
        formatter: function (params) {
          return params.value.toLocaleString();
        }
      },
      itemStyle:{
        color:'#5470c6'
      },
      emphasis: {
        focus: 'series'
      },
      data: [2786.8882,16489.3183,26344.8804,11699.6970,5872.7560,4763.7012,472.1323,77.4020]
    },
    {
      name: '女生',
      type: 'bar',
      stack: 'Total',
      label: {
        show: false,
        position: 'left',
        color:'#fff',
        fontSize:11,
        formatter: function (params) {
          return Math.abs(params.value).toLocaleString();
        }
      },
      itemStyle:{
        color:'#ee6666'
      },
      emphasis: {
        focus: 'series'
      },
      data: [-2548.6963,-18476.5550,-22364.6206,-9521.2952,-5357.5442,-4651.9060,-476.6905,-50.3329]
    }
  ]
};
gendercharts.setOption(genderoption);

// 雷达图
var radar=document.getElementById("radar");
var radarchart=echarts.init(radar);
var radaroption = {
  title: {
    text: '城市乡镇农村各年龄段的文盲率',
    left:'center',
    top:'0px',
    top:'auto',
    textStyle:{
      color:'#fff',
      fontSize:16,
      fontWeight:'normal'
    }
  },
  legend: {
    data: ['城市', '乡镇','农村'],
    top:'auto',
    bottom:1,
    left:'center',
    orient:'horizontal',
    textStyle:{
      color:'#fff'
    }
  },
  radar: {
    center:['50%','55%'],
    radius:'60%',
    axisLine:{
      lineStyle:{
        color:'#ccc',
        width:1
      }
    },
    splitArea:{
      areaStyle:{
        color:['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
        shadowColor:'rgba(0,0,0,0.2)',
        shadowBlur:10
      }
    },
    splitLine:{
      lineStyle:{
        color:'#ddd',
        width:1
      }
    },
    indicator: [
      { name: '15-29岁(新生代青年)', max: 30},
      { name: '30-49岁(青壮年)', max: 30 },
      { name: '50-64岁(中老年)', max: 30 },
      { name: '65-79岁(低龄老年)', max: 30 },
      { name: '80岁以上(高龄老年)', max: 30 },
    ]
  },
  tooltip:{
    formatter:function(params){
      var result=params.name+'<br/>';
      params.value.forEach(function(item,index){
        result+=radaroption.radar.indicator[index].name+':'+item.toFixed(2)+'%<br/>';
      });
      return result;
    }
  },
  series: [
    {
      name: '各区域文盲率分布',
      type: 'radar',
      emphasis:{
        lineStyle:{
        width:4,
      },
      areaStyle:{
        opacity:0.5
      }
      },
      blur:{
        lineStyle: {
          width: 1,
          opacity: 0.3
        },
        areaStyle: {
          opacity: 0.1
        },
        itemStyle: {
          opacity: 0.3
        }
      },
      lineStyle: {
        width: 3,
        type: 'solid'
      },
      areaStyle: {
        opacity: 0.2
      },
      symbolSize:6,
      symbol:'circle',
      data: [
        {
          value: [0.10,0.26,1.34,4.59,7.65],
          name: '城市',
          lineStyle:{
            color:'#5470c6'
          },
          itemStyle:{
            color:'#5470c6'
          },
          areaStyle:{
            color:'#5470c6'
          }
        },
        {
          value: [0.20,0.63,2.62,9.63,24.22],
          name: '乡镇',
          lineStyle: {
            color: '#91cc75'
          },
          itemStyle: {
            color: '#91cc75'
          },
          areaStyle: {
            color: '#91cc75'
          }
        },
        {
          value:[0.58,1.87,4.70,4.70,32.29],
          name:'农村',
          lineStyle: {
            color: '#fac858'
          },
          itemStyle: {
            color: '#fac858'
          },
          areaStyle: {
            color: '#fac858'
          }
        }
      ]
    }
  ]
};
radarchart.setOption(radaroption);
radarchart.on('mouseover', function(params) {
  // 高亮当前数据系列，淡化其他系列
  radarchart.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: params.dataIndex
  });
});
radarchart.on('mouseout', function(params) {
  // 取消高亮
  radarchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: params.dataIndex
  });
});

// 热力图
var hot=document.getElementById('hot');
var hotchart=echarts.init(hot);
// prettier-ignore
const citys = ['北京', '上海', '浙江', '天津', '湖北', '重庆', '山东', '湖南', '辽宁', '四川','西藏','云南','青海','甘肃'];
// prettier-ignore
const studys = ['小学', '初中', '高中', '大专', '本科', '硕士研究生','博士研究生'];
// prettier-ignore
const hotdata = [
  [0, 0, 10.77], [0, 1, 12.15], [0, 2, 27.05], [0, 3, 16.5], [0, 4, 24.2], [0, 5, 30.69], [0, 6, 24.48], [0, 7, 25.98], [0, 8, 19.24], [0, 9, 32.16], [0, 10, 33.69], [0, 11, 37.02], [0, 12, 33.99], [0, 13, 30.91],
[1, 0, 23.89],[1, 1, 29.47],[1, 2, 33.53],[1, 3, 33.06],[1, 4, 35.27],[1, 5, 31.39],[1, 6, 36.97],[1, 7, 36.72],[1, 8, 43.59],[1, 9, 32.29],[1, 10, 16.53],[1, 11, 30.35],[1, 12, 25.28],[1, 13, 28.44],
[2, 0, 18.05],[2, 1,19.37],[2, 2, 14.92],[2, 3,18.14],[2, 4, 17.93],[2, 5, 16.38],[2, 6, 14.81],[2, 7, 18.31],[2, 8, 14.94],[2, 9, 13.66],[2, 10,7.4],[2, 11, 10.73],[2, 12,10.98],[2, 13, 13.42],
[3, 0, 13.72],[3, 1,12.58],[3, 2, 8.69],[3, 3,11.24],[3, 4,8.37],[3, 5, 8.37],[3, 6, 7.99],[3, 7, 7.32],[3, 8, 9.02],[3, 9, 7.42],[3, 10,5.44],[3, 11, 6.32],[3, 12,8.11],[3, 13,8],
[4, 0, 22.36],[4, 1,17.53],[4, 2,7.86],[4, 3,14.39],[4, 4,6.73],[4, 5,6.79],[4, 6, 6.19],[4, 7, 4.87],[4, 8, 8.69],[4, 9, 5.62],[4, 10,5.89],[4, 11, 5.37],[4, 12,6.98],[4, 13,6.54],
[5, 0, 5.92],[5, 1,3.84],[5, 2,0.77],[5, 3,1.72],[5, 4,0.74],[5, 5,0.58],[5, 6, 0.61],[5, 7, 0.37],[5, 8, 0.77],[5, 9, 0.52],[5, 10,0.22],[5, 11,0.31],[5, 12,0.33],[5, 13,0.44],
[6, 0, 1.07],[6, 1,0.55],[6, 2,0.1],[6, 3,0.22],[6, 4,0.12],[6, 5,0.07],[6, 6, 0.07],[6, 7,0.05],[6, 8, 0.08],[6, 9, 0.07],[6, 10,0.02],[6, 11,0.04],[6, 12,0.03],[6, 13,0.06],
]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});
var hotoption = {
  title: {
    text: '各省市教育程度占比热力图',
    left: 'center',
    top: '10px',
    textStyle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'normal'
    }
  },
  tooltip: {
    position: 'top',
    formatter: function(params) {
      var city = citys[params.data[0]];
      var study = studys[params.data[1]];
      var value = params.data[2];
      return city + '<br/>' + study + ': ' + value + '%';
    }
  },
  grid: {
    height: '70%',
    top: '15%',
    left:'10%',
    right:'15%',
    bottom:'20%'
  },
  xAxis: {
    type: 'category',
    data: citys,
    splitArea: {
      show: true
    },
    axisLabel: {
      color: '#fff',
      rotate: 45
    }
  },
  yAxis: {
    type: 'category',
    data: studys,
    splitArea: {
      show: true
    },
    axisLabel: {
      color: '#fff'
    }
  },
  visualMap: {
    min: 0,
    max: 44,
    calculable: true,
    orient: 'vertical',
    right:'5%',
    top:'15%',
    bottom: 'auto',
    textStyle:{
      color:'#fff'
    },
    inRange: {
      color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
    }
  },
  series: [
    {
      name: '学历占比',
      type: 'heatmap',
      data: hotdata,
      label: {
        show: true,
        color:'#000',
        fontSize:10,
        formatter: function(params) {
          return params.data[2] + '%';
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
hotchart.setOption(hotoption);