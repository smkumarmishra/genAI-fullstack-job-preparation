import React from "react";
import { useAuth } from "../hook/useAuth";
import { Navigate } from "react-router";

export default function UserProtected({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main
        className="auth-loading-screen"
        role="status"
        aria-label="Loading your account"
        aria-live="polite"
      >
        <div className="auth-loader" aria-hidden="true">
          <span className="auth-loader__orbit auth-loader__orbit--outer" />
          <span className="auth-loader__orbit auth-loader__orbit--inner" />
          <span className="auth-loader__core" />
        </div>
      </main>
    );
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
}
