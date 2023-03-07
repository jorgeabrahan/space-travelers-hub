import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const rocketsUrl = 'https://api.spacexdata.com/v3/rockets';

const initialState = {
  rockets: [],
  status: 'idle',
  error: '',
};

export const fetchRockets = createAsyncThunk('rockets/fetch', () => (
  new Promise((resolve, reject) => {
    axios.get(rocketsUrl)
      .then(({ data }) => {
        const filteredData = [];
        data.forEach((rocket) => {
          filteredData.push({
            id: rocket.rocket_id,
            name: rocket.rocket_name,
            type: rocket.rocket_type,
            images: rocket.flickr_images,
            description: rocket.description,
          });
        });
        resolve(filteredData);
      })
      .catch((error) => {
        reject(error);
      });
  })
));

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRockets.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(fetchRockets.fulfilled, (state, { payload }) => ({
        ...state,
        rockets: payload,
        status: 'succeeded',
      }))
      .addCase(fetchRockets.rejected, (state, { error }) => ({
        ...state,
        error: error.message,
        status: 'failed',
      }));
  },
});

export default rocketsSlice.reducer;
