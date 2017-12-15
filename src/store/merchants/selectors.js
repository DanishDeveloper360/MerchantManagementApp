export function getParams(state) {
  return state.merchants.params;
}

export function getMerchant(state, id) {
  return state.merchants.byId[id];
}

export function getMerchants(state) {
  return Object.values(state.merchants.byId);
}
