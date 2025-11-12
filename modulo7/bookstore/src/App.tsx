import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './contexts/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BooksPage from './pages/BooksPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import PrivateRoutes from './components/PrivateRoutes';
import PublicRoutes from './components/PublicRoutes';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
              <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />
              <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
              <Route path="/books" element={<PrivateRoutes><BooksPage /></PrivateRoutes>} />
              <Route path="/addbook" element={<PrivateRoutes><AddBook /></PrivateRoutes>} />
              <Route path="/editbook" element={<PrivateRoutes><EditBook /></PrivateRoutes>} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
