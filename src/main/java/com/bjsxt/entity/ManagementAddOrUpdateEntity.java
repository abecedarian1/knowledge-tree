package com.bjsxt.entity;

public class ManagementAddOrUpdateEntity {

    private int level;
    private String name;
    private String url;
    private Long parentId;
    private Long id;

    public  ManagementAddOrUpdateEntity(){

    }
    public ManagementAddOrUpdateEntity(int level, String name, String url, Long parentId, Long id) {
        this.level = level;
        this.name = name;
        this.url = url;
        this.parentId = parentId;
        this.id = id;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
