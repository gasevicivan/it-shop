import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct } from "../actions/productActions";

function ProductScreen(props) {
    const dispatch = useDispatch();
    const {id} = useParams();
    const productId = id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;

    useEffect(() =>{
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    let navigate = useNavigate();
    
    const addToCartHandler = () =>{
        navigate(`/cart/${productId}?qty=${qty}`)
    };

    return(
        <div>
            {loading? <LoadingBox></LoadingBox>
            :  error? 
                <MessageBox variant="danger">{error}</MessageBox>
            : 
            <div>
                <Link to="/">Vrati se nazad</Link>
                <div className="row top">
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.name}></img>
                    </div>
                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                <Rating rating = {product.rating} numReviews = {product.numReviews}></Rating>
                            </li>
                            <li>
                                Cijena: {product.price} KM
                            </li>
                            <li>
                                <p className="descrip"><b>Opis:</b> {product.description}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="product product-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Cijena</div>
                                        <div className="price">{product.price} KM</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Dostupnost</div>
                                        <div>
                                            {product.countInStock > 0 ? (
                                                <span className="success">Na stanju</span>
                                                ) : (
                                                <span className="danger">Nema na stanju</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                </li>
                                {product.countInStock > 0 &&(
                                    <>
                                    <li>
                                        <div className="row">
                                            <div>Količina</div>
                                            <div>
                                                <select value={qty} onChange={ (e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map( (x) => (
                                                            <option key= {x+1} value={x+1}>{x+1}</option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button onClick={addToCartHandler} className="primary block">Dodaj u korpu</button>
                                    </li>
                                    </>
                                     
                                )}
                               
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
        }
        </div>
        
    )
}

export default ProductScreen;