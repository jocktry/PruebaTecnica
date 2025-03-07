import { configureStore } from '@reduxjs/toolkit';
import { fruitApi } from '../api/fruitApi';

const store = configureStore({
  reducer: {
    [fruitApi.reducerPath]: fruitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fruitApi.middleware),
});

export default store;