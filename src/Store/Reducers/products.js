import { ADD_PRODUCTS, POPULATE_PRODUCTS } from "../Actions/products"

const initialState = {
  products: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_PRODUCTS: 
      let products = [];
      for(const [key, value] of Object.entries(action.allProducts)) {
        products.push({prodId: key, name: value.name, dollarPerPoint: value.pointExchange, price: value.price});
      }
      return {products}
    case ADD_PRODUCTS:
      return {products: [...state.products, action.product]}
    default: 
      return state;
  };
}