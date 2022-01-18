import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SigninScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitHandler = (e) =>{
        e.preventDefault();
        //Implement signin action
    }
    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Prijavite se na korisnički profil</h1>
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
                    <label />
                    <button className='primary' type='submit'>Prijavite se</button>
                </div>
                <div>
                    <label />
                    <div>
                        <Link to="/register">Niste kreirali korisnički profil? Kreirajte ovdje.</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
