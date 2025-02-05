import { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import UploadFilePage from './pages/UploadFilePage';
import OverviewPage from './pages/OverviewPage';
import ProductsPage from './pages/ProductsPage';
import UsersPage from "./pages/UsersPage.jsx";
import SalesPage from "./pages/SalesPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
// import MagasinPage from './pages/MagasinPage';

function App() {
  const [isDataUploaded, setIsDataUploaded] = useState(false);
  const navigate = useNavigate();

  const handleUploadSuccess = () => {
    setIsDataUploaded(true);
    navigate('/overview');
    // Optionnel : Stocker dans localStorage
    localStorage.setItem('hasUploaded', 'true');
  };

  // Vérifier le localStorage au chargement
  useState(() => {
    if (localStorage.getItem('hasUploaded') === 'true') {
      setIsDataUploaded(true);
    }
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-gray-100">
      {!isDataUploaded ? (
        <UploadFilePage onUploadSuccess={handleUploadSuccess} />
      ) : (
        <div className="flex h-full">
          <Sidebar />

          <div className="flex-1 overflow-auto p-8">
            <Routes>
              <Route path="/" element={<UploadFilePage />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/*<Route path="/magasin" element={<MagasinPage />} />*/}
              <Route path="*" element={<Navigate to="/overview" />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;