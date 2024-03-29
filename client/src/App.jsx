import React from 'react'
import Header from './components/Header'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Signin from './pages/Signin';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';



const persistor = persistStore(store);

const App = () => {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <PersistGate persistor={persistor}>
                        <ThemeProvider>
                            <Header />
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/about' element={<About />} />
                                <Route path='/contact' element={<Contact />} />
                                <Route path='/signup' element={<Signup />} />
                                <Route path='/signin' element={<Signin />} />

                                {/* Private route for protecting Dashboard  */}
                                <Route element={<PrivateRoute />} >
                                    <Route path='/dashboard' element={<Dashboard />} />
                                </Route>

                            </Routes>
                        </ThemeProvider>
                    </PersistGate>
                </BrowserRouter>
                <Toaster />
            </Provider>
        </>
    )
}

export default App