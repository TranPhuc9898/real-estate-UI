import React, {useEffect, useState}  from "react";
import { useParams } from "react-router-dom";

import ProductList from "../components/UProductList";

import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import {useHttpClient} from '../../shared/hooks/http-hook'

  const UserProducts = () => {

    const { isLoading,error,clearError,sendRequest } = useHttpClient();
    const [loadedProducts, setLoadedProducts] = useState();

    const userId = useParams().userId;
    
    //Lấy ra sản phẩm theo người đăng 
    useEffect(()=>{
      const fetchProducts = async () => {
        try {
          const responseData = await sendRequest(`http://localhost:5000/api/products/user/${userId}`)       
          setLoadedProducts(responseData.products);
        } catch (error) {
          
        }
      };
      fetchProducts();
    },[sendRequest, userId]);
  
  //xoá sản phẩm
  const onDeleteHandler =(deletedProduct) => {
    setLoadedProducts(p => p.filter(product=> product.id !== deletedProduct ));
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
      <div className="center">
        <LoadingSpinner/>
      </div>
    )}
     { !isLoading && loadedProducts &&
      <section className="property-area section-gap relative" id="property">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 header-text">
              <h1>Sản phẩm dành cho bạn.</h1>
            </div>
          </div>
          <ProductList items={loadedProducts} delete={onDeleteHandler} />
        </div>
      </section>
      }
    </React.Fragment>
     
  );
  };

export default UserProducts;
