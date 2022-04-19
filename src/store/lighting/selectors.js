export function isLoading(state) {
  return state.lighting?.loading;
}

export function getLightingRooms(state) {
  return state.lighting?.rooms;
}