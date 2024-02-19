import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { firebaseApp } from '../firebase';









const OAth = () => {


    const auth = getAuth(firebaseApp);


    const googleAuthBtn = async () => {

        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const response = await signInWithPopup(auth, provider);

            const sendData = await fetch('http://localhost:8000/api/user/googleOAth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: response.user.displayName,
                    email: response.user.email,
                    googlePhotoURL: response.user.photoURL
                })
            })
            const data = sendData.json();
            console.log('The data is ', data);


        } catch (error) {
            console.log(error);
        }

    }



    return (
        <>
            <button type='button' onClick={googleAuthBtn} className='border flex text-sm gap-2  items-center justify-center border-green-600 rounded-md py-1 mt-3 active:scale-95 transition-all active:bg-gradient-to-r from-green-400 via-green-700 to-green-400 active:text-white'><span><FcGoogle size={20} /></span>Continue with Google</button>
        </>
    )
}

export default OAth;