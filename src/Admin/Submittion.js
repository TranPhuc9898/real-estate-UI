import React, {useEffect, useState} from "react";
import ProductList from "../Products/components/ProductList";

import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useHttpClient } from "../shared/hooks/http-hook";

const Submit = () => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState();

  //Lấy dữ liệu sản phẩm với status === 0 (những sản phẩm chưa được admin duyệt)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/products'
        );
        const data = responseData.product.filter(data => data.status=== 0);
        setLoadedProducts(data);
        
      } catch (error) {}
    };
    fetchProducts();
  }, [sendRequest]);
  return (
    <React.Fragment style={{marginTop:"200px"}}>
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
                <h1></h1>
              </div>
            </div>
            <ProductList items={loadedProducts} />
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Submit;
