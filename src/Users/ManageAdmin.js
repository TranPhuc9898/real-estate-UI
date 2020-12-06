import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useHttpClient } from "../shared/hooks/http-hook";

const ManageAdmin = (props) => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );

        const data = responseData.user.filter((data) => data.role === 1);
        setLoadedUser(data);
      } catch (error) {}
    };
    fetchProducts();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <table
        striped
        bordered
        hover
        variant="dark"
        className="table"
        style={{ marginTop: "70px" }}
      >
        <thead className="thead-dark">
          <tr>
            <th scope="col">Tên</th>
            <th scope="col">Hình Ảnh</th>
            <th scope="col">Các sản phẩm đã bán được</th>
            <th scope="col">Tổng số lượng</th>
          </tr>
        </thead>
        <tbody>
          {loadedUser.map((u) => {
            return (
              <tr>
                <th>{u.name}</th>
                <th>
                  <img
                    style={{ height: "100px", width: "100px" }}
                    src={`http://localhost:5000/${u.image}`}
                  />
                </th>
                <th>
                  {u.sells.map((product) => {
                    return (
                      <Link to={`/${product}/details`}>
                        <div>
                          {product + ","}
                          <br />
                        </div>
                      </Link>
                    );
                  })}
                </th>
                <th>{u.sells.length}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default ManageAdmin;
