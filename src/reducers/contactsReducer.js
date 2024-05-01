const initialState = {
    contacts: [],
    isLoading: false,
  };
  
  const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CONTACTS':
        return {
          ...state,
          contacts: action.payload,
        };
      case 'SET_LOADING':
        return {
          ...state,
          isLoading: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default contactsReducer;
  