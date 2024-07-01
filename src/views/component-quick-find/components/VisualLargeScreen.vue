<template>
    <div class="large-screen">
        <div class="title-bar">
            <span>标题栏</span>
            <span class="full-screen">全屏</span>
        </div>
        
        <div class="show-content">
            <div class="left-content">
                <div class="left1">left 1</div>
                <div class="left2">
                    <div ref="left2Sector"></div>
                    <div class="left2-describ">
                        <div><span ref="left2Sector2_1"></span> 检查完成率{{makeText(valOnRadian1)}}</div>
                        <div><span ref="left2Sector2_2"></span>检查完成率{{makeText(valOnRadian1)}}</div>
                        <div><span ref="left2Sector2_3"></span>检查完成率{{makeText(valOnRadian1)}}</div>
                        <div><span ref="left2Sector2_4"></span>检查完成率{{makeText(valOnRadian1)}}</div>
                        <div><span ref="left2Sector2_5"></span>检查完成率{{makeText(valOnRadian1)}}</div>
                    </div>
                </div>
                <div class="left3">left 1</div>
            </div>
            <div class="center-content">
                <div class="center1">1</div>
                <div class="center2">2</div>
                <div class="center3">3</div>
            </div>
            <div class="right-content">
                <div class="right1">right 1</div>
                <div class="right2">right 1</div>
                <div class="right3">right 1</div>
                <div class="right4">right 1</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted,nextTick} from 'vue'
import * as echarts from 'echarts'
import arrowPng from '../../../assets/images/arrow.png'

const left2Sector = ref()
const left2Sector2_1 = ref()
const left2Sector2_2 = ref()
const left2Sector2_3 = ref()
const left2Sector2_4 = ref()
const left2Sector2_5 = ref()

const chartLeft2 = ref()
const chartLeft2_1 = ref()
const chartLeft2_2 = ref()
const chartLeft2_3 = ref()
const chartLeft2_4 = ref()
const chartLeft2_5 = ref()

const _panelImageURL =  arrowPng;
const _animationDuration = 1000;
const _animationDurationUpdate = 1000;
const _animationEasingUpdate = 'quarticInOut';
const _valOnRadianMax = 200;
const _currentDataIndex = 0;

//big
//外扇半径 
const _outerRadius = 60;
// 内扇半径
const _innerRadius = 50;
//箭头外扩半径
const _pointerInnerRadius = 20;
//内圆半径
const _insidePanelRadius = 40;

//small
//外扇半径
const _smallOuterRadius = 11;
// 内扇半径
const _smallInnerRadius = 8;
//箭头外扩半径
const _smallPointerInnerRadius = 6;
//内圆半径
const _smallInsidePanelRadius = 6;


//临时 ---question
const valOnRadian1 = ref()


//自定义渲染内容
const renderItem=(params, api)=> {
  var valOnRadian = api.value(1);
  valOnRadian1.value  = valOnRadian

  //极坐标计算公式 ？？？  
  var coords = api.coord([api.value(0), valOnRadian]);
  //结束角度
  var polarEndRadian = coords[3];
  var imageStyle = {
    image: _panelImageURL,
    //图片的定位
    x: params.coordSys.cx - _outerRadius,
    y: params.coordSys.cy - _outerRadius,
    width: _outerRadius * 2,
    height: _outerRadius * 2,
  };
  return {
    type: 'group',
    children: [
        //圆弧
        {
          type: 'arc',
          shape: {
            cx: params.coordSys.cx,
            cy: params.coordSys.cy,
            r: _outerRadius + 4,
            startAngle: 0,
            endAngle: -polarEndRadian,
            transition: 'endAngle',
            enterFrom: { endAngle: 0 }
          },
          style: {
            stroke: 'rgba(221, 247, 247,0.2)',
            fill:'rgba(255, 255, 255,0)',
            lineWidth:4,
            shadowBlur: 25,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(221, 247, 247)'
          },
      },
      //扇形
      {
        type: 'image',
        style: imageStyle,
        clipPath: {
          type: 'sector',
          shape: {
            cx: params.coordSys.cx,
            cy: params.coordSys.cy,
            r: _outerRadius,
            r0: _innerRadius,
            startAngle: 0,
            endAngle: -polarEndRadian,
            transition: 'endAngle',
            enterFrom: { endAngle: 0 }
          }
        }
      },
      //箭头
      {
        type: 'image',
        style: imageStyle,
        clipPath: {
          type: 'polygon',
          shape: {
            points: makePionterPoints(params, polarEndRadian)
          },
          extra: {
            polarEndRadian: polarEndRadian,
            transition: 'polarEndRadian',
            enterFrom: { polarEndRadian: 0 }
          },
          during: function (apiDuring) {
            apiDuring.setShape(
              'points',
              makePionterPoints(params, apiDuring.getExtra('polarEndRadian'))
            );
          }
        }
      },
      //中间圆形
      {
        type: 'circle',
        shape: {
          cx: params.coordSys.cx,
          cy: params.coordSys.cy,
          r: _insidePanelRadius
        },
        style: {
          fill: 'rgba(255,255,255,0.2)',
          shadowBlur: 25,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(76,107,167)'
        }
      },
      //中间文字
      {
        type: 'text',
        extra: {
          valOnRadian: valOnRadian,
          transition: 'valOnRadian',
          enterFrom: { valOnRadian: 0 }
        },
        style: {
          text: makeText(valOnRadian),
          fontSize: 30,
          fontWeight: 700,
          x: params.coordSys.cx,
          y: params.coordSys.cy,
          fill: 'rgb(255,255,255)',
          align: 'center',
          verticalAlign: 'middle',
          enterFrom: { opacity: 0 }
        },
        during: function (apiDuring) {
          apiDuring.setStyle(
            'text',
            makeText(apiDuring.getExtra('valOnRadian'))
          );
        }
      }
    ]
  };
}



const smallRenderItem=(params, api)=> {
  var valOnRadian = api.value(1);
  var coords = api.coord([api.value(0), valOnRadian]);
  //结束角度
  var polarEndRadian = coords[3];
  var imageStyle = {
    image: _panelImageURL,
    //图片的定位
    x: params.coordSys.cx - _smallOuterRadius,
    y: params.coordSys.cy - _smallOuterRadius,
    width: _smallOuterRadius * 2,
    height: _smallOuterRadius * 2,
  };
  return {
    type: 'group',
    children: [
        //圆弧
        {
          type: 'arc',
          shape: {
            cx: params.coordSys.cx,
            cy: params.coordSys.cy,
            r: _smallOuterRadius+4,
            startAngle: 0,
            endAngle: -polarEndRadian,
            transition: 'endAngle',
            enterFrom: { endAngle: 0 }
          },
          style: {
            stroke: 'rgba(221, 247, 247,0.2)',
            fill:'rgba(255, 255, 255,0)',
            lineWidth:4,
            shadowBlur: 25,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(221, 247, 247)'
          },
        },
        //扇形
        {
            type: 'image',
            style: imageStyle,
            clipPath: {
            type: 'sector',
            shape: {
                cx: params.coordSys.cx,
                cy: params.coordSys.cy,
                r: _smallOuterRadius,
                r0: _smallInnerRadius,
                startAngle: 0,
                endAngle: -polarEndRadian,
                transition: 'endAngle',
                enterFrom: { endAngle: 0 }
            }
            }
        },
        //中间圆形
        {
            type: 'circle',
            shape: {
            cx: params.coordSys.cx,
            cy: params.coordSys.cy,
            r: _smallInsidePanelRadius
            },
            style: {
            fill: 'rgba(255,255,255)',
            shadowBlur: 25,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(76,107,167)'
            }
        },
    ]
  };
}


//返回最终计算结果
const  makeText=(valOnRadian)=> {
  // Validate additive animation calc.
  if (valOnRadian < -10) {
    alert('illegal during val: ' + valOnRadian);
  }
  return ((valOnRadian / _valOnRadianMax) * 100).toFixed(0) + '%';
}


//转换成极坐标系点---计算公式？？
const convertToPolarPoint=(renderItemParams, radius, radian)=> {
  return [
    Math.cos(radian) * radius + renderItemParams.coordSys.cx,
    -Math.sin(radian) * radius + renderItemParams.coordSys.cy
  ];
}

//和三角箭头有关
const makePionterPoints=(renderItemParams, polarEndRadian)=> {
  return [
    convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
    convertToPolarPoint(
      renderItemParams,
      _outerRadius,
      polarEndRadian + Math.PI * 0.03
    ),
    convertToPolarPoint(renderItemParams, _pointerInnerRadius, polarEndRadian)
  ];
}

onMounted(async ()=>{

    //需要等到页面完全渲染完后，再初始化图表，得到正确的宽高
    await nextTick();
    
    const optionBig = {
        animationEasing:_animationEasingUpdate,
        animationDuration:_animationDuration,
        animationDurationUpdate: _animationDurationUpdate,
        animationEasingUpdate: _animationEasingUpdate,
        dataset: {
            source: [[1, 156]]
        },
        tooltip: {},
        angleAxis: {
            type: 'value',
            startAngle: 0,
            show: false,
            min: 0,
            max: _valOnRadianMax
        },
        radiusAxis: {
            type: 'value',
            show: false
        },
        polar: {},
        series: [
            {
            type: 'custom',
            coordinateSystem: 'polar',
            renderItem: renderItem
            }
        ]
    }


    const optionSmall = {
        animationEasing:_animationEasingUpdate,
        animationDuration:_animationDuration,
        animationDurationUpdate: _animationDurationUpdate,
        animationEasingUpdate: _animationEasingUpdate,
        dataset: {
            source: [[1, 156]]
        },
        tooltip: {},
        angleAxis: {
            type: 'value',
            startAngle: 0,
            show: false,
            min: 0,
            max: _valOnRadianMax
        },
        radiusAxis: {
            type: 'value',
            show: false
        },
        polar: {},
        series: [
            {
            type: 'custom',
            coordinateSystem: 'polar',
            renderItem: smallRenderItem
            }
        ]
    }

    //需要等到页面完全渲染完后，再初始化图表，得到正确的宽高
    chartLeft2.value = echarts.init(left2Sector.value)
    chartLeft2_1.value = echarts.init(left2Sector2_1.value)
    chartLeft2_2.value = echarts.init(left2Sector2_2.value)
    chartLeft2_3.value = echarts.init(left2Sector2_3.value)
    chartLeft2_4.value = echarts.init(left2Sector2_4.value)
    chartLeft2_5.value = echarts.init(left2Sector2_5.value)

    chartLeft2.value.setOption(optionBig)
    chartLeft2_1.value.setOption(optionSmall)
    chartLeft2_2.value.setOption(optionSmall)
    chartLeft2_3.value.setOption(optionSmall)
    chartLeft2_4.value.setOption(optionSmall)
    chartLeft2_5.value.setOption(optionSmall)


    // setInterval(function () {
        //这个有问题
        // chartLeft2.value.resize();
        // var nextSource = [[1, Math.round(Math.random() * _valOnRadianMax)]];
        // chartLeft2.value.setOption({
        //     dataset: {
        //     source: nextSource
        //     }
        // });  
    // }, 3000);



})

</script>

<style scoped lang="scss"> 
    .large-screen{
        position: relative;
        color:  white;
        width: 100%;
        height: 100%;
        z-index: 1;
      
        &::before{
            content: ""; /* 伪元素需要内容，即使它是空的 */  
            position: absolute;  
            top: 0;  
            right: 0;  
            bottom: 0;  
            left: 0;  
            width: 100%;
            height: 100%;
            background-image: url("../../../assets/images/star1.jpg");
            background-repeat: no-repeat;  
            background-size: cover;
            background-position: center center;
            opacity: 0.8;
            z-index: -1;   /*::before 上加才有作用*/
        }
    }

    .title-bar{
        line-height: 60px;
        height: 60px;
        background-color: rgba(53,96,163,0.5) ;
        padding: 0 10px;
        .full-screen{
            float:right
        } 
    }

    .show-content{
        display: flex;
        flex-direction: row;
        height: calc(100% - 60px);
        margin: 0 5px 3px;

        &>div{
            flex:1 1;
            display: flex;
            flex-direction: column;
            &>div{
                margin: 5px 5px;
                background-color: rgba(84, 138, 201, 0.3);
                flex:1 1;
            }
        }

        .center-content{
            flex: 2 2;
            .center2{
                flex:3 3;
            }
        }

        .left-content{
            .left2{
                display: flex;
                flex-direction:row;
                &>div:nth-child(1){
                    flex: 1 1;
                }
                &>div:nth-child(2){
                    flex: 1.1 1.1;
                }
                .left2-describ{
                    display: flex;
                    flex-direction:column;
                    justify-content: space-around;
                    &>div{
                        display: flex;
                        flex-direction:row;
                        align-items:center;
                        span {
                            display: inline-block;
                            width: 35px;
                            height: 35px;
                            margin-right: 5px;
                        }
                    }
                } 
            }
        }
    }

</style>