import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import favoriteReducer from './features/tasks/favoriteSlice';
import taskReducer from './features/tasks/taskSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  favorites: favoriteReducer,
  tasks: taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
