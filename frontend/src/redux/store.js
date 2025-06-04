import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import thunk from 'redux-thunk';
import storage from './storage';
import authReducer from './reducers/auth.slice';
import studentReducer from './reducers/student.slice';
import groupReducer from './reducers/group.slice';
import pitchReducer from './reducers/pitch.slice';
import inboxReducer from './reducers/chat.slice';
import transactionReducer from './reducers/transactions.slice';
// import chatReducer from '../chat-src/redux/slices/chat';



const reducers = combineReducers({
  auth: authReducer,
  student: studentReducer,
  group: groupReducer,
  pitch:pitchReducer,
  // chat: chatReducer,
  inbox: inboxReducer,
  transaction: transactionReducer
});

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});


export default store;
