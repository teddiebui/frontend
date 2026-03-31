import { BrowserRouter, Route, Routes } from 'react-router';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';
import Login from './pages/Login';
import Layout from './pages/Layout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<><h3>Dashboard</h3></>} />
              
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