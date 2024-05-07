package com.bjsxt.dao;


import com.bjsxt.entity.KnowledgeContentEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper
public interface KnowledgeContentDao {

    @Autowired
    KnowledgeContentEntity listAll(Long id);

    @Autowired
    void add(KnowledgeContentEntity knowledgeContentEntity);

    void delete(KnowledgeContentEntity knowledgeContentEntity);

    void update(KnowledgeContentEntity knowledgeContentEntity);

}
