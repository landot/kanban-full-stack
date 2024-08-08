import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook } from "react-redux";
import kanbanReducer from "../src/features/kanban/kanbanSlice";
import { useSelector as useReduxSelector} from 'react-redux';

export const store = configureStore({
  reducer: {
    kanban: kanbanReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

