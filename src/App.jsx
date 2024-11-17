import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import AdminDashboard from './admin/AdminDashboard';
import ProductShowcaseWrapper from './components/Products';
import MagicalToaster from './components/MagicalToaster';


function App() {
  return (
    <>
    <Routes>
      <Route path="/*" element={<Main />} />
      <Route path='/admin/*' element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    <MagicalToaster />
    </>
  );
}

export default App;
