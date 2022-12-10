import { createSlice } from '@reduxjs/toolkit'



const initialState ={
    stats:[],
    dateData:[],

    loading:false
}

export const dashboardSlice = createSlice({
    name:"dashboard",
    initialState,
    reducers:{
        setStats:(state,action)=>{
            state.stats = action.payload
        },
        setDateData:(state,action)=>{
            state.dateData = action.payload
        }

        // setLoading:(state,action)=>{
        //     state.loading=action.payload
        // }
    }
})

export const dashboardReducer = dashboardSlice.reducer
export const dashboardActions = dashboardSlice.actions

