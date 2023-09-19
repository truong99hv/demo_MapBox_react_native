import {configureStore} from '@reduxjs/toolkit';
import mapLayersReducer from './src/features/mapLayers/mapLayersSlice';

export default configureStore({
  reducer: {
    mapLayers: mapLayersReducer,
  },
});
