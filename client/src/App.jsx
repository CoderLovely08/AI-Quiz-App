import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        </Routes>
      </Router>

    </>
  )
}

export default App
