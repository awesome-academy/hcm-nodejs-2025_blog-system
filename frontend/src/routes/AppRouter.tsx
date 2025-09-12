import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

// layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// auth pages
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

// guest/user/author pages
import HomePage from "../pages/shared/HomePage";
import BlogList from "../pages/blog/BlogList";
import BlogDetail from "../pages/blog/BlogDetail";
import AuthorPost from "../pages/author/AuthorPost";
import Profile from "../pages/shared/Profile";
// admin pages
import UserManagement from "../pages/admin/UserManagement";
import PostManagement from "../pages/admin/PostManagement";

import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Auth routes (không có layout) */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Main layout (guest, user, author) */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/author/posts"
              element={
                <ProtectedRoute requiredRole="author">
                  <AuthorPost />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Admin layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="users" element={<UserManagement />} />
            <Route path="posts" element={<PostManagement />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AppRouter;
