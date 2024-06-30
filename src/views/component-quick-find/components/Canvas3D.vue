<template>
    <div ref="Box3D">
    </div>

</template>

<script setup>
/**
 * 3d建模中，WebGL相当于渲染器   Three.js相当于构造器
*/
//导入threejs
import * as THREE from 'three'
//导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {ref,onMounted,nextTick,defineProps,watch} from 'vue'

const props = defineProps(['loaded'])

const Box3D = ref()
//创建场景
const scene = new THREE.Scene()
//创建相机  ---透视相机，近小远大
const camera = new THREE.PerspectiveCamera(
    45, //视角 --越大看的越广
    window.innerWidth / window.innerHeight, //相机屏幕宽高比
    0.1, //近平面 --最近能看到的
    1000 //远平面 --最远能看到的
)
//创建渲染器
const renderer = new THREE.WebGLRenderer()
//创建几何体
const geometry = new THREE.BoxGeometry(1,1,1)
//创建材质 --基本类型的几何体
const material = new THREE.MeshBasicMaterial({color:0x00ff00})
// const parentMaterial = new THREE.MeshBasicMaterial({color:0xff0000})
//创建网格
// const parentCube = new THREE.mesh(geometry,parentMaterial)
const cube = new THREE.Mesh(geometry,material)
//添加世界坐标辅助器
//green：y-axis   red：x-axis  blue：z-axis
const axesHelper = new THREE.AxesHelper(5)  //线段长度为5
// 添加轨道控制器--手动控制方向和大小  ----控制相机的远近和方向
const controls = new OrbitControls(camera,renderer.domElement)



// 初始化动画状态
let animationRunning = false
let raf = null

const animate=()=>{
    controls.update()
    if(!animationRunning) return
    //要随着屏幕大小的变换而变换
    renderer.setSize(Box3D.value.parentNode.clientWidth,Box3D.value.parentNode.clientHeight)  //渲染的屏幕的宽高
    //旋转
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    //渲染
    renderer.render(scene,camera)
    raf = requestAnimationFrame(animate)
}


const renderPage = ()=>{

    //将网格添加到场景中
    // parentCube.add(cube)
    //对象局部位置的三维坐标系？？？
    // parentCube.position.set(-3,0,0)

    // cube.position.x = 2
    cube.position.set(3,0,0)
    // scene.add(parentCube)
    scene.add(cube)
    
    //设置相机位置
    camera.position.z = 5
    camera.position.x = 2
    camera.position.y = 2

    // 添加世界坐标辅助器
    scene.add(axesHelper)

    //设置带阻尼的惯性 -- 旋转移动的惯性动力--
    controls.enableDamping = true
    //设置阻尼系数
    controls.dampingFactor =  0.01
    //设置自动旋转
    // controls.autoRotate = true

    camera.lookAt(0,0,0)
    
    //要随着屏幕大小的变换而变换
    renderer.setSize(Box3D.value.parentNode.clientWidth,Box3D.value.parentNode.clientHeight)  //渲染的屏幕的宽高
    //渲染
    renderer.render(scene,camera)
    //把canvas渲染内容添加到页面中
    Box3D.value.appendChild(renderer.domElement)
}


onMounted(async()=>{ 
    //进入开始动画
    Box3D.value.addEventListener("mouseover", (e) => {
        if(e.target.tagName == 'CANVAS' && !animationRunning){
            animationRunning = true
            animate()
        }
    });
    //离开停止动画
    Box3D.value.addEventListener("mouseout", (e) => {
        if(e.target.tagName == 'CANVAS' && animationRunning){
            animationRunning = false
            cancelAnimationFrame(raf);
        }
    });
})


watch(
    ()=>props.loaded,
    async (val)=>{
        if(val){
            let parentWidth = 0
            let timer = null
            //轮询 ---目前还没有其他方法  ——————tab的bug  question
            const loop = ()=>{
                timer = setTimeout(()=>{
                    parentWidth = Box3D.value.parentNode.clientWidth
                    if(parentWidth == 0){
                        //继续执行
                        loop()
                    }else{
                        //页面渲染完成了
                        clearTimeout(timer)
                        timer = null
                         //加载3D动画
                        renderPage()
                    }
                },1)
            }
            loop()
        }
})

</script>

<style scoped>
</style>