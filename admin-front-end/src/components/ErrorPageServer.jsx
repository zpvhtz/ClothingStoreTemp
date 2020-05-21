import React from "react";
const ErrorPageServer = () => {
  return (
    <div class="container-fluid">
      <div class="text-center">
        <div class="error mx-auto" data-text="5xx">
          5xx
        </div>
        <p class="lead text-gray-800 mb-5">Something wrong with server!!!</p>
        <p class="text-gray-500 mb-0">
          It looks like you found a glitch in the matrix...
        </p>
        <a href="/">&larr; Back to Dashboard</a>
      </div>
    </div>
  );
};

export default ErrorPageServer;
