package com.bjsxt.entity;

public class KnowledgeContentEntity {

    private Long id;
    private String content;
    private Long parentId;

    public  KnowledgeContentEntity(){
    };
    public KnowledgeContentEntity(Long id, String content, Long parentId) {
        this.id = id;
        this.content = content;
        this.parentId = parentId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }
}
