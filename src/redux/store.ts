import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import readlistReducer from "./features/readlist/readlistSlice";
import { api } from "./api/apiSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    wishlist: wishlistReducer,
    readlist: readlistReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;