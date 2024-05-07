package com.bjsxt.service;

import com.bjsxt.dao.KnowledgeCategoryDao;
import com.bjsxt.entity.KnowledgeCategoryEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
@Service
@Transactional
public class KnowledgeCategoryService {

    @Resource
    private KnowledgeCategoryDao knowledgeCategoryDao;

    //返回的是一个数组
    public List<KnowledgeCategoryEntity> getKnowledgeCategory(Long id){
        if(id!=null){
            return knowledgeCategoryDao.singleList(id);
        }else {
            return knowledgeCategoryDao.listAll();
        }

    }
}
