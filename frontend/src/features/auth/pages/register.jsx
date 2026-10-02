import React, { useState } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { handleRegister, loading } = useAuth();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!formData.userName.trim()) nextErrors.userName = "Name is required";
    else if (formData.userName.trim().length < 2)
      nextErrors.userName = "Name must be at least 2 characters";
    if (!formData.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      nextErrors.email = "Please enter a valid email";
    if (!formData.password) nextErrors.password = "Password is required";
    else if (formData.password.length < 8)
      nextErrors.password = "Password must be at least 8 characters";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateField = (field) => {
    const value = formData[field];
    let message = "";
    if (field === "userName") {
      if (!value.trim()) message = "Name is required";
      else if (value.trim().length < 2)
        message = "Name must be at least 2 characters";
    } else if (field === "email") {
      if (!value.trim()) message = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        message = "Please enter a valid email";
    } else if (!value) message = "Password is required";
    else if (value.length < 8)
      message = "Password must be at least 8 characters";
    setErrors((current) => ({ ...current, [field]: message }));
  };

  const passwordStrength = [
    formData.password.length >= 8,
    /[A-Z]/.test(formData.password),
    /[a-z]/.test(formData.password),
    /[0-9]/.test(formData.password),
  ].filter(Boolean).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const response = await handleRegister(formData);
    if (response?.error) setErrors({ form: response.error });
    else if (response) navigate("/home");
  };

  return (
    <main className="auth-page auth-page-register">
      <section className="auth-aside" aria-label="Interviewly">
        <Link className="brand-mark" to="/login">
          <span>AI in</span>terviewly
        </Link>
        <div className="aside-copy">
          <p className="eyebrow">A BETTER WAY TO GET READY</p>
          <h2>
            Confidence is
            <br />a practiced skill.
          </h2>
          <p className="aside-note">
            Build your interview rhythm, one thoughtful answer at a time.
          </p>
        </div>
        <div className="aside-footer">
          <span className="status-dot" /> Start small. Show up ready.
        </div>
        <span className="aside-index">02 / 03</span>
      </section>
      <section className="auth-content">
        <div className="form-container">
          <p className="form-kicker">YOUR NEXT CHAPTER</p>
          <h1>Create account</h1>
          <p className="form-intro">
            Set up your space and start getting interview-ready.
          </p>
          {errors.form && (
            <p className="form-alert" role="alert">
              {errors.form}
            </p>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="userName">Your name</label>
              <input
                autoComplete="name"
                value={formData.userName}
                onChange={(e) => {
                  setFormData({ ...formData, userName: e.target.value });
                  setErrors({ ...errors, userName: "", form: "" });
                }}
                onBlur={() => validateField("userName")}
                type="text"
                name="userName"
                id="userName"
                placeholder="How should we address you?"
                aria-invalid={Boolean(errors.userName)}
                aria-describedby={errors.userName ? "name-error" : undefined}
              />
              {errors.userName && (
                <span className="field-error" id="name-error">
                  {errors.userName}
                </span>
              )}
            </div>
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
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setErrors({ ...errors, password: "", form: "" });
                  }}
                  onBlur={() => validateField("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password
                      ? "password-error password-help"
                      : "password-help"
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
              <div className="password-strength" aria-live="polite">
                <div className="strength-track" aria-hidden="true">
                  {[1, 2, 3, 4].map((level) => (
                    <span
                      key={level}
                      className={
                        passwordStrength >= level
                          ? `strength-level strength-${passwordStrength}`
                          : ""
                      }
                    />
                  ))}
                </div>
                <span
                  className={
                    passwordStrength === 4
                      ? "strength-label is-strong"
                      : "strength-label"
                  }
                >
                  {formData.password
                    ? passwordStrength === 4
                      ? "Password is strong"
                      : "Add a little more strength"
                    : "Password strength"}
                </span>
              </div>
              <p className="helper-text" id="password-help">
                Use at least 8 characters, with 1 uppercase letter and a number.
              </p>
            </div>
            <button
              type="submit"
              className="button button-primary"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
              <span aria-hidden="true">↗</span>
            </button>
          </form>
          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">
              Sign in <span aria-hidden="true">↗</span>
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
