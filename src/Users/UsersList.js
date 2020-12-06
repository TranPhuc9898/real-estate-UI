import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import UserItem from "./UserItem";

const UsersList = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);


  useEffect(()=> {
    setProducts(props.items)
  },[])

  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No users found</h2>
      </div>
    );
  }
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let results = products.filter(p => p.name.includes(searchTerm))
  return (
    <React.Fragment>
      <div style={{ marginTop: "70px" }}>
        <p style={{ color: "red" }}>
          Tổng số thành viên là : {props.items.length}
        </p>
      </div>
      <div>
        <Link to="/users/admin">
          <a className="btn btn-danger"> Thống kê </a>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <table striped bordered hover variant="dark" className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Tên</th>
            <th scope="col">Email</th>
            <th scope="col">Hình Ảnh</th>
            <th scope="col">Option</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {results.map((user) => 
            <UserItem
              key={user.id}
              id={user.id}
              image={user.image}
              name={user.name}
              email={user.email}
              delete={props.delete}
              role={user.role}
            />
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default UsersList;
