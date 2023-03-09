/* eslint-disable import/no-extraneous-dependencies */
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Profile from '../components/Profile';

describe('Tests for <Profile /> component', () => {
  const missionsSlice = createSlice({
    name: 'missions',
    initialState: {
      missions: [{
        mission_id: '1',
        mission_name: 'Mission name',
        description: 'This mission won\'t be reserved',
        reserved: false,
      }, {
        mission_id: '2',
        mission_name: 'To reserve',
        description: 'This mission will be reserved',
        reserved: false,
      }],
      status: 'succeeded',
      error: '',
    },
    reducers: {
      reserveMissions: (state) => {
        const updatedMissions = state.missions.map((mission) => {
          if (mission.mission_name !== 'To reserve') return mission;
          return { ...mission, reserved: true };
        });
        return { ...state, missions: updatedMissions };
      },
    },
  });

  const rocketsSlice = createSlice({
    name: 'rockets',
    initialState: {
      rockets: [{
        id: '1',
        name: 'To reserve',
        images: ['rocket_name.jpg'],
        description: 'This rocket will be reserved',
        reserved: false,
      }, {
        id: '2',
        name: 'Rocket name',
        images: ['rocket_name.jpg'],
        description: 'This rocket won\'t be reserved',
        reserved: false,
      }],
      status: 'succeeded',
      error: '',
    },
    reducers: {
      reserveRocket: (state) => {
        const updatedRockets = state.rockets.map((rocket) => {
          if (rocket.name !== 'To reserve') return rocket;
          return { ...rocket, reserved: true };
        });
        return { ...state, rockets: updatedRockets };
      },
    },
  });

  const { reserveMissions } = missionsSlice.actions;
  const { reserveRocket } = rocketsSlice.actions;

  const store = configureStore({
    reducer: {
      rockets: rocketsSlice.reducer,
      missions: missionsSlice.reducer,
    },
  });

  const wrapper = (component) => <Provider store={store}>{component}</Provider>;

  it('Should render messages when there are no reserved missions and rockets', () => {
    render(wrapper(<Profile />));
    expect(screen.getByText('You have no missions reserved!')).not.toBeNull();
    expect(screen.getByText('You have no rockets reserved!')).not.toBeNull();
  });

  it('Should show the reserved rockets and missions', () => {
    store.dispatch(reserveMissions());
    store.dispatch(reserveRocket());
    render(wrapper(<Profile />));
    /* It renders the reserved mission */
    expect(screen.queryByTestId('missions-container').children.length).toBe(1);
    /* It renders the reserved rocket */
    expect(screen.queryByTestId('rockets-container').children.length).toBe(1);
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(wrapper(<Profile />)).toJSON()).toMatchSnapshot();
  });
});
