import * as uuid from "uuid";

class Category {

  constructor() {
  }

  /*constructor(id,name) {
      this.id = id;
      this.name = name;
  }*/

  id = uuid.v4()

  name = "Category name";

}

export default Category;