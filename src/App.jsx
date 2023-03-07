import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Missions from './components/Missions';
import Rockets from './components/Rockets';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import ErrorPage from './components/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Missions />,
      },
      {
        path: 'missions',
        element: <Missions />,
      },
      {
        path: 'rockets',
        element: <Rockets />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
