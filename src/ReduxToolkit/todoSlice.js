import { createSlice } from "@reduxjs/toolkit"

let initialState={
    todoarr:[],
}

export const todoDataSlice=createSlice({
    name:"todoapp",
    initialState,
    reducers: {
        todoData:(state,action)=>{
            state.todoarr=[...state.todoarr,action.payload]
            // console.log(action.payload)
        }
    }
})
export const {todoData}=todoDataSlice.actions

export default todoDataSlice.reducer