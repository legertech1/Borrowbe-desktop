import axios from "axios";
import React, { useEffect, useState } from "react";
import apis from "../services/api";
import { useSelector } from "react-redux";
import { ALL_PERMISSIONS_ARRAY, setPermissions } from "../utils/rbac";
import Spinner from "../components/Spinner";

const withAdminCheck = (WrappedComponent) => {
  return (props) => {
    const [isAdmin, setIsAdmin] = useState(undefined);
    const user = useSelector((state) => state.auth);

    useEffect(() => {
      const checkAdminRole = async () => {
        try {
          const result = await axios.get(apis.permissions + "/" + user._id);
          setIsAdmin(true);
          setPermissions(result.data.permissions);
        } catch (error) {
          setIsAdmin(false);
        }
      };

      if (user.accountType === "admin") {
        setIsAdmin(true);
        setPermissions(ALL_PERMISSIONS_ARRAY);
      } else {
        checkAdminRole();
      }
    }, []);

    return isAdmin === true ? (
      <WrappedComponent {...props} />
    ) : isAdmin === false ? (
      <h1>Unauthorized</h1>
    ) : (
      <Spinner loading={true} title={"Checking if you are an admin..."} />
    );
  };
};

export default withAdminCheck;
