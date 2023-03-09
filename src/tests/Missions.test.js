import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Missions from '../components/Missions';

describe('Tests for <Missions /> component', () => {
  const name = 'Mission 1';
  const description = 'Mission description';
  const initialState = {
    missions: [{
      mission_id: '1',
      mission_name: name,
      description,
      reserved: false,
    }, {
      mission_id: '2',
      mission_name: name,
      description,
      reserved: true,
    }],
    status: 'succeeded',
    error: '',
  };

  const missionSlice = createSlice({
    name: 'missions',
    initialState,
  });

  const store = configureStore({
    reducer: {
      missions: missionSlice.reducer,
    },
  });

  const wrapper = (component) => (
    <Provider store={store}>
      {component}
    </Provider>
  );

  it('Should render two missions', () => {
    render(wrapper(<Missions />));
    expect(screen.queryByTestId('missions-container').children.length).toBe(2);
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(wrapper(<Missions />)).toJSON()).toMatchSnapshot();
  });
});
