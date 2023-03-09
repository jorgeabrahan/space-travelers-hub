import { render, screen } from '@testing-library/react';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Missions from '../components/Missions';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Rockets from '../components/Rockets';
import ErrorPage from '../components/ErrorPage';

describe('Tests for <Navbar /> component', () => {
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

  const title = 'Falcon 1';
  const titleNoSpace = title.replace(/\s/g, '');
  const descriptionR = 'Falcon description';
  const initialStateR = {
    rockets: [{
      id: '1',
      name: title,
      images: [`${titleNoSpace}.jpg`],
      description: descriptionR,
      reserved: false,
    }, {
      id: '2',
      name: title,
      images: [`${titleNoSpace}.jpg`],
      description: descriptionR,
      reserved: true,
    }],
    status: 'succeeded',
    error: '',
  };

  const rocketsSlice = createSlice({
    name: 'rockets',
    initialState: initialStateR,
  });

  const missionSlice = createSlice({
    name: 'missions',
    initialState,
  });

  const store = configureStore({
    reducer: {
      missions: missionSlice.reducer,
      rockets: rocketsSlice.reducer,
    },
  });

  const routerProvider = () => {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Navbar />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Rockets />,
          },
          {
            path: 'missions',
            element: <Missions />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ]);
    return (
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  };

  it('Testing Rockets route', () => {
    render(routerProvider(<Navbar />));
    // This is a text from Rockets component
    expect(screen.getByText('Rockets')).not.toBeNull();
  });

  it('Testing Missions route', () => {
    render(routerProvider(<Navbar />));
    // This is a text from Missions component
    expect(() => screen.getByText('Missions')).not.toBeNull();
  });

  it('Testing Profile route', () => {
    render(routerProvider(<Navbar />));
    // This is a text from Profile component
    expect(() => screen.getByText('Profile')).not.toBeNull();
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(<BrowserRouter className="app-container"><Navbar /></BrowserRouter>).toJSON()).toMatchSnapshot();
  });
});
