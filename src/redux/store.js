import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import favoriteReducer from "./features/tasks/favoriteSlice";
import taskReducer from "./features/tasks/taskSlice";
import productsReducer from "../redux/features/products/productsSlice";
import authReducer from "../redux/features/auth/authSlice";
import cartReducer from "../redux/features/cart/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  favorites: favoriteReducer,
  tasks: taskReducer,
  products: productsReducer,
  auth: authReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
