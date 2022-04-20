export function isLoading(state) {
  return state.lighting?.loading;
}

export function getLightingRooms(state) {
  return state.lighting?.rooms;
}

export function getRoomByName(state, roomName) {
  return state.rooms?.filter((r) => r.room.friendlyName === roomName)[0];
}
