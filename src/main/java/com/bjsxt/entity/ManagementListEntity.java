package com.bjsxt.entity;

public class ManagementListEntity {
    private  int level;
    private Long parentId;


    public ManagementListEntity(){

    }
    public ManagementListEntity(int level, Long parentId) {
        this.level = level;
        this.parentId = parentId;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }
}
