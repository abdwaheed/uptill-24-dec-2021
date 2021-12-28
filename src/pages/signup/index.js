
// FIREBASE IMPORTS

import { Link, useHistory } from 'react-router-dom';
import { Auth, Firestore, Functions, Storage } from '../../config/firebase'
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "firebase/auth";

import { onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useRef, useState } from 'react'
import { connectStorageEmulator } from '@firebase/storage';
import firebase from "firebase/app";

// FIREBASE IMPORTS



import Searchbar from '../../components/searchbar';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Comments from '../../components/comments';
import Formstructure from '../../components/formstructure';
import Textbox from '../../components/textbox';
import Formbutton from '../../components/formbutton';

export default function SignUp({ title }) {


  const [loading, setloading] = useState(false);

  const history = useHistory();

  //FOR GETTING USER EMAIL
  const [currentuser, setcuurentuser] = useState();

  //FOR GETTING USER EMAIL
  const auth = firebase.auth();




  // SIGNUP FUNCTION


  const signup = async (e) => {
    e.preventDefault();

    setloading(true);

    try {

      await auth.createUserWithEmailAndPassword(email, password);

      const role = Functions.httpsCallable('checkRole');
      const result = await role({ email });
      console.log(result);
      // role({ email: email }).then((result) => {
      //   console.log(result);
      // })


      // props.auth.getIdTokenResult().then((token) => {
      //   console.log(token.claims.admin);
      // })


      await Firestore.collection("teachers").doc(auth.currentUser.uid).set({

        name: '',
        email: email,
        phone: ''
      })

      console.log("done auth for teacher and teacher added to firestore");
      setcuurentuser(email);

      history.push('/teachermainpage');

    } catch {
      alert('error');
    }

    setloading(false);
  }

  // SIGNUP FUNCTION



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function setValues(ev) {
    const { name, value } = ev.target
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }



  return (
    <>
      <Navbar title={title} />
      <Searchbar />

      <section class="signin">
        <div class="container-fluid">
          {/* <!--error above line--> */}
          <div class="row">
            <div class="col-md-6 pt-3" styles="background-color: #1f4363;">
              <div class="left">
                <h1>REQUEST AN ADMISSION</h1>
                <h3 class="mt-5">HELP LINE <span class="mt-3">+92 434 43293423</span></h3>
              </div>
            </div>
            <div class="col-md-6" styles="background-color: #d1d3d4;">
              {/* <div class="form bg-light"> */}
              <Formstructure>
                <h1>ADMISSION</h1>
                <form>
                  {/* <div class="form-group mt-3">
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Name" />
                  </div> */}

                  <Textbox type='text' placeholder='Name' />

                  {/* <div class="form-group mt-3">
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Email" />
                  </div> */}

                  <Textbox name='email' onChange={setValues} type='email' placeholder='Email' />

                  {/* <div class="form-group mt-3">
                    <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" />
                  </div> */}


                  <Textbox name='password' onChange={setValues} type='password' placeholder='Password' />

                  {/* <div class="form-group mt-3">
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Captcha Code" />
                  </div> */}


                  <Textbox type='text' placeholder='Captcha Code' />


                  {/* <div class="form-group text-center">
                    <input type="submit" value="Register Now" class="btn btn-success w-90 mb-1" /><br />
                    <a href="signin.html">Click Here To Login</a>

                  </div> */}

                  <Formbutton onClick={signup} type='submit' classname=' btn btn-success w-90 mb-1' href='/signin' value='Register Now' text='Click Here To Login' />

                </form>
              </Formstructure>
              {/* </div> */}
            </div>

          </div>
        </div>
      </section>



      <Comments />
      <Footer />


    </>
  )
}
