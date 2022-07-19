const initState = {
  user: undefined,
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "Add_User":
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default userReducer;
