import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import OrdersPage from './pages/OrdersPage'
import HistoryPage from './pages/HistoryPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/dashboard" element={<DashboardPage />}></Route>
      <Route path="/dashboard/orders" element={<OrdersPage />}></Route>
      <Route path="/dashboard/history" element={<HistoryPage />}></Route>
    </Routes>
  );
}

export default App;
