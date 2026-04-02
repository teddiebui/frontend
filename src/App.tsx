import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';
import Login from './pages/Login';
import Layout from './pages/Layout';
import TodayStaff from './pages/TodayStaff';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/today-staff" replace />} />
              <Route path="today-staff" element={<TodayStaff />} />
              <Route path="/*" element={<><h3>Not Found</h3></>} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;