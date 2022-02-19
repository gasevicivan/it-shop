import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import SearchBox from './components/SearchBox';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';

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
                  <SearchBox />
                </div>

                <div> 
                  {userInfo ? (
                    <div className='dropdown'>
                      <Link to='#'>
                        {userInfo.name} <i className='fa fa-caret-down'></i>{' '}
                      </Link>
                      <ul className='dropdown-content'>
                        <li>
                          <Link to='/profile'>Profil</Link>
                        </li>
                        <li>
                          <Link to='/orderhistory'>Narudžbe</Link>
                        </li>
                        <li>
                          <Link to='#signout' onClick={signoutHandler}>
                            Odjavite se
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link to="/signin">Prijavite se</Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <div className='dropdown'>
                        <Link to="#admin">Administrator {' '} 
                          <i className='fa fa caret-down'></i>
                        </Link>
                        <ul className='dropdown-content'>
                            <li>
                              <Link to="/productlist">Proizvodi</Link>
                            </li>

                            <li>
                              <Link to="/orderlist">Narudžbe</Link>
                            </li>

                            <li>
                              <Link to="/userlist">Korisnici</Link>
                            </li>
                        </ul>
                    </div>
                  )}

                  <Link to="/cart">
                      Korpa
                      {cartItems.length > 0 && (
                        <span className='badge'>{cartItems.length}</span>
                      )}
                  </Link> 
                </div>
            </header>
            <main>
              <Routes>
                <Route path="/cart" element={<CartScreen />}></Route>
                <Route path="/cart/:id" element={<CartScreen />}></Route>
                <Route path="/product/:id" element={<ProductScreen />} exact></Route>
                <Route path="/product/:id/edit" element={<ProductEditScreen />} exact></Route>
                <Route path="/signin" element={<SigninScreen />}></Route>
                <Route path="/register" element={<RegisterScreen />}></Route>
                <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
                <Route path="/payment" element={<PaymentMethodScreen />}></Route>
                <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
                <Route path="/order/:id" element={<OrderScreen />}></Route>
                <Route path="/orderhistory" element={<OrderHistoryScreen />}></Route>
                <Route path="/profile" element={<PrivateRoute><ProfileScreen /></PrivateRoute>}></Route>
                <Route path="/productlist" element={<AdminRoute><ProductListScreen /></AdminRoute>}></Route>
                <Route path="/orderlist" element={<AdminRoute><OrderListScreen /></AdminRoute>}></Route>
                <Route path="/userlist" element={<AdminRoute><UserListScreen /></AdminRoute>}></Route>
                <Route path="/user/:id/edit" element={<AdminRoute><UserEditScreen /></AdminRoute>}></Route>
                <Route path="/search/name" element={<SearchScreen />} exact></Route>
                <Route path="/search/name/:name" element={<SearchScreen />} exact></Route>

                <Route path="/" element={<HomeScreen />} exact></Route>
              </Routes>
            </main>
            <footer className="row center">
                <i>Sva autorska prava zadržava IT Shop</i>
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
