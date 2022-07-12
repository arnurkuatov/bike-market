import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BikeDataService from "../../services/BikeService";

const initialState = [];

export const createBike = createAsyncThunk(
    "bike/create",
    async ({ name, price }) => {
        const res = await BikeDataService.create({ name, price });
        return res.data;
    }
);

export const retrieveBike = createAsyncThunk(
    "bike/retrieve",
    async () => {
        const res = await BikeDataService.getAll();
        return res.data;
    }
);

export const updateBike = createAsyncThunk(
    "bike/update",
    async ({ id, data }) => {
        const res = await BikeDataService.update(id, data);
        return res.data;
    }
);

export const deleteBike = createAsyncThunk(
    "bike/delete",
    async ({ id }) => {
        await BikeDataService.remove(id);
        return { id };
    }
);


export const findBikeByTitle = createAsyncThunk(
    "bike/findByTitle",
    async ({ title }) => {
        const res = await BikeDataService.findByTitle(title);
        return res.data;
    }
);

const bikeSlice = createSlice({
    name: "bike",
    initialState,
    extraReducers: {
        [createBike.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [retrieveBike.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [updateBike.fulfilled]: (state, action) => {
            const index = state.findIndex(item => item.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
        [deleteBike.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(index, 1);
        },
        [findBikeByTitle.fulfilled]: (state, action) => {
            return [...action.payload];
        },
    },
});

const { reducer } = bikeSlice;
export default reducer;