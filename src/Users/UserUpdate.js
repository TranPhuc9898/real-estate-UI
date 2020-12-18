import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../shared/FormElements/Input";
import Button from "../shared/FormElements/Button";
import Card from "../shared/UIElements/Card";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import {AuthContext} from '../shared/context/auth-context'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_ROLE,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";


import { useHttpClient } from "../shared/hooks/http-hook";

const UpdateUser = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [ loadedUser, setLoadedUser ] = useState();

  const userId = useParams().userId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      
      password: {
        value: "",
        isValid: false,
      },
      role: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //Lấy thông tin user theo id để điền sẵn thông tin trước khi Admin cập nhật
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${userId}`
        );

        setLoadedUser(responseData.user);
        setFormData(
          {
            name: {
              value: responseData.user.name,
              isValid: true,
            },
            email: {
              value: responseData.user.email,
              isValid: true,
            },
            
            password: {
              value: responseData.user.password,
              isValid:true,
            },
            role: {
                value: responseData.user.role,
                isValid:true,
              },
          },
          true
        );
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest, userId, setFormData]);

  //Lưu thông tin user sau khi được Admin cập nhật
  const userUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/users/${userId}`,
        'PATCH',
      JSON.stringify({
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        role: formState.inputs.role.value,
      }),
      {
        'Content-Type':'application/json'
      });
      history.push("/" +  userId + "/products");
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedUser && !error) {
    return (
      <div className="center" style={{marginTop:"70px"}}>
        <Card>
          <h2>Could not find user!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
        <br/><br/>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUser && (
        <form className="place-form" onSubmit={userUpdateSubmitHandler} style={{marginTop:"70px"}}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Vui lòng nhập tên"
            onInput={inputHandler}
            initialValue={loadedUser.name}
            initialValid={true}
          />
          <br/><br/>
          <Input
            id="email"
            element="input"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Vui lòng nhập E-mail"
            onInput={inputHandler}
            initialValue={loadedUser.email}
            initialValid={true}
          />
          <br/><br/><br/>
          <Input
            id="password"
            element="input"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Vui lòng nhập mật khẩu trên 5 ký tự"
            onInput={inputHandler}
            initialValue={loadedUser.password}
            initialValid={true}
          />
          <br/><br/><br/>
          <Input
            id="role"
            element="input"
            label="Role"
            validators={[VALIDATOR_ROLE()]}
            errorText="Nhập 1 là Admin. Nhập 0 là Khách"
            onInput={inputHandler}
            initialValue={loadedUser.role}
            initialValid={true}
          />
          <br/><br/>
          <Button type="submit">
            UPDATE USER
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateUser;
