package com.bjsxt.dao;

import com.bjsxt.entity.ContentListEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper
public interface ContentListDao {
    @Autowired
    List<ContentListEntity> listAll(ContentListEntity contentListEntity);

    List<ContentListEntity> singleList(ContentListEntity contentListEntity);

    @Autowired
    int add(ContentListEntity contentListEntity);

    void delete(ContentListEntity contentListEntity);

    void update(ContentListEntity contentListEntity);

}
