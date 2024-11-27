import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Shared/Sidebar";
// import Navbar from "./components/Shared/Navbar";
import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import UserTable from "./components/Users/UserTable";


const App = () => (
  <Router>
    <div style={{ display: "flex" }}>
  
    {/* <Navbar /> */}

      <Sidebar />
      <div style={{ flex: 2, padding: "30px" }}>
        <Routes>
        {/* <Route path="/Shared" element={<Navbar />} /> */}
          <Route path="/users" element={<UsersPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/user-table" element={<UserTable />} /> {/* New Route */}
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
