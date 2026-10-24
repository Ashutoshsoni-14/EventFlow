
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import SeatSelection from './pages/SeatSelection';
import Checkout from './pages/Checkout';
import BookingResult from './pages/BookingResult';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

import { AuthProvider } from './context/AuthContext';

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#080b14] text-slate-100">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetails />} />

          <Route
            path="/seats/:eventId"
            element={<SeatSelection />}
          />

          <Route path="/checkout" element={<Checkout />} />

          <Route
            path="/booking-result/:bookingId"
            element={<BookingResult />}
          />

          <Route path="/my-bookings" element={<MyBookings />} />

          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}
