package com.bjsxt.dao;

import com.bjsxt.entity.KnowledgeCategoryEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
@Mapper
public interface KnowledgeCategoryDao {
    @Autowired
    List<KnowledgeCategoryEntity> listAll();
    List<KnowledgeCategoryEntity> singleList(Long id);

}
