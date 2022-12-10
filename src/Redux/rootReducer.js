import { combineReducers } from '@reduxjs/toolkit'
import { dashboardReducer } from './Slice/Dashboard/DashboardSlice'




export const tayyabReducer = combineReducers({
    dashboard:dashboardReducer,
})



