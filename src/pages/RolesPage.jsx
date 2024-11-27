import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import RoleTable from "../components/Roles/RoleTable";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get("/roles").then((response) => setRoles(response.data));
  }, []);

  return (
    <div>
      <h1>Roles</h1>
      <RoleTable roles={roles} />
    </div>
  );
};

export default RolesPage;
