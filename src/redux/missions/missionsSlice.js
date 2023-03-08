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
            reserved: false,
          };
          return nArray.push(nMission);
        });
        resolve(nArray);
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
  reducers: {
    bookMission: (state, { payload }) => {
      const bookMissions = state.missions.map((mission) => {
        if (mission.mission_id !== payload) return mission;
        return { ...mission, reserved: true };
      });
      return { ...state, missions: bookMissions };
    },
    leaveMission: (state, { payload }) => {
      const bookMissions = state.missions.map((mission) => {
        if (mission.mission_id !== payload) return mission;
        return { ...mission, reserved: false };
      });
      return { ...state, missions: bookMissions };
    },
  },
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

export const { bookMission, leaveMission } = missionsSlice.actions;

export default missionsSlice.reducer;
