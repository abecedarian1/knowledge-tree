package com.bjsxt.entity;

import java.util.ArrayList;
import java.util.List;

public class KnowledgeTreeEntity {
    private Long id;
    private String label;

    private int level;

    private List<KnowledgeTreeEntity> children;




    public KnowledgeTreeEntity(){

    };

    public KnowledgeTreeEntity(Long id, String label, int level, List<KnowledgeTreeEntity> children) {
        this.id = id;
        this.label = label;
        this.level = level;
        this.children = children;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }


    public List<KnowledgeTreeEntity> getChildren() {
        return children;
    }

    public void setChildren(List<KnowledgeTreeEntity> children) {
        this.children = children;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }
}
