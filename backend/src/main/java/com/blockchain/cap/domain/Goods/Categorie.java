package com.blockchain.cap.domain.Goods;

public enum Categorie {

    Jacket("야구잠바"),
    Food("음식");

    private String name;

    Categorie(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
