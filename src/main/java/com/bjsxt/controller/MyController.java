package com.bjsxt.controller;

/**
 * 接口配置
 * */

import com.bjsxt.anno.MyAnnotation4Swagger;
import com.bjsxt.entity.*;
import com.bjsxt.entity.KnowledgeTreeEntity;

import com.bjsxt.service.*;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/swagger")   //表示路径中所有请求方法的前缀
/**
 * @Api 描述当前类型生成帮助文档的信息
 *   属性 -
 *     - tags: 给当前类型定义别名，可以有多个。定义几个别名，在ui视图中就显示几个控制器访问菜单。
 *     - description 给当前类型生成的帮助文档定义一个描述信息
 *
 * */
@Api(tags = {"MyController","Swagger学习控制器"},description="测试API类型描述信息")
public class MyController {


    @Autowired
   private UserServiceImpl userServiceImpl;


   @Autowired
   private KnowledgeCategoryService knowledgeCategoryService;

   @Autowired
   private ModelListService modelListService;

   @Autowired
   private ModelBranchListService modelBranchListService;

    @Autowired
   private ContentListService contentListService;

    @Autowired
    private KnowledgeContentService knowledgeContentService;

    /**
    * 获取知识分类  查询
    * */
    @GetMapping("/getKnowledgeCategory")
    @ApiOperation(value = "获取知识图谱分类-首页分类",notes = "示例参数以及返回内容")
    public List<KnowledgeCategoryEntity> getKnowledgeCategory(Long id){
        try{
            return knowledgeCategoryService.getKnowledgeCategory(id);
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return null ;
    }


    /**
    * 树形图
    * */
    @GetMapping("/getKnowledgeTree")
    @ApiOperation(value = "获取知识图谱树形图",notes = "示例参数以及返回内容")
    public List<KnowledgeTreeEntity> getKnowledgeTree(Long id){
        try{

            //定义一个空树 数组对象
            List<KnowledgeTreeEntity> knowledgeTree = new ArrayList<KnowledgeTreeEntity>();
            //调用第一层接口
            List<KnowledgeCategoryEntity> knowledgeCategoryList =  getKnowledgeCategory(id);

            for(KnowledgeCategoryEntity item : knowledgeCategoryList){
                   KnowledgeTreeEntity obj = new KnowledgeTreeEntity();
                   obj.setId(item.getId());
                   obj.setLabel(item.getName());
                   obj.setLevel(1);
                   knowledgeTree.add(obj);
            };



            //二层嵌套
            for(KnowledgeTreeEntity tree1 : knowledgeTree){
                //二层嵌套
                //给新定义的 modelArray 赋值 id
                ModelListEntity modelObj = new ModelListEntity();
                modelObj.setParentId(tree1.getId());

                //定义一个空树 数组对象
                List<KnowledgeTreeEntity> KnowledgeTree2 = new ArrayList<KnowledgeTreeEntity>();
                //调用第二层接口 ---获取信息
                List<ModelListEntity>  modelList = getModelList(modelObj);

                for (ModelListEntity item2 : modelList){
                    KnowledgeTreeEntity obj2 = new KnowledgeTreeEntity();

                    obj2.setId(item2.getId());
                    obj2.setLabel(item2.getName());
                    obj2.setLevel(2);
                    KnowledgeTree2.add(obj2);
                }
                tree1.setChildren(KnowledgeTree2);

            }



            //三层嵌套
            for(KnowledgeTreeEntity tree3_1 : knowledgeTree){

                for(KnowledgeTreeEntity tree3_2 : tree3_1.getChildren()){
                    //三层嵌套
                    //给新定义的 modelArray 赋值 id
                    ModelBranchListEntity modelBranchObj = new ModelBranchListEntity();
                    modelBranchObj.setParentId(tree3_2.getId());

                    //定义一个空树 数组对象
                    List<KnowledgeTreeEntity> KnowledgeTree3_2 = new ArrayList<KnowledgeTreeEntity>();

                    /**
                     * 调用第三层接口 ---获取信息
                     *  */
                    List<ModelBranchListEntity>  modelBranchList = getModelBranchList(modelBranchObj);// (modelObj);



                    for (ModelBranchListEntity item3 : modelBranchList){
                        KnowledgeTreeEntity obj3 = new KnowledgeTreeEntity();

                        obj3.setId(item3.getId());
                        obj3.setLabel(item3.getName());
                        obj3.setLevel(3);
                        KnowledgeTree3_2.add(obj3);
                    }

                    tree3_2.setChildren(KnowledgeTree3_2);

                }


            }







            return knowledgeTree;


        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return null ;
    }




    /**
     * 模块细分 2   查询
     * */
    @GetMapping("/modelList")
    @ApiOperation(value = "获取知识图谱首页某个模块的列表",notes = "示例参数以及返回内容")

    public List<ModelListEntity> getModelList(ModelListEntity modelListEntity){
        try{
            return modelListService.getModelListList(modelListEntity);
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return null;
    }


    /**
     * 模块细分 2   增加
     * */
    @PostMapping("/modelList")
    @ApiOperation(value = "给知识图谱首页某个模块的列表添加数据",notes = "示例参数以及返回内容")
    public String addModelMessage(@RequestBody ModelListEntity params){
        try{
            modelListService.addModelMessage(params);
            return "success";
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }


    /**
     * 模块细分 2   删除
     * */
    @DeleteMapping("/modelList")
    @ApiOperation(value = "删除知识图谱首页某个模块的列表数据",notes = "示例参数以及返回内容")
    public String deleteModelMessage(ModelListEntity modelListEntity){
        try{
            /*要添加条件限制*/
            ModelBranchListEntity modelBranchListEntity  = new ModelBranchListEntity();
            modelBranchListEntity.setParentId(modelListEntity.getId());
            List<ModelBranchListEntity> modelBranchList =  modelBranchListService.getModelBranchList(modelBranchListEntity);

            //有子项未删除
            if(modelBranchList.size()>0){
                return "cascading";
            }else {
                modelListService.deleteModelMessage(modelListEntity);
                return "success";
            }

        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }


    /**
     * 模块细分 2   修改
     * */
    @PutMapping("/modelList")
    @ApiOperation(value = "修改知识图谱首页某个模块的列表数据",notes = "示例参数以及返回内容")
    public String updateModelMessage(@RequestBody ModelListEntity params){
        try{
            modelListService.updateModelMessage(params);
            return "success";
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }



//////////////////#############################////////////

    /**
     * 模块分支列表  查询
     * */

    @GetMapping("/modelBranchList")
    @ApiOperation(value = "获取某个模块分支的列表",notes = "示例参数以及返回内容")

    public List<ModelBranchListEntity> getModelBranchList(ModelBranchListEntity modelBranchListEntity){
        try{
            return modelBranchListService.getModelBranchList(modelBranchListEntity);
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return null;
    }



    /**
     * 模块分支列表    增加
     * */
    @PostMapping("/modelBranchList")
    @ApiOperation(value = "给某个模块的列表分支添加数据",notes = "示例参数以及返回内容")
    public String addModelBranchMessage(@RequestBody ModelBranchListEntity params){
        try{
            modelBranchListService.addModelBranchMessage(params);
            return "success";
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }



    /**
     * 模块分支列表    删除
     * */
    @DeleteMapping("/modelBranchList")
    @ApiOperation(value = "删除某个模块的列表分支数据",notes = "示例参数以及返回内容")
    public String deleteModelBranchMessage(ModelBranchListEntity modelBranchListEntity){
        try{
            /*此处要添加条件判断*/
            ContentListEntity contentListEntity = new ContentListEntity();
            //赋值
            contentListEntity.setParentId(modelBranchListEntity.getId());

            //parentId
            List<ContentListEntity> contentList =  contentListService.getContentList(contentListEntity);
            System.out.println("子项的长度"+contentList.size());
            if(contentList.size() > 0){
                //还有子项未删除
                return "cascading";
            }else{
                modelBranchListService.deleteModelBranchMessage(modelBranchListEntity);
                return "success";
            }

        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }


    /**
     * 模块分支列表   修改
     * */
    @PutMapping("/modelBranchList")
    @ApiOperation(value = "修改某个模块的列表分支数据",notes = "示例参数以及返回内容")
    public String updateModelBranchMessage(@RequestBody ModelBranchListEntity params){
        try{
            modelBranchListService.updateModelBranchMessage(params);
            return "success";
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }


//////////////////#############################////////////


    /**
     * 内容列表  查询
     * */

    @GetMapping("/contentList")
    @ApiOperation(value = "获取某个模块内容的列表",notes = "示例参数以及返回内容")

    public List<ContentListEntity> getContentList(ContentListEntity contentListEntity){
        try{
            return contentListService.getContentList(contentListEntity);
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return null;
    }




    /**
     * 内容列表    增加
     * */
    @PostMapping("/contentList")
    @ApiOperation(value = "给某个模块内容的列表分支添加数据",notes = "示例参数以及返回内容")
    public String addContentListMessage(@RequestBody ContentListEntity params){

        //增加内容列表的同时需要创建空白内容文档
        try{
            //先创建内容列表
            //应该要返回一个id
            Long id = contentListService.addContentMessage(params);
            System.out.println("新增的时候获取到的id值"+id);


            //根据创建的内容列表的id创建空内容
            KnowledgeContentEntity knowledgeContent = new KnowledgeContentEntity();
            knowledgeContent.setContent("");
            knowledgeContent.setParentId(id);
            addContentMessage(knowledgeContent);

            return "success";
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }




    /**
     * 内容列表    删除
     * */
    @DeleteMapping("/contentList")
    @ApiOperation(value = "删除某个模块列表的内容列表分支数据",notes = "示例参数以及返回内容")
    public String deleteContentListMessage(ContentListEntity contentListEntity){
        try{
            /*要进行删除前的判断*/
            KnowledgeContentEntity knowledgeContent =  knowledgeContentService.getKnowledgeContent(contentListEntity.getId());
            if(knowledgeContent != null){
                //删除某个列表对应的内容
                knowledgeContentService.deleteKnowledgeContentMessage(knowledgeContent);
            }
            contentListService.deleteContentMessage(contentListEntity);

            return "success";
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }


    /**
     * 内容列表   修改
     * */
    @PutMapping("/contentList")
    @ApiOperation(value = "修改某个模块列表的内容分支数据",notes = "示例参数以及返回内容")
    public String updateContentListMessage(@RequestBody ContentListEntity params){
        try{
            contentListService.updateContentMessage(params);
            return "success";
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }


    //////////////////#############################////////////



    /**
     * 内容  查询
     * */

    @GetMapping("/content")
    @ApiOperation(value = "获取某个内容",notes = "示例参数以及返回内容")
    @ApiImplicitParams(value = {
            //   paramType 传参方式
            @ApiImplicitParam(name = "id",value="id",required = true,dataType = "Long"),
    })
    public KnowledgeContentEntity getContent(Long id){
        try{
            return knowledgeContentService.getKnowledgeContent(id);
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return null;
    }




    /**
     * 内容    增加
     * */
    @PostMapping("/content")
    @ApiOperation(value = "给某个内容增加数据",notes = "示例参数以及返回内容")
    public String addContentMessage( @RequestBody KnowledgeContentEntity params){
        try{
            knowledgeContentService.addKnowledgeContentMessage(params);
            return "success";
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }




    /**
     * 内容    删除
     * */
    @DeleteMapping("/content")
    @ApiOperation(value = "删除某个内容数据",notes = "示例参数以及返回内容")
    public String deleteContentMessage(KnowledgeContentEntity knowledgeContentEntity){
        try{
            knowledgeContentService.deleteKnowledgeContentMessage(knowledgeContentEntity);
            return "success";
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }


    /**
     * 内容   修改
     * */
    @PutMapping("/content")
    @ApiOperation(value = "修改某个内容数据",notes = "示例参数以及返回内容")
    public String updateContentMessage(@RequestBody KnowledgeContentEntity params){
        try{
            knowledgeContentService.updateKnowledgeContentMessage(params);
            return "success";
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }



//=============================================================================


    /**
     *  TODO
     *  管理页 综合调用  ---- management
     * **/

    //获取数据列表
    @PostMapping("/management/getList")
    @ApiOperation(value="获取管理页的要管理的数据列表",notes="示例参数以及返回内容")

    public List getList(@RequestBody ManagementListEntity params){

        try {
            if(params.getLevel() == 3){
                ContentListEntity contentListEntity = new ContentListEntity();
                contentListEntity.setParentId(params.getParentId());
                return getContentList(contentListEntity);

            }else if(params.getLevel() == 2){
                ModelBranchListEntity modelBranchListEntity = new ModelBranchListEntity();
                modelBranchListEntity.setParentId(params.getParentId());
                return getModelBranchList(modelBranchListEntity);

            }else if(params.getLevel() == 1){
                ModelListEntity modelListEntity = new ModelListEntity();
                modelListEntity.setParentId(params.getParentId());
                return getModelList(modelListEntity);
            }

        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return null;

    }


    //修改的时候，获取当前内容
    @PostMapping("/management/getManagementContent")
    @ApiOperation(value="修改的时候，获取当前内容",notes="示例参数以及返回内容")

    //    parentId和当前id
    public ManagementContentEntity getManagementContent(int level,Long parentId, Long id){

        ManagementContentEntity managementContentEntity = new ManagementContentEntity();
        try {
            if(level == 1){
                //里边有parentName
                if(getKnowledgeCategory(parentId).size()>0){
                    managementContentEntity.setParentName(getKnowledgeCategory(parentId).get(0).getName());
                }

                if(id != null){
                    ModelListEntity modelListEntity = new ModelListEntity();
                    modelListEntity.setId(id);
                    //里边有当前内容
                    if(getModelList(modelListEntity).size()>0){
                        managementContentEntity.setUrl(getModelList(modelListEntity).get(0).getUrl());
                        managementContentEntity.setName(getModelList(modelListEntity).get(0).getName());
                    }
                }

            }else if(level == 2){
                ModelListEntity modelListEntity = new ModelListEntity();
                modelListEntity.setId(parentId);

                //里边有parentName
                if(getModelList(modelListEntity).size()>0){
                    managementContentEntity.setParentName(getModelList(modelListEntity).get(0).getName());
                }

                if(id != null){
                    ModelBranchListEntity modelBranchListEntity = new ModelBranchListEntity();
                    modelBranchListEntity.setId(id);
                    //里边有当前内容
                    if(getModelBranchList(modelBranchListEntity).size()>0){
                        managementContentEntity.setName(getModelBranchList(modelBranchListEntity).get(0).getName());
                        managementContentEntity.setUrl(getModelBranchList(modelBranchListEntity).get(0).getUrl());
                    }
                }



            }else if(level == 3){
                ModelBranchListEntity modelBranchListEntity = new ModelBranchListEntity();

                modelBranchListEntity.setId(parentId);
                //里边有parentName
                if(getModelBranchList(modelBranchListEntity).size()>0){
                    managementContentEntity.setParentName(getModelBranchList(modelBranchListEntity).get(0).getName());
                }

                if(id != null){
                    ContentListEntity contentListEntity = new ContentListEntity();
                    contentListEntity.setId(id);
                    //里边有当前内容
                    if(getContentList(contentListEntity).size()>0){
                        managementContentEntity.setName(getContentList(contentListEntity).get(0).getName());
                        managementContentEntity.setUrl(getContentList(contentListEntity).get(0).getUrl());
                    }
                }
            }
            return managementContentEntity;

        }catch (RuntimeException e){
            e.printStackTrace();
        }

        return  null;
    }



    //内容新增或修改 ——管理页
    /**parentId在新增的时候会用到*/
    @PostMapping("/management/addOrUpdate")
    @ApiOperation(value = "管理页的内容新增或修改",notes = "示例参数以及返回内容")
    public String ManagementAddOrUpdate(@RequestBody ManagementAddOrUpdateEntity params){

        Long id = params.getId();
        Long parentId = params.getParentId();
        String name = params.getName();
        String url = params.getUrl();
        int level = params.getLevel();

        try {
            if(id != null){
                //修改
                if(level == 1){
                    ModelListEntity modelListEntity = new ModelListEntity();
                    modelListEntity.setId(id);
                    modelListEntity.setName(name);
                    modelListEntity.setUrl(url);
                    return updateModelMessage(modelListEntity);

                }else if(level == 2){
                    ModelBranchListEntity modelBranchListEntity = new ModelBranchListEntity();
                    modelBranchListEntity.setId(id);
                    modelBranchListEntity.setName(name);
                    modelBranchListEntity.setUrl(url);
                    return updateModelBranchMessage(modelBranchListEntity);

                } else if (level == 3) {
                    ContentListEntity contentListEntity = new ContentListEntity();
                    contentListEntity.setId(id);
                    contentListEntity.setName(name);
                    contentListEntity.setUrl(url);
                    return updateContentListMessage(contentListEntity);
                }

            }else if(id  == null) {
                //新增
                if(level == 1){
                    ModelListEntity modelListEntity = new ModelListEntity();
                    modelListEntity.setParentId(parentId);
                    modelListEntity.setName(name);
                    modelListEntity.setUrl(url);
                    return addModelMessage(modelListEntity);

                }else if(level == 2){
                    ModelBranchListEntity modelBranchListEntity = new ModelBranchListEntity();
                    modelBranchListEntity.setParentId(parentId);
                    modelBranchListEntity.setName(name);
                    modelBranchListEntity.setUrl(url);
                    return addModelBranchMessage(modelBranchListEntity);


                } else if (level == 3) {
                    ContentListEntity contentListEntity  = new ContentListEntity();
                    contentListEntity.setParentId(parentId);
                    contentListEntity.setName(name);
                    contentListEntity.setUrl(url);
                    return  addContentListMessage(contentListEntity);
                }
            }
            return "error";
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return null;
    }

    //内容删除 --管理页

    @DeleteMapping("/management/managementDelete")
    @ApiOperation(value = "删除管理页的某条数据",notes = "示例参数以及返回内容")
    public String  ManagementDelete(int level,Long id){
        try {
            if(level == 1 ){
                ModelListEntity modelListEntity = new ModelListEntity();
                modelListEntity.setId(id);
                return  deleteModelMessage(modelListEntity);

            }else if (level == 2){
                ModelBranchListEntity modelBranchListEntity = new ModelBranchListEntity();
                modelBranchListEntity.setId(id);
                return deleteModelBranchMessage(modelBranchListEntity);

            } else if (level == 3) {
                ContentListEntity contentListEntity = new ContentListEntity();
                contentListEntity.setId(id);
                return deleteContentListMessage(contentListEntity);
            }
        }catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }




//=============================================================================

    @GetMapping("/getName")
    @ApiOperation(value = "连接数据库的测试",notes = "测试接口是否成功")
    public String userName(User user){
        try{
            //注册用户
            userServiceImpl.userName(user);
            return "success";
        } catch (RuntimeException e){
            e.printStackTrace();
        }
        return "error";
    }






    @GetMapping("/testEntity")
    public MyEntity testEntity(){
        return new MyEntity();
    }



    @GetMapping("/test")
    //@ApiImplicitParam(name = "m",value="m参数描述",required = false,paramType = "字符串",dataType = "名值对")

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "m",value="m参数描述",required = false,paramType = "字符串",dataType = "名值对"),
            @ApiImplicitParam(name = "n",value="n参数描述",required = true,paramType = "字符串(String)",dataType = "名值对"),

    })
    public String test(String m,String n){
        return  "test";
    }

    @PostMapping("/post")
    @ApiOperation(value = "post方法，执行数据新增操作",notes = "Swagger学习使用——处理POST请求的方法")
    public String post(@ApiParam(name = "用户名（a）",value = "新增用户时提供的用户名",required = true) String a,
                       @ApiParam(name = "密码（b）",value = "新增用户时提供的密码",required = true)String b){
        return "post";
    }


    // ApiIgnore -- 忽略当前注解描述的方法或类型，不生成api帮助文档
    @ApiIgnore
    @GetMapping("/get")
//    @RequestMapping(method = {RequestMethod.GET})
    public String get(String a, String b){
        return  "get";
    }


    @MyAnnotation4Swagger
    @RequestMapping("/req")
    public String req(String m){
        return "req";
    }
}
