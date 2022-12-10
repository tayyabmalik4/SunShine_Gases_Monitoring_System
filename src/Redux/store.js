import { configureStore } from '@reduxjs/toolkit';
import { tayyabReducer } from './rootReducer';

export const store = configureStore({ 
    reducer: tayyabReducer
});
