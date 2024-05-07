package com.bjsxt.entity;

public class ModelListEntity {

    private Long id;
    private String name;
    private String url;
    private Long parentId;

    public ModelListEntity(){

    }
    public ModelListEntity(Long id, String name, String url, Long parentId) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.parentId = parentId;
    }

    public Long getId() {

        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
