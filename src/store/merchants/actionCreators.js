import { keyBy } from 'lodash';
import * as actionTypes from './actionTypes';

export function fetchMerchant(payload) {
  return {type: actionTypes.MERCHANT_FETCH_ONE, payload};
}

export function fetchMerchantSuccess(payload) {
  const byId = {[payload.id]: payload};
  return {type: actionTypes.MERCHANT_FETCH_ONE_SUCCESS, payload: {byId}};
}

export function fetchMerchants(payload) {
  return {type: actionTypes.MERCHANT_FETCH_COLLECTION, payload};
}

export function fetchMerchantsSuccess(merchants, params) {
  const byId = keyBy(merchants, (merchant) => merchant.id);
  return {type: actionTypes.MERCHANT_FETCH_COLLECTION_SUCCESS, payload: {byId, params}};
}

export function createMerchant(payload) {
  return {type: actionTypes.MERCHANT_CREATE, payload};
}

export function createMerchantSuccess(payload) {
  return {type: actionTypes.MERCHANT_CREATE_SUCCESS, payload};
}

export function updateMerchant(payload) {
  return {type: actionTypes.MERCHANT_UPDATE, payload};
}

export function updateMerchantSuccess(payload) {
  return {type: actionTypes.MERCHANT_UPDATE_SUCCESS, payload};
}

export function deleteMerchant(payload) {
  return {type: actionTypes.MERCHANT_DELETE, payload};
}

export function deleteMerchantSuccess(payload) {
  return {type: actionTypes.MERCHANT_DELETE_SUCCESS, payload};
}
