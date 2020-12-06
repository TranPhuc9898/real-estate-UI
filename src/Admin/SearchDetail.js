import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../shared/hooks/http-hook";

import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import ProductList from '../Products/components/ProductList'
const SearchDetail = (props) => {
  const city = useParams().pcity;
  const district = useParams().pdistrict;
  const type = useParams().ptype;

  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/search/${district}/${city}/${type}`
        );
        setLoadedProducts(responseData.product);
        console.log(responseData.product);
      } catch (error) {}
    };
    fetchProducts();
  }, [sendRequest, district, city]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProducts && (
         <section className="property-area section-gap relative" id="property">
         <div className="container">
           <div className="row d-flex justify-content-center">
             <div className="col-md-10 header-text">
             </div>
           </div>
           <ProductList items={loadedProducts} />
         </div>
       </section>
      )}
    </React.Fragment>
  );
};

export default SearchDetail;
