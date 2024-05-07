package com.bjsxt.service;


import com.bjsxt.dao.ContentListDao;
import com.bjsxt.dao.KnowledgeContentDao;
import com.bjsxt.entity.ContentListEntity;
import com.bjsxt.entity.KnowledgeContentEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional
public class KnowledgeContentService {

    @Resource
    private KnowledgeContentDao knowledgeContentDao;

    public KnowledgeContentEntity getKnowledgeContent(Long id){
        return knowledgeContentDao.listAll(id);
    }

    public void addKnowledgeContentMessage(KnowledgeContentEntity knowledgeContentEntity){
        knowledgeContentDao.add(knowledgeContentEntity);
    }

    public void deleteKnowledgeContentMessage(KnowledgeContentEntity knowledgeContentEntity){
        knowledgeContentDao.delete(knowledgeContentEntity);
    }
    public void updateKnowledgeContentMessage(KnowledgeContentEntity knowledgeContentEntity){
        knowledgeContentDao.update(knowledgeContentEntity);
    }


}
