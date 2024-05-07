package com.bjsxt.service;

import com.bjsxt.dao.ContentListDao;
import com.bjsxt.entity.ContentListEntity;
import io.swagger.models.auth.In;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ContentListService {

    @Resource
    private ContentListDao contentListDao;

    public List<ContentListEntity> getContentList(ContentListEntity contentListEntity){

        if(contentListEntity != null){
            if(contentListEntity.getId() != null ){
                return contentListDao.singleList(contentListEntity);
            }else if (contentListEntity.getParentId() != null ){
                return contentListDao.listAll(contentListEntity);
            }
            return null;
        }
        return null;



//        return contentListDao.listAll(contentListEntity);
    }

    public Long addContentMessage(ContentListEntity contentListEntity){

        //这个接口必须调用 --返回的是一个int型的数据
        int result = contentListDao.add(contentListEntity);
        Long resultId = contentListEntity.getId();

        return  resultId;
    }


    public void deleteContentMessage(ContentListEntity contentListEntity){

        contentListDao.delete(contentListEntity);
    }
    public void updateContentMessage(ContentListEntity contentListEntity){
        contentListDao.update(contentListEntity);
    }

}
