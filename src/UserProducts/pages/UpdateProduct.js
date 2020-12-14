import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import Card from "../../shared/UIElements/Card";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import {AuthContext} from '../../shared/context/auth-context'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PRICE,
  VALIDATOR_ROLE
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";


import { useHttpClient } from "../../shared/hooks/http-hook";

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [ loadedProducts, setLoadedProducts ] = useState();

  const productId = useParams().productId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      
      price: {
        value: "",
        isValid: false,
      },
      area: {
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      }
    },
    false
  );


  //lấy dữ liệu của sản phẩm theo id để tự động điền vào Input trước khi Admin thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/${productId}`
        );

        setLoadedProducts(responseData.product);
        console.log(responseData.product)
        setFormData(
          {
            title: {
              value: responseData.product.title,
              isValid: true,
            },
            description: {
              value: responseData.product.description,
              isValid: true,
            },
            
            price: {
              value: responseData.product.price,
              isValid:true,
            },
            area: {
              value: responseData.product.area,
              isValid:true,
            },
            status: {
              value: responseData.product.status,
              isValid:true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchProducts();
  }, [sendRequest, productId, setFormData]);


  //Lưu sản phẩm sau khi đã được cập nhật
  const productUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/products/${productId}`,
        'PATCH',
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        price: formState.inputs.price.value,
        area: formState.inputs.area.value,
        status: formState.inputs.status.value,
        
      }),
      {
        'Content-Type':'application/json'
      });
      alert("Cập nhật thành công")
      history.push("/" +  auth.userId + "/products");
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedProducts && !error) {
    return (
      <div className="center" style={{marginTop:"70px"}}>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedProducts && (
        <form className="place-form" onSubmit={productUpdateSubmitHandler} style={{marginTop:"70px"}}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Tiêu Đề"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedProducts.title}
            initialValid={true}
          />
          <br/><br/>
          <Input
            id="description"
            element="textarea"
            label="Mô tả"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedProducts.description}
            initialValid={true}
          />
          <br/><br/><br/>
          <Input
            id="price"
            element="input"
            label="Giá"
            validators={[VALIDATOR_PRICE()]}
            errorText="Please enter a valid price."
            onInput={inputHandler}
            initialValue={loadedProducts.price}
            initialValid={true}
          />
          <br/><br/>
          { auth.isAdmin &&
          <Input
            id="currentcy"
            element="input"
            label="Đơn vị tiền"
            disabled ="true"
            onInput={inputHandler}
            initialValue={loadedProducts.currentcy}
            initialValid={true}
          />}
          <br/><br/>
          <Input
            id="area"
            element="input"
            label="Diện tích"
            validators={[VALIDATOR_PRICE()]}
            errorText="Please enter a valid area."
            onInput={inputHandler}
            initialValue={loadedProducts.area}
            initialValid={true}
          />
          <br/><br/>
          <Button type="submit">
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
