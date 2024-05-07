package com.bjsxt.dao;

import com.bjsxt.entity.ModelListEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
@Mapper
public interface ModelListDao {

    @Autowired
    List<ModelListEntity> listAll(ModelListEntity modelListEntity);

    List<ModelListEntity> singleList(ModelListEntity modelListEntity);

    @Autowired
    void add(ModelListEntity modelListEntity);

    void delete(ModelListEntity modelListEntity);

    void update(ModelListEntity modelListEntity);
}
