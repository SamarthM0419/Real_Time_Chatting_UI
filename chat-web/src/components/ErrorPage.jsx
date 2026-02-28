import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const errorConfig = {
  401: {
    title: "Unauthorized",
    description: "You need to log in to continue.",
    color: "text-warning",
  },
  403: {
    title: "Access Denied",
    description: "You don’t have permission to access this page.",
    color: "text-error",
  },
  404: {
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
    color: "text-primary",
  },
  500: {
    title: "Internal Server Error",
    description: "Something went wrong on our side.",
    color: "text-error",
  },
};

const ErrorPage = ({ code = 404 }) => {
  const navigate = useNavigate();
  const error = errorConfig[code] || errorConfig[404];

  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    if (code === 401) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const redirect = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirect);
      };
    }
  }, [code, navigate]);

  const handlePrimaryAction = () => {
    if (code === 403 || code === 500) {
      navigate(-1);
    } else if (code === 404) {
      navigate("/");
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-base-300 to-base-200 px-4 relative overflow-hidden"
    >
      <div className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-96 h-96 bg-secondary/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      <div
        className="card w-full max-w-lg bg-base-100/80 backdrop-blur-md shadow-2xl 
                      border border-base-300 rounded-3xl text-center p-10 space-y-6 relative z-10"
      >
        <h1 className={`text-8xl font-extrabold ${error.color}`}>{code}</h1>

        <h2 className="text-2xl font-bold">{error.title}</h2>

        <p className="text-base-content/70">{error.description}</p>

        {code === 401 && (
          <p className="text-sm text-base-content/60">
            Redirecting to login in {countdown}s...
          </p>
        )}

        <div className="flex justify-center gap-4 pt-4 flex-wrap">
          {(code === 403 || code === 500) && (
            <button
              onClick={handlePrimaryAction}
              className="btn btn-outline hover:scale-105 transition"
            >
              Go Back
            </button>
          )}

          {code === 404 && (
            <button
              onClick={handlePrimaryAction}
              className="btn btn-primary hover:scale-105 transition"
            >
              Go Home
            </button>
          )}

          {code === 500 && (
            <button
              onClick={handleRetry}
              className="btn btn-error hover:scale-105 transition"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
