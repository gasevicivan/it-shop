import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen() {
    let navigate = useNavigate();

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    useEffect( () =>{
        if(!userInfo){
            navigate('/signin');
        }
    }, [navigate, userInfo]);
    /*if(!userInfo){
        navigate('/signin');
    }*/
    
    //ovo mi u konzoli pravi grešku pri prvom unosu
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();

    
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        navigate('/payment');
        //TODO: dispatch save shipping adress action
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Podaci za dostavu</h1>
                </div>
                <div>
                    <label htmlFor='fullName'>Ime i prezime</label>
                    <input 
                        type='text' 
                        id='fullName' 
                        placeholder='Unesite ime i prezime' 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor='address'>Adresa</label>
                    <input 
                        type='text' 
                        id='address' 
                        placeholder='Unesite adresu' 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor='city'>Grad</label>
                    <input 
                        type='text' 
                        id='city' 
                        placeholder='Unesite naziv grada' 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor='postalCode'>Poštanski broj</label>
                    <input 
                        type='text' 
                        id='postalCode' 
                        placeholder='Unesite poštanski broj' 
                        value={postalCode} 
                        onChange={(e) => setPostalCode(e.target.value)} 
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor='country'>Država</label>
                    <select 
                        type='dropdown' 
                        id='country' 
                        placeholder='Unesite ime i prezime' 
                        value={country} 
                        onChange={(e) => setCountry(e.target.value)} 
                        required>
                            <option value="BIH">Bosna i Hercegovina</option>
                    </select>
                </div>

                <div>
                    <label />
                    <button className='primary' type='submit'>Nastavite sa kupovinom</button>
                </div>
            </form>
        </div>
    )
}
