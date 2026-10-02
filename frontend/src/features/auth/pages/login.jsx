import React, { useState } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin, loading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!formData.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      nextErrors.email = "Please enter a valid email";
    if (!formData.password) nextErrors.password = "Password is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateField = (field) => {
    const value = formData[field];
    let message = "";
    if (field === "email") {
      if (!value.trim()) message = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        message = "Please enter a valid email";
    } else if (!value) message = "Password is required";
    setErrors((current) => ({ ...current, [field]: message }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const response = await handleLogin(formData);
    if (response?.error) setErrors({ form: response.error });
    else if (response) navigate("/home");
  };

  return (
    <main className="auth-page">
      <section className="auth-aside" aria-label="Interviewly">
        <Link className="brand-mark" to="/login">
          <span>AI in</span>terviewly
        </Link>
        <div className="aside-copy">
          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>
            Make every
            <br />
            answer count.
          </h2>
          <p className="aside-note">
            A little practice can change the way you show up in the room.
          </p>
        </div>
        <div className="aside-footer">
          <span className="status-dot" /> A clearer path to your next role
        </div>
        <span className="aside-index">01 / 03</span>
      </section>
      <section className="auth-content">
        <div className="form-container">
          <p className="form-kicker">WELCOME BACK</p>
          <h1>Sign in</h1>
          <p className="form-intro">Pick up where your preparation left off.</p>
          {errors.form && (
            <p className="form-alert" role="alert">
              {errors.form}
            </p>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input
                autoComplete="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors({ ...errors, email: "", form: "" });
                }}
                onBlur={() => validateField("email")}
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span className="field-error" id="email-error">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-control">
                <input
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setErrors({ ...errors, password: "", form: "" });
                  }}
                  onBlur={() => validateField("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />
                <button
                  className="visibility-toggle"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
              {errors.password && (
                <span className="field-error" id="password-error">
                  {errors.password}
                </span>
              )}
            </div>
            <button
              className="button button-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
              <span aria-hidden="true">↗</span>
            </button>
          </form>
          <p className="auth-switch">
            New to Interviewly?{" "}
            <Link to="/register">
              Create an account <span aria-hidden="true">↗</span>
            </Link>
          </p>
        </div>
        <p className="content-footnote">
          PRACTICE WITH PURPOSE <span>·</span> GROW WITH CONFIDENCE
        </p>
      </section>
    </main>
  );
}
