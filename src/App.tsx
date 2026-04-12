import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';
import Login from './pages/Login';
import Layout from './pages/Layout';
import TodayStaff from './pages/TodayStaff';
import TodayTicket from './pages/TodayTicket';
import Ticket from './pages/Ticket';
import Customer from './pages/Customer';
import Performance from './pages/Performance';
import Report from './pages/Report';
import Setting from './pages/Setting';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/today-staff" replace />} />
              <Route path="today-staff" element={<TodayStaff />} />
              <Route path="today-ticket" element={<TodayTicket />} />
              <Route path="ticket" element={<Ticket />} />
              <Route path="customer" element={<Customer />} />
              <Route path="performance" element={<Performance />} />
              <Route path="report" element={<Report />} />
              <Route path="setting" element={<Setting />} />
              <Route path="/*" element={<><h3>Not Found</h3></>} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;