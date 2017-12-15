import { keyBy } from 'lodash';
import axios from 'axios';
import querystring from 'querystring';
import { Observable } from 'rxjs/Observable';
import { push } from 'react-router-redux';

import * as actionTypes from './actionTypes';
import * as merchantsActions from './actionCreators';

export function fetchMerchant(action$) {
  return action$.ofType(actionTypes.MERCHANT_FETCH_ONE)
    .map(action => action.payload)
    .switchMap(id => {
      return Observable.fromPromise(
        axios.get(`http://localhost:8081/merchants/${id}`)
      ).map(res => merchantsActions.fetchMerchantSuccess(res.data));
    });
}

export function fetchMerchants(action$) {
  return action$.ofType(actionTypes.MERCHANT_FETCH_COLLECTION)
    .map(action => action.payload)
    .switchMap(params => {
      return Observable.fromPromise(
        axios.get(`http://localhost:8081/merchants?${querystring.stringify(params)}`)
      ).map(res => merchantsActions.fetchMerchantsSuccess(res.data, params));
    });
}

export function updateMerchant(action$) {
  return action$.ofType(actionTypes.MERCHANT_UPDATE)
    .map(action => action.payload)
    .switchMap(merchant => {
      return Observable.merge(
        Observable.fromPromise(
          axios.put(`http://localhost:8081/merchants/${merchant.id}`, merchant)
        ).map(res => merchantsActions.updateMerchantSuccess(res.data)),
        Observable.of(push('/merchants'))
      );
    });
}

export function createMerchant(action$) {
  return action$.ofType(actionTypes.MERCHANT_CREATE)
    .map(action => action.payload)
    .switchMap(merchant => {
      return Observable.merge(
        Observable.fromPromise(
          axios.post(`http://localhost:8081/merchants`, merchant)
        ).map(res => merchantsActions.createMerchantSuccess(res.data)),
        Observable.of(push('/merchants'))
      );
    });
}

export function deleteMerchant(action$) {
  return action$.ofType(actionTypes.MERCHANT_DELETE)
    .map(action => action.payload)
    .switchMap(merchant => {
      return Observable.fromPromise(
        axios.delete(`http://localhost:8081/merchants/${merchant.id}`)
      ).map(res => merchantsActions.deleteMerchantSuccess(merchant));
    });
}
