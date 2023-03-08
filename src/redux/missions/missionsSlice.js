import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const missionsFetchAPI = createAsyncThunk('missions/fetch', () => (
  new Promise((resolve, reject) => {
    axios.get('https://api.spacexdata.com/v3/missions')
      .then(({ data }) => {
        const nArray = [];
        data.map((mission) => {
          const nMission = {
            mission_id: mission.mission_id,
            mission_name: mission.mission_name,
            description: mission.description,
          };

          console.log(nMission);
          return nArray.push(nMission);
        });
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  })
));

const initialState = {
  missions: [],
  status: 'idle',
  error: '',
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(missionsFetchAPI.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(missionsFetchAPI.fulfilled, (state, { payload }) => ({
        ...state,
        missions: payload,
        status: 'succeeded',
      }))
      .addCase(missionsFetchAPI.rejected, (state, { error }) => ({
        ...state,
        error: error.message,
        status: 'failed',
      }));
  },
});

export default missionsSlice.reducer;
