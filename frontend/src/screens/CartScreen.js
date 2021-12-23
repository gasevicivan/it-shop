import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
    const {id} = useParams();
    const productId = id;
    let location = useLocation();
    const qty = location.search? Number(location.search.split('=')[1]): 1;

    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;

    const dispatch = useDispatch();
    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id));
    }

    let navigate = useNavigate();
    const checkoutHandler = () =>{
        navigate('/signin?redirect=shipping');
    }

    return (
        <div className='row top'>
            <div className='col-2'>
                <h1>VAŠA KORPA</h1>
                {cartItems.length === 0 ? (<MessageBox>Vaša korpa je prazna.
                    <Link to='/'> Povratak na kupovinu</Link>
                    </MessageBox>
                ) : (
                    <ul>
                        {cartItems.map((item) =>(
                            <li key={item.product}>
                                <div className='row'>
                                    <div>
                                        <img src={item.image} alt= {item.name} className='small'></img>
                                    </div>
                                    <div className='min-30'>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                    <div className='space'>
                                        <select value={item.qty} onChange=
                                        {(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                             {
                                                [...Array(item.countInStock).keys()].map( (x) => (
                                                    <option key= {x+1} value={x+1}>{x+1}</option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div>{item.price} KM</div>
                                    <div>
                                        <button className='button' 
                                        onClick={() => removeFromCartHandler(item.product)}>
                                            Izbriši
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )
                        )}
                    </ul>
                    )
                }
            </div>
            
            <div className='col-1'>
                <div className='product product-body'>
                    <ul>
                        <li>
                            <h3>Ukupno ({cartItems.reduce((a,c) => a += parseInt(c.qty) , 0)} proizvoda) 
                            : {parseFloat(cartItems.reduce((a,c) => a += parseFloat(c.price) * c.qty, 0)).toFixed(2)} KM
                            </h3>
                        </li>
                        <li>
                            <button type='button' onClick={checkoutHandler} className='primary block' disabled={cartItems.length === 0}>
                                ZAVRŠITE KUPOVINU
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
