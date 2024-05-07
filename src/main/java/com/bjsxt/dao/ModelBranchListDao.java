package com.bjsxt.dao;

import com.bjsxt.entity.ModelBranchListEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper
public interface ModelBranchListDao {
    @Autowired
    List<ModelBranchListEntity> listAll(ModelBranchListEntity modelBranchListEntity);
    List<ModelBranchListEntity> singleList(ModelBranchListEntity modelBranchListEntity);

    @Autowired
    void add(ModelBranchListEntity modelBranchListEntity);

    void delete(ModelBranchListEntity modelBranchListEntity);

    void update(ModelBranchListEntity modelBranchListEntity);

}
