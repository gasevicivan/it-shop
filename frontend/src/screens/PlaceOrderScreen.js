import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

export default function PlaceOrderScreen() {
    const navigate = useNavigate();
    const cart =  useSelector( (state) => state.cart);

    const orderCreate = useSelector((state) => state.orderCreate);
    const {loading, success, error, order} = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce( (a,c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 150 ? toPrice(0) : toPrice(10);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
    cart.pdvPrice = toPrice(cart.totalPrice * (1 - 100/117));

    const dispatch = useDispatch();
    const placeOrderHandler = () =>{
        dispatch(createOrder({...cart, orderItems: cart.cartItems}));
    }

    useEffect( () =>{
        if(!cart.paymentMethod){
            navigate('/payment');
        }
        if(success){
            navigate(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [navigate, cart, success, order, dispatch]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='product product-body'>
                                <h3>Dostava</h3>
                                <p>
                                    <strong>Ime: </strong> {cart.shippingAddress.fullName}<br />
                                    <strong>Adresa: </strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className='product product-body'>
                                <h3>Način plaćanja</h3>
                                <p>
                                    <strong>Plaćanje: </strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className='product product-body'>
                                <h3>Naručeni artikli</h3>
                                <ul>
                                    {cart.cartItems.map((item) =>(
                                        <li key={item.product}>
                                            <div className='row'>
                                                <div>
                                                    <img src={item.image} alt= {item.name} className='small'></img>
                                                </div>
                                                <div className='min-30'>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>{item.qty} x {item.price} KM = {item.qty * item.price} KM</div>
                                            </div>
                                        </li>
                                    )
                                    )}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className='col-1'>
                    <div className='product product-body'>
                        <ul>
                            <li>
                                <h3>Narudžba</h3>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Cijena</div>
                                    <div>{cart.itemsPrice.toFixed(2)} KM</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Uključuje PDV</div>
                                    <div>{cart.pdvPrice} KM</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Troškovi dostave</div>
                                    <div>{cart.shippingPrice.toFixed(2)} KM</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>Ukupno (sa PDV-om)</strong></div>
                                    <div><strong>{cart.totalPrice.toFixed(2)} KM</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type='button' onClick={placeOrderHandler} className='primary block' disabled={cart.cartItems.length === 0}>
                                    Završi narudžbu
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>

            
        </div>
    )
}
