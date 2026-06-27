import { Route, Routes } from "react-router-dom";
import DashboradPage from "./pages/dashboard/DashboradPage";
import SuppliersPage from "./pages/suppliers/SuppliersPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import SettingPage from "./pages/settings/SettingPage";
import LoginPage from "./pages/auth/LoginPage";
import ItemsPage from "./pages/items/ItemsPage";

import StockInPage from "./pages/stock/StockInPage";
import StockOutPage from "./pages/stock/StockOutPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import NewSupplier from "./pages/new-supplier/NewSupplier";
import NewCategory from "./pages/new-category/newCategory";


import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboradPage />} />
      <Route path="/item" element={<ItemsPage />} />
      <Route path="/supplier" element={<SuppliersPage />} />
      <Route path="/supplier/new" element={<NewSupplier />} />
      <Route path="/category" element={<CategoriesPage />} />
      <Route path="/category/new" element={<NewCategory />} />
      <Route path="/stock-in" element={<StockInPage />} />
      <Route path="/stock-out" element={<StockOutPage />} />
      <Route path="/setting" element={<SettingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/analytic" element={<AnalyticsPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
};

export default App;
