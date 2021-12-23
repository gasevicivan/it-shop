import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props){
    const {product} = props;
    return(
        <div key={product._id} className="product">
            <Link to={`/product/${product._id}`}>
                <img className="medium" src={product.image} alt={product.name}/>
            </Link>
            <div className="product-body">
                <Link to={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                <div className="price">{product.price} KM</div>
            </div>
        </div>
    )
}
                      
                      