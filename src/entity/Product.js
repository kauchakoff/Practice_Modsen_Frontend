import Big from 'big.js';
import * as uuid from "uuid";

class Product {

    constructor() {
    }

    /*constructor(id,category,name,ingredients,description,price,weight,caloricValue) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.ingredients = ingredients;
        this.description = description;
        this.price = price;
        this.weight = weight;
        this.caloricValue = caloricValue;
    }*/

    id = 1;

    categoryId = 1;

    name = "Pizza Peperoni";

    ingredients = "cheese mozzarella,tomato sauce,peperoni,basil";

    price = new Big(7.99);

    description = "Pepperoni is an American variety of salami, made from cured pork and beef seasoned with paprika or other chili pepper. Pepperoni is characteristically soft, slightly smoky, and bright red. Thinly sliced pepperoni is a popular pizza topping in American pizzerias.";

    weight = 500;

    caloricValue = 256;

}

export default Product;