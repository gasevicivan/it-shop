import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile;

    const dispatch = useDispatch();
    useEffect( () =>{
        if(!user){
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._id));
        }
        else{
           setName(user.name); 
           setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Lozinke se razlikuju! Morate unijeti iste lozinke.');
        }
        else{
            dispatch(updateUserProfile({userId: user._id, name, email, password}));
        }
    }
  return (
    <div>
        <form className='form' onSubmit={submitHandler}>
            <div>
                <h1>Profil korisnika</h1>
            </div>
            {
                loading? (<LoadingBox></LoadingBox>)
                :
                error? (<MessageBox variant='danger'>{error}</MessageBox>)
                :(
                <>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
                {successUpdate && <MessageBox variant='success'>
                    Profil uspješno ažuriran</MessageBox>}
                    <div>
                        <label htmlFor='name'>Ime</label>
                        <input id='name' type='text' placeholder='Unesite ime' 
                            value={name} onChange={(e) => setName(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='text' placeholder='Unesite email'
                            value={email} onChange={(e) => setEmail(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label htmlFor='password'>Lozinka</label>
                        <input id='password' type='password' placeholder='Unesite lozinku'
                            onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label htmlFor='confirmPassword'>Potvrda lozinke</label>
                        <input id='confirmPassword' type='password' placeholder='Ponovo unesite lozinku'
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label/>
                        <button className='primary' type='submit'>
                            Ažurirajte podatke
                        </button>
                    </div>
                </>
        )}
        </form>
    </div>
  )
}
