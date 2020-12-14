import React, { useState, useContext } from "react";

import Card from "../shared/UIElements/Card";
import Input from "../shared/FormElements/Input";
import Button from "../shared/FormElements/Button";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import ImageUpload from '../shared/FormElements/ImageUpload'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid:false
          }
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
  
    if (isLoginMode) {
      try {
        
        const responseData =  await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
          alert("Đăng nhập thành công")
        auth.login(responseData.user.id);
        auth.authorization(responseData.user.role)
      } catch (error) {
        
      }
      
    } else {
      try {
        const formData = new FormData();
        formData.append('email',formState.inputs.email.value )
        formData.append('name',formState.inputs.name.value )
        formData.append('password',formState.inputs.password.value )
        formData.append('image',formState.inputs.image.value )
        const responseData =  await sendRequest(
          "http://localhost:5000/api/users/signup", 
          "POST",
          formData
        );
          alert("Đăng kí thành công!")
        auth.login(responseData.user.id);
      } catch (err) {
      }
    }
  };



  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="Authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Đăng Nhập / Đăng kí</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Tên"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          
          <br />
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <br />
          <br />
          <Input
            element="input"
            id="password"
            type="password"
            label="Mật Khẩu"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <br />
          
          {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler}/>}
          <br/>
 
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "Đăng nhập" : "Đăng kí"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? "Đăng kí" : "Đăng nhập"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
