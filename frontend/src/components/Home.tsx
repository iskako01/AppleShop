import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsFetch } from "../features/productSlice";
import { AppDispatch, AppStore } from "../redux/store";
import { Iproduct } from "../type/productType";
import Product from "./Product";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector<AppStore, Iproduct[]>(
    (state) => state.products.items
  );

  useEffect(() => {
    dispatch(productsFetch());
  }, [dispatch]);

  return (
    <div className="products">
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Home;
