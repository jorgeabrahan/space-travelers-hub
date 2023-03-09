/* eslint-disable import/no-extraneous-dependencies */
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Rockets from '../components/Rockets';

describe('Tests for <Rockets /> component', () => {
  const title = 'Falcon 1';
  const titleNoSpace = title.replace(/\s/g, '');
  const description = 'Falcon description';
  const initialState = {
    rockets: [{
      id: '1',
      name: title,
      images: [`${titleNoSpace}.jpg`],
      description,
      reserved: false,
    }, {
      id: '2',
      name: title,
      images: [`${titleNoSpace}.jpg`],
      description,
      reserved: true,
    }],
    status: 'succeeded',
    error: '',
  };

  const rocketsSlice = createSlice({
    name: 'rockets',
    initialState,
  });

  const store = configureStore({
    reducer: {
      rockets: rocketsSlice.reducer,
    },
  });

  const wrapper = (component) => (
    <Provider store={store}>
      {component}
    </Provider>
  );

  it('Should render two rockets', () => {
    render(wrapper(<Rockets />));
    expect(screen.queryByTestId('rockets-container').children.length).toBe(2);
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(wrapper(<Rockets />)).toJSON()).toMatchSnapshot();
  });
});
