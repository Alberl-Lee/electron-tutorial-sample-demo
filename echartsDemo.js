$(document).ready(function () {
  InitChinaMap();
  InitPressure();
  InitPie();
});

function InitPressure() {
  var myChart = echarts.init(document.getElementById("chartPressure"));
  var option = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    series: [
      {
        name: "Pressure",
        type: "gauge",
        progress: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
        },
        data: [{ value: 50, name: "SCORE" }],
      },
    ],
  };
  myChart.setOption(option);
}

function InitPie() {
  var myChart = echarts.init(document.getElementById("chartPie"));
  option = {
    title: {
      text: "Weather Statistics",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      bottom: 10,
      left: "center",
      data: ["CityA", "CityB", "CityD", "CityC", "CityE"],
    },
    series: [
      {
        type: "pie",
        radius: "65%",
        center: ["50%", "50%"],
        selectedMode: "single",
        data: [
          { value: 1548, name: "CityE" },
          { value: 735, name: "CityC" },
          { value: 510, name: "CityD" },
          { value: 434, name: "CityB" },
          { value: 335, name: "CityA" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  myChart.setOption(option);
}

function InitChinaMap() {
  // 同一个id可以一直初始化，这样2个chart界面会叠加
  var myChart = echarts.init(document.getElementById("chartChinaMap"));
  myChart.setOption({
    // 进行相关配置
    tooltip: {}, // 鼠标移到图里面的浮动提示框
    dataRange: {
      // show: false,
      min: 0,
      max: 1000,
      text: ["High", "Low"],
      realtime: true,
      calculable: true,
      color: ["#ff3333", "orange", "yellow", "lime", "aqua"],
      textStyle: {
        color: "#fff",
      },
    },

    geo: {
      name: "全国",
      map: "china", // 表示中国地图
      roam: true, // 是否开启鼠标缩放和平移漫游
      label: {
        show: true, // 是否显示对应地名
        color: "#fff",
      },

      // 普通样式。
      itemStyle: {
        borderColor: "rgba(100,149,237,1)",
        borderWidth: "0.5",
        areaColor: "#1b1b1b",
      },

      // 高亮样式。
      emphasis: {
        itemStyle: {
          areaColor: null,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        label: {
          show: true,
          // 高亮时标签的文字。
          // formatter: "This is a emphasis label.",
        },
      },
    },
    series: [
      {
        name: "第1条serie", // 浮动框的标题
        type: "map",
        // type: "effectScatter", // 数据点的类型
        // coordinateSystem: "geo", // 对应上方配置
        geoIndex: 0,
        data: [
          { name: "吉林", value: 44 },
          { name: "湖北", value: 810 },
          { name: "四川", value: 453 },
          { name: "青海", value: 666 },
        ],
      },
      {
        name: "第2条serie",
        type: "map", // 地图如果可以选中，数据点的type就只能是map，否则可以为圆圈
        geoIndex: 0,
        data: [
          { name: "广东", value: 995 },
          { name: "湖南", value: 180 },
        ],
      },
    ],
  });
}
