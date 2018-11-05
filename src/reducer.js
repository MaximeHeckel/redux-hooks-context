export const initialState = {
  data: null
};

const reducer = (state, action) => {
  const reduced = { ...state };
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...reduced,
        data: action.payload
      };
    case "RESET_DATA":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
