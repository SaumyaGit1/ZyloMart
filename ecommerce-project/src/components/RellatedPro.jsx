import React from "react";
import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";
function RellatedPro({ category, subcategory }) {
  const { products } = useContext(ShopContext);
  const [related, setrelated] = useState([]);
  useEffect(() => {
    let productCopy = products.slice();
    if (products.length > 0) {
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter(
        (item) => subcategory === item.subCategory
      );
      setrelated(productCopy.slice(0, 5));
    }
  }, [products, category, subcategory]);
  return (
    <div className="my-24">
      <div className="text-center py-2 text-3xl">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default RellatedPro;
