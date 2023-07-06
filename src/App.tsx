import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateJob from "./pages/CreateJob";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import JobDetails from "./pages/JobDetails";
import AuthRoute from "./auth";

import Proposals from "./pages/Proposals";
import Professionals from "./pages/Professionals";
import SavedJobs from "./pages/SavedJobs";
import Jobs from "./pages/Jobs";
import Notifications from "./pages/Notifications";
import Terms from "./pages/Terms";
import ProfessionalsDetails from "./pages/ProfessionalsDetails";
import UpdateProfile from "./pages/UpdateProfile";
import Test from "./test";
import { Template } from "./template";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="*" element={<Template />} /> 
          <Route path="/" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route
            path="/professionalsDetails/:id"
            element={<ProfessionalsDetails />}
          />
          <Route path="/jobDetails/:id" element={<JobDetails />} />
          <Route
            path="/notifications"
            element={
              <AuthRoute>
                <Notifications />
              </AuthRoute>
            }
          />

          <Route
            path="/proposals"
            element={
              <AuthRoute>
                <Proposals />
              </AuthRoute>
            }
          />
          <Route path="/professionals" element={<Professionals />} />
          <Route
            path="/savedJobs"
            element={
              <AuthRoute>
                <SavedJobs />
              </AuthRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <AuthRoute>
                <Jobs />
              </AuthRoute>
            }
          />
          <Route
            path="createJob"
            element={
              <AuthRoute>
                <CreateJob />
              </AuthRoute>
            }
          />
          <Route
            path="profile"
            element={
              // <AuthRoute>
                <Profile />
              // </AuthRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
export default App;
