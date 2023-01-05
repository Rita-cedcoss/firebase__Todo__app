import { configureStore } from "@reduxjs/toolkit";
import todoreducer from "./todoSlice";
const store=configureStore({
    reducer:{
          todoreducer
    }
})
export default store;