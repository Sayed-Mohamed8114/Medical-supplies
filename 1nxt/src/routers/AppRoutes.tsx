import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../pages/auth/ProtectedRoute';
import { RoleBasedRoute } from '../pages/auth/RoleBasedRoute';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';

// Lazy load protected pages (from other epics)
const DashboardPage = React.lazy(() => import('src/pages/dashboard/DashboradPage'));
const ItemsPage = React.lazy(() => import('src/pages/items/ItemsPage'));
const CategoriesPage = React.lazy(() => import('src/pages/categories/CategoriesPage'));
const SuppliersPage = React.lazy(() => import('src/pages/suppliers/SuppliersPage'));
const StockManagementPage = React.lazy(() => import('src/pages/stock/StockInPage'));
//const AlertsPage = React.lazy(() => import('src/pages/alert/alertPage'));
const AnalyticsPage = React.lazy(() => import('src/pages/analytics/AnalyticsPage'));

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <React.Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Items - Accessible by admin, manager, staff */}
            <Route
              path="/items"
              element={
                <RoleBasedRoute allowedRoles={['admin', 'manager', 'staff']}>
                  <ItemsPage />
                </RoleBasedRoute>
              }
            />
            
            {/* Categories - Accessible by admin, manager */}
            <Route
              path="/categories"
              element={
                <RoleBasedRoute allowedRoles={['admin', 'manager']}>
                  <CategoriesPage />
                </RoleBasedRoute>
              }
            />
            
            {/* Suppliers - Accessible by admin, manager, staff */}
            <Route
              path="/suppliers"
              element={
                <RoleBasedRoute allowedRoles={['admin', 'manager', 'staff']}>
                  <SuppliersPage />
                </RoleBasedRoute>
              }
            />
            
            {/* Stock Management - Accessible by admin, manager, staff */}
            <Route
              path="/stock"
              element={
                <RoleBasedRoute allowedRoles={['admin', 'manager', 'staff']}>
                  <StockManagementPage />
                </RoleBasedRoute>
              }
            />
            
           {/* {/* Alerts - Accessible by admin, manager, staff, viewer 
            <Route
              path="/alerts"
              element={
                <RoleBasedRoute allowedRoles={['admin', 'manager', 'staff', 'viewer']}>
                  <AlertsPage />
                </RoleBasedRoute>
              }
            />*/}
            
            {/* Analytics - Accessible by admin, manager, viewer */}
            <Route
              path="/analytics"
              element={
                <RoleBasedRoute allowedRoles={['admin', 'manager', 'viewer']}>
                  <AnalyticsPage />
                </RoleBasedRoute>
              }
            />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};