import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    /*let location = useLocation();
    const redirect = location.search
        ? location.search.split('?')[1]
        : '/';*/

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    
    const userRegister =  useSelector(state => state.userRegister);
    const {userInfo, loading, error} = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Lozinke se razlikuju! Morate unijeti iste lozinke.');
        }
        else{
           dispatch(register(name, email, password)); 
        }
        
    }

    
    useEffect( () =>{
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Kreiraj korisnički profil</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                <div>
                    <label htmlFor='name'>Ime</label>
                    <input type='text' id='name' placeholder='Unesite ime' required
                        onChange={ e => setName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' placeholder='Unesite email' required
                        onChange={ e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='password'>Lozinka</label>
                    <input type='password' id='password' placeholder='Unesite lozinku' required
                        onChange={ e => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Potvrdite lozinku</label>
                    <input type='password' id='confirmPassword' placeholder='Ponovo unesite lozinku' required
                        onChange={ e => setConfirmPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label />
                    <button className='primary' type='submit'>Registrujte se</button>
                </div>
                <div>
                    <label />
                    <div>
                        <Link to={`/signin?redirect=${redirect}`}>Već imate korisnički profil? Prijavite se.</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
