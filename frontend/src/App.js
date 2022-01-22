import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  const userSignin =  useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () =>{
    dispatch(signout());
  }

  return (
    <BrowserRouter>
    <div className="grid">
            <header className="row">
                <div>
                    <Link className="eName" to="/">IT Shop</Link>
                </div>
                <div>
                 
                  {userInfo ? (
                    <div className='dropdown'>
                      <Link to='#'>
                        {userInfo.name} <i className='fa fa-caret-down'></i>{' '}
                      </Link>
                      <ul className='dropdown-content'>
                        <Link to='#signout' onClick={signoutHandler}>
                          Odjavite se
                        </Link>
                      </ul>
                    </div>
                  ) : (
                    <Link to="/signin">Prijavite se</Link>
                  )}
                  <Link to="/cart/:id">
                      Korpa
                      {cartItems.length > 0 && (
                        <span className='badge'>{cartItems.length}</span>
                      )}
                  </Link>   
                </div>
            </header>
            <main>
              <Routes>
                <Route path="/cart/:id" element={<CartScreen />}></Route>
                <Route path="/product/:id" element={<ProductScreen />}></Route>
                <Route path="/signin" element={<SigninScreen />}></Route>
                <Route exact path="/" element={<HomeScreen />}></Route>
              </Routes>
            </main>
            <footer className="row center">
                Sva autorska prava zadržava IT Shop
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
