import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from '../action/index';

const initialUser = JSON.parse(localStorage.getItem('currentUser')) || null;

const userReducer = (state = initialUser, action) => {
  switch (action?.type) {
    case SET_CURRENT_USER:
      console.log(' Set current user:', action?.payload);
      localStorage.setItem('currentUser', JSON.stringify(action?.payload));
      return action?.payload;

    case CLEAR_CURRENT_USER:
      console.log(" Clearing current user");
      localStorage.removeItem('currentUser');
      return null;

    default:
      return state;
  }
};

export default userReducer;
