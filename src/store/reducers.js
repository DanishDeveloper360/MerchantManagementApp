import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth/reducer';
import merchants from './merchants/reducer';

export default combineReducers({
  auth,
  merchants,
  routing: routerReducer,
});
