import axios from "axios"
import { ElMessage } from "element-plus";
import router from "@/router";
//通用用法
// axios.defaults.baseURL = "http://localhost:8081/knowledge_tree/swagger"
// 调用create方法来创建相应的实例---可以用于创建多个不同的请求地址的情况
const baseService = axios.create({
    //服务端地址 
    baseURL:process.env.VUE_APP_API,
})


// 请求拦截器
const reqInterceptors = baseService.interceptors.request.use(
    (config)=>{

        // 添加请求头
        config.headers['Request-Start']=new Date().getTime();
        return config
    },
    (err)=>{
        return Promise.reject(err)
    }
)

// 移除请求拦截
// baseService.interceptors.request.eject(reqInterceptors)


// 响应拦截器
const respInterceptors = baseService.interceptors.response.use(
    (res)=>{

        /*
        if(res.data.code === 0){
            return res
        }
         // 错误提示
        ElMessage.error(res.data.msg);

        if (res.data.code === 401) {
            //自定义业务状态码
            router.replace("/401");
        }
      
        return Promise.reject(new Error(res.data.msg || "Error"));
        */

        return res
    },


    (err)=>{

        /* 
        const httpCodeLabel:any = {
            400: "请求参数错误",
            401: "未授权，请登录",
            403: "拒绝访问",
            404: `请求地址出错`,
            408: "请求超时",
            500: "API接口报500错误",
            501: "服务未实现",
            502: "网关错误",
            503: "服务不可用",
            504: "网关超时",
            505: "HTTP版本不受支持"
        };

        if (err && err.response) {
        console.error("请求错误", err.response.data);
        }
           
        //如何获取请求的状态码
        if (status === 401) {
        router.replace("/404");
        }
        return Promise.reject(new Error(httpCodeLabel[status] || "接口错误"));
        */

        return Promise.reject(err)
    }
)
// 移除响应拦截
// baseService.interceptors.response.eject(respInterceptors)





export default baseService