import React, { useEffect, useState } from "react";
import UsersList from "../Users/UsersList";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useHttpClient } from "../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setLoadedUsers(responseData.user);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  const onDeleteHandler = (deletedUser) => {
    setLoadedUsers((p) => p.filter((user) => user.id !== deletedUser));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <form onsubmit="event.preventDefault();" role="search" style={{marginTop:"20px"}}>
          <label for="search">Tìm kiếm nhân viên</label>
          <input
            id="search"
            type="search"
            placeholder="Search..."
            autofocus
            required
          />
          <button type="submit">Search</button>
        </form>
      )}

      {!isLoading && loadedUsers && (
        <div>
          <UsersList items={loadedUsers} delete={onDeleteHandler} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Users;
