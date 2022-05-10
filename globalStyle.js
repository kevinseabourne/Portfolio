import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: "FuturaStd-Heavy", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  color: #f5f5eb;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: 2px;
  line-height: 1.4;
  height: 100vh;
  scroll-snap-type: y mandatory;
}


code {
  font-family: "Source Sans Pro", source-code-pro, Menlo, Monaco, Consolas,
    "Courier New", monospace;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 0;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  transition: background-color 5000s ease-in-out 0s;
  width: 100% !important;
}

/* Error Message Styling */

.Toastify__toast-container {
  width: 225px !important;
}

.Toastify__toast {
  min-height: 50px !important;
  font-family: "Roboto" !important;
  font-weight: 600 !important;
  border-radius: 7px !important;
  text-align: center;
}

.Toastify__toast--success {
  background-color: #18d047 !important;
}

.Toastify__toast--error {
  background-color: #ec5b5b !important;
}

.Toastify__progress-bar {
  height: 3.2px !important;
  border-top-right-radius: 200px;
  border-bottom-right-radius: 200px;
  background-image: linear-gradient(
    115deg,
    #4fcf70,
    #fad648,
    #a767e5,
    #12bcfe,
    #44ce7b
  );
}

.Toastify__close-button {
  color: white !important;
  display: none;
}


`;
