import React, {useEffect, useState} from "react";
import ProductList from "./ProductList";

import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import Pagination from '../Pagination'
import { useHttpClient } from "../../shared/hooks/http-hook";

const Products = () => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState([]);
  // const [pageProduct, setPageProduct] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/products'
        );
        const data = responseData.product.filter(data => data.status=== 1);
        setLoadedProducts(data);
        
      } catch (error) {}    
    };
    fetchProducts();
  }, [sendRequest]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = loadedProducts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

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
                <h1>Sản phẩm dành cho bạn.</h1>
              </div>
            </div>
            <ProductList items={currentPosts} />
          </div>
        </section>
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={loadedProducts.length}
        paginate={paginate}
      />
    </React.Fragment>
  );
};

export default Products;
