import CONSTANTS from '../utils/constants';
const { GET_PRODUCT_LIST, GET_PRODUCT_ITEM } = CONSTANTS;

const INITIAL_STATE = {
  productList: [],
  productItem: {
    Location: {},
    Category: {}
  }
};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return {
          ...state,
          productList: action.payload
      };
    case GET_PRODUCT_ITEM:
      return {
          ...state,
          productItem: action.payload
      };
    default:
      return state;
  }
}