import React from "react";
import { Link } from "react-router-dom";

import { useHttpClient } from "../shared/hooks/http-hook";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

const UserItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const confirmDeleteHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/users/${props.id}`,
        "DELETE"
      );
      props.delete(props.id);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <tr>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>
          <img
            alt=""
            style={{ height: "100px", width: "100px" }}
            src={`http://localhost:5000/${props.image}`}
          />
        </td>
        <td>
          <Link to={`/${props.id}/updateInfo`}>
            <button type="button" class="btn btn-success">
              UPDATE
            </button>
          </Link>
          <button
            type="button"
            class="btn btn-danger"
            onClick={confirmDeleteHandler}
          >
            DELETE
          </button>
          <Link to={`/${props.id}/products`}>
            <button type="button" class="btn btn-info">
              INFO
            </button>
          </Link>
        </td>
        <td>{props.role === 1 ? "Admin" : "Guest"}</td>
      </tr>
    </React.Fragment>
  );
};

export default UserItem;
