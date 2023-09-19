import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  mapServiceLayer: false,
  geojson: false,
  WMS: false,
};

const mapLayersSlice = createSlice({
  name: 'mapLayers',
  initialState,
  reducers: {
    toggleLayer(state, action) {
      const {layerName} = action.payload;
      state[layerName] = !state[layerName];
    },
  },
});

export const {toggleLayer} = mapLayersSlice.actions;

export default mapLayersSlice.reducer;
