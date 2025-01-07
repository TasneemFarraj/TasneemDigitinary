// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../../redux/features/products/productsThunks";
// import { addToCart } from "../../redux/features/cart/cartSlice";
// import { useNavigate } from "react-router-dom";
// import "../../Style/ProductList.css";

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { products, status, error } = useSelector((state) => state.products);
//   const { user } = useSelector((state) => state.auth); 
//   const [isLoading, setIsLoading] = useState(true);

//   console.log({
// products    
//   });
  
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//       dispatch(fetchProducts());
//     }, 2000); 

//     return () => clearTimeout(timer); 
//   }, [dispatch]);

//   const handleAddToCart = (product) => {
//     console.log("User status: ", user); 
//     if (!user) {
//       navigate("/login"); 
//     } else {
//       dispatch(addToCart(product)); 
//     }
//   };
  
  

//   if (isLoading || status === "loading") return <div className="loader" />;
//   if (status === "failed") return <div>Error: {error}</div>;

//   return (
//     <div className="product-list">
//       {Array.isArray(products) && products.length > 0 ? (
//         products.map((product) => {
//           let imageUrl = product.images[0];
//           if (imageUrl.startsWith('"') && imageUrl.endsWith('"')) {
//             imageUrl = imageUrl.slice(1, -1);
//           }
  
//           const placeholderImage = "https://via.placeholder.com/640x480";
  
//           return (
//             <div key={product.id} className="product-card">
//               <img
//                 src={imageUrl}
//                 alt={product.title}
//                 className="product-image"
//                 onError={(e) => (e.target.src = placeholderImage)}
//               />
//               <div className="product-details">
//                 <h3 className="product-title">{product.title}</h3>
//                 <p className="product-description">{product.description}</p>
//                 <span className="product-price">${product.price}</span>
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   className="CartBtn"
//                 >
//                   <span className="IconContainer">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       height="1em"
//                       viewBox="0 0 576 512"
//                       fill="rgb(17, 17, 17)"
//                       className="cart"
//                     >
//                       <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
//                     </svg>
//                   </span>
//                   <p className="text">Add to Cart</p>
//                 </button>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <div>No products available</div>
//       )}
//     </div>
//   );
  
// };

// export default ProductList;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/products/productsThunks";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import "../../Style/ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      dispatch(fetchProducts());
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate("/login"); 
    } else {
      dispatch(addToCart(product));
    }
  };

  if (isLoading || status === "loading") return <div className="loader" />;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="product-list">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => {
          let imageUrl = product.images[0];
          if (imageUrl.startsWith('"') && imageUrl.endsWith('"')) {
            imageUrl = imageUrl.slice(1, -1);
          }

          const placeholderImage ="https://via.placeholder.com/640x480";

          return (
            <div key={product.id} className="product-card">
              <img
                src={imageUrl}
                alt={product.title}
                className="product-image"
                onError={(e) => (e.target.src = placeholderImage)}
              />
              <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <span className="product-price">${product.price}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="CartBtn"
                >
                  <span className="IconContainer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 576 512"
                      fill="rgb(17, 17, 17)"
                      className="cart"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                    </svg>
                  </span>
                  <p className="text">Add to Cart</p>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
};

export default ProductList;
