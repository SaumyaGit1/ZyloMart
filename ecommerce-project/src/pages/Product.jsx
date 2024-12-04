import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RellatedPro from "../components/RellatedPro";

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);  // Initialize as null for loading state
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);  // Add loading state

  const fetchProductData = async () => {
    // Log the productId for debugging
    console.log("Product ID from URL:", productId);

    const product = products.find(item => item._id === productId);  // Find product by ID
    if (!product) {
      console.error("Product not found");
      setLoading(false);  // Set loading to false when data is fetched
      return;
    }

    setProductData(product);
    setImage(product.image[0]);  // Set the first image
    setLoading(false);  // Set loading to false after fetching product data
  };

  useEffect(() => {
    if (products.length > 0) {
      fetchProductData();  // Fetch product data only when products array is populated
    }
  }, [productId, products]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading text while the product is being fetched
  }

  return productData ? (
    <div className="border-t-2 pt-10 mb-20 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex item-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={`size-${index}`}
                  onClick={() => setSize(item)}
                  className={`border px-4 py-2 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy Return and Exchange Policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description and Review */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text:sm">Description</b>
          <p className="border px-5 py-3 text:sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An eCommerce website is an online platform that allows businesses to
            sell products or services directly to consumers. Customers can
            browse items, view details, and make secure purchases using various
            payment methods.
          </p>
          <p>
            These websites enable businesses to manage inventory and track sales
            while reaching a global audience 24/7, making shopping convenient
            and accessible.
          </p>
        </div>
      </div>
      {/* Display Related Products */}
      <RellatedPro
        category={productData.category}
        subcategory={productData.subCategory}
      />
    </div>
  ) : (
    <div>Product not found</div>  // Handle case where no product is found
  );
}

export default Product;
