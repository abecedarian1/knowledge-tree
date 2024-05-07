package com.bjsxt.service;


import com.bjsxt.dao.ModelBranchListDao;
import com.bjsxt.entity.ModelBranchListEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional
public class ModelBranchListService {

    @Resource
    private ModelBranchListDao modelBranchListDao;

    public List<ModelBranchListEntity> getModelBranchList(ModelBranchListEntity modelBranchListEntity){
        if(modelBranchListEntity != null){
            if(modelBranchListEntity.getId() != null){
                return modelBranchListDao.singleList(modelBranchListEntity);
            }else if (modelBranchListEntity.getParentId() != null ){
                return modelBranchListDao.listAll(modelBranchListEntity);
            }
            return null;
        }
        return null;


        //return modelBranchListDao.listAll(modelBranchListEntity);
    }

    public void addModelBranchMessage(ModelBranchListEntity modelBranchListEntity){
        modelBranchListDao.add(modelBranchListEntity);
    }

    public void deleteModelBranchMessage(ModelBranchListEntity modelBranchListEntity){
        modelBranchListDao.delete(modelBranchListEntity);
    }
    public void updateModelBranchMessage(ModelBranchListEntity modelBranchListEntity){
        modelBranchListDao.update(modelBranchListEntity);
    }


}
