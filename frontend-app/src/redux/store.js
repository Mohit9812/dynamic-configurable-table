import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tableReducer from './tableSlice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'table',
  storage,
  whitelist: ['visibleColumns'], // Persist only visibleColumns
};

const persistedReducer = persistReducer(persistConfig, tableReducer);

const store = configureStore({
  reducer: {
    table: persistedReducer, // Ensure the reducer is assigned to the `table` key
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
