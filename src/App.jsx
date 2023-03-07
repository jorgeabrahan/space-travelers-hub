import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Missions from './components/Missions';
import Rockets from './components/Rockets';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <BrowserRouter className="app-container">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Missions />} />
        <Route path="rockets" element={<Rockets />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
