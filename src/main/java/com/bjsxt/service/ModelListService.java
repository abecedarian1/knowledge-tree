package com.bjsxt.service;

import com.bjsxt.dao.ModelListDao;
import com.bjsxt.entity.ModelListEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
@Service
@Transactional
public class ModelListService {

    @Resource
    private ModelListDao modelListDao;

    public List<ModelListEntity> getModelListList(ModelListEntity modelListEntity){
        if(modelListEntity != null){
            if(modelListEntity.getId() != null ){
                return modelListDao.singleList(modelListEntity);
            }else if (modelListEntity.getParentId() != null ){
                return modelListDao.listAll(modelListEntity);
            }
            return null;
        }
        return null;
    }

    public void addModelMessage(ModelListEntity modelListEntity){
        modelListDao.add(modelListEntity);
    }
    public void deleteModelMessage(ModelListEntity modelListEntity){
        modelListDao.delete(modelListEntity);
    }
    public void updateModelMessage(ModelListEntity modelListEntity){
        modelListDao.update(modelListEntity);
    }

}
