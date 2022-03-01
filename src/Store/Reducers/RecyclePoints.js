import { POPULATE_DATA } from "../Actions/RecyclePoints";

const initialState = {
  vendingMachines: [],
  yellowBins: [],
  greenBins: [],
  redBins: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_DATA: 
      const data = action.payload;
      let allVMS = [];
      Object.keys(data.VMS).forEach(element => {
        const temp = data.VMS[element];
        allVMS.push(temp);
      });
      let allYBNS = [];
      Object.keys(data.YBS).forEach(element => {
        const temp = data.YBS[element];
        allYBNS.push(temp);
      });
      return {vendingMachines: allVMS, yellowBins: allYBNS};
    default: 
      return state;
  }
} 
