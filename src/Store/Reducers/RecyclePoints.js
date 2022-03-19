import { POPULATE_DATA } from "../Actions/RecyclePoints";

const initialState = {
  vendingMachines: [],
  yellowBins: [],
  greenBins: [],
  redBins: [],
  blueBins: []
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
      let allGreenBins = [];
      Object.keys(data.GBS).forEach(element => {
        const temp = data.GBS[element];
        allGreenBins.push(temp);
      });
      let allRedBins = [];
      Object.keys(data.RBS).forEach(element => {
        const temp = data.RBS[element];
        allRedBins.push(temp);
      });
      let allBlueBins = [];
      Object.keys(data.BBS).forEach(element => {
        const temp = data.BBS[element];
        allBlueBins.push(temp);
      });
      return {vendingMachines: allVMS, yellowBins: allYBNS, greenBins: allGreenBins, redBins: allRedBins, blueBins: allBlueBins};
    default: 
      return state;
  }
} 
