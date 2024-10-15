import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";
import Title from "./Title";
import Collection from "../pages/Collection";
import ProductItem from "./ProductItem";

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProduct, setlatestProduct] = useState([]);
  useEffect(() => {
    setlatestProduct(products.slice(0, 10));
  }, []);
  return (
    <div>
      <div>
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          ex.
        </p>
      </div>
      <div>
        {latestProduct.map((index, item) => {
          <ProductItem
            key={index}
            image={item.image}
            name={item.name}
            price={item.price}
          />;
        })}
      </div>
    </div>
  );
}

export default LatestCollection;
