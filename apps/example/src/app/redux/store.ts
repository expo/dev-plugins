import { configureStore, Middleware } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import { reduxDevToolsMiddleware } from '@dev-plugins/redux/src/useReduxDevTools';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxDevToolsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
