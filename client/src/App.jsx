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
import PrivateRoute from "./components/Utility/ProtectedRoute";
import Home from "./pages/main/Home";
import Navbar from "./components/Utility/Navbar";
import Interview from "./pages/main/Interview";
import About from "./pages/main/About";
import Instruction from "./pages/main/Instruction";
import Videoplayer from "./pages/main/Videoplayer";
import SubmitComponent from "./pages/main/SubmitComponent";

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          
          {/* Interview Routes */}
          <Route path="/" element={<Home />} />
          <Route path='/interview' element={<Interview />}></Route>
          <Route path='/about' element={<About />}></Route>
          {/* <Route element={<PrivateRoute />}>
            
          </Route> */}
          
          {/* Quiz Routes */}
          <Route path="/aptitude" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/instructions' element={<Instruction />} />
            <Route path='/maininterview' element={<Videoplayer />} />
            <Route path='/submit' element={<SubmitComponent />} />
            <Route path="/training-test" element={<TrainingModeLanding />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/summary" element={<TestSummary />} />
            <Route path="/testing-test" element={<TestingModeLanding />} />
          </Route>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/home" element={<AdminHomePage />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
