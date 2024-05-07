package com.bjsxt.entity;

public class ManagementContentEntity {

    private  String parentName;
    private  String name;
    private  String url;


    public ManagementContentEntity(){

    };
    public ManagementContentEntity(String parentName, String name, String url) {
        this.parentName = parentName;
        this.name = name;
        this.url = url;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
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
}





