import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminHomePage from "./components/Admin/AdminHomePage";
import AdminLoginPage from "./components/Admin/AdminLoginPage";
import LoginPage from "./components/Authentication/Login";
import RegistrationPage from "./components/Authentication/Register";
import LandingPage from './components/LandingPage/LandingPage'
import Quiz from "./components/Quiz/Quiz";
import TestSummary from "./components/Quiz/TestSummary";
import TestingModeLanding from "./components/TrainingMode/TestingModeLanding";
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
          <Route path="/quiz" element={<Quiz />}></Route>
          <Route path="/summary" element={<TestSummary />}></Route>
          <Route path="/testing-test" element={<TestingModeLanding />}></Route>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/home" element={<AdminHomePage />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
