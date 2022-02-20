import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { createReview, detailsProduct } from "../actions/productActions";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

function ProductScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const productId = id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {loading: loadingReviewCreate, error: errorReviewCreate, success: successReviewCreate} = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    useEffect(() =>{
        if(successReviewCreate){
            window.alert('Recenzija uspješno postavljena');
            setRating('');
            setComment('');
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET});
        }
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);

    
    const addToCartHandler = () =>{
        navigate(`/cart/${productId}?qty=${qty}`)
    };

    const submitHandler = (e) =>{
        e.preventDefault();
        if(comment && rating){
            dispatch(createReview(productId, {rating, comment, name: userInfo.name}))
        }
        else{
            alert('Unesite komentar i ocjenu');
        }
    }

    return(
        <div>
            {loading? <LoadingBox></LoadingBox>
            :  error? 
                <MessageBox variant="danger">{error}</MessageBox>
            : (
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

                <div>
                    <h3 id='reviews'>RECENZIJE</h3>
                    {product.reviews.length === 0 && (<MessageBox>Nema recenzija</MessageBox>)}
                    <ul>
                        {product.reviews.map( (review) => (
                            <li key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating rating={review.rating} caption=' '></Rating>
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </li>
                        ))}
                        <li>
                            {userInfo ? (
                                <form className="form" onSubmit={submitHandler}>
                                    <div>
                                        <center><h3>NAPIŠITE RECENZIJU</h3></center>
                                    </div>
                                    <div>
                                        <label htmlFor="rating">Ocjena</label>
                                        <select id='rating' value={rating}
                                            onChange={ (e) => setRating(e.target.value)}>
                                                <option value="">Izaberite...</option>
                                                <option value="1">1 - Loš</option>
                                                <option value="2">2 - Zadovoljava</option>
                                                <option value="3">3 - Dobar</option>
                                                <option value="4">4 - Veoma dobar</option>
                                                <option value="5">5 - Odličan</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="comment">Komentar</label>
                                        <textarea id='comment' value={comment}
                                            onChange={ (e) => setComment(e.target.value)}>
                                        </textarea>
                                    </div>

                                    <div>
                                        <label />
                                        <button className="primary" type="submit">
                                            Postavi recenziju
                                        </button>
                                    </div>

                                    <div>
                                        {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                        {errorReviewCreate && (<MessageBox variant='danger'>{errorReviewCreate}</MessageBox>)}
                                    </div>
                                </form>
                            ) : (
                                <MessageBox>
                                    <Link to='/signin'>Ulogujte se</Link> da bi ostavili recenziju
                                </MessageBox>
                            
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        )}
        </div>
        
    )
}

export default ProductScreen;