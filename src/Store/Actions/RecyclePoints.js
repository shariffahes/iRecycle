import { baseFireBaseURL } from "../../constants/Constants";
export const POPULATE_DATA = 'populate_data';

export const PopulateData = () => {
  return async (dispatch) => {
    const response = await fetch(baseFireBaseURL+'/recycle-areas.json');
    if(response.status !== 200) {
      console.log('err',response.message);
      //TODO:Error add
      return;
    }
    const responsJSON = await response.json();
    dispatch({type: POPULATE_DATA, payload: responsJSON});
  }
}
