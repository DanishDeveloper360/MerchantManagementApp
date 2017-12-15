import { combineEpics } from 'redux-observable';
import { values } from 'lodash';

import * as merchantsEpics from './merchants/epics';

export default combineEpics(
  ...values(merchantsEpics)
);
