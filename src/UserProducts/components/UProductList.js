import React from "react";


import ProductItem from "./UProductItem";

const UProductList = (props) => {

  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No places found. Maybe create one?</h2>
        <button to="/places/new">Share Place</button>
      </div>
    );
  }

  return (
    <div className="row">
      {props.items.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          currentcy={product.currentcy}
          address={product.address}
          img={product.image}
          area={product.area}
          delete={props.delete}
          date={product.date.split("T")[0]}
          enddate={product.endDate.split("T")[0]}
          
        />
      ))}
    </div>
  );
};

export default UProductList;
