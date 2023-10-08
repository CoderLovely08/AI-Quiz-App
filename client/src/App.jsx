import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLoginPage from "./components/Admin/AdminLoginPage";
import LoginPage from "./components/Authentication/Login";
import RegistrationPage from "./components/Authentication/Register";
import LandingPage from './components/LandingPage/LandingPage'
import TrainingModeLanding from "./components/TrainingMode/TrainingModeLanding";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/training-test" element={<TrainingModeLanding />}></Route>
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
