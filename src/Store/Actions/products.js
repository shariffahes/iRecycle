export const ADD_PRODUCTS = 'add-products';
export const POPULATE_PRODUCTS = 'populate-products';

export const fetchProducts = () => {
  return async (dispatch) => {
    try{
        const response = await fetch('https://irecycle-fa7d5-default-rtdb.europe-west1.firebasedatabase.app/products.json');
      const data = await response.json();
      dispatch({type: POPULATE_PRODUCTS, allProducts: data});
    } catch(error) {
      console.log(error);
    }
  }
}