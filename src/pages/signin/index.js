// FIREBASE IMPORTS

import { Link, useHistory } from 'react-router-dom';
import { Auth, Firestore, Storage } from '../../config/firebase'
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "firebase/auth";

import { onAuthStateChanged } from '@firebase/auth';
import { useEffect, useRef, useState } from 'react'
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


export default function SignIn({ title }) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   if (firebase.auth().currentUser) {
  //     console.log("logged in");
  //   }
  //   else {
  //     console.log("not logged in");
  //   }
  // }, []);

  function setValues(ev) {
    const { name, value } = ev.target;
    switch (name) {
      case 'email':
        setEmail(value);
        console.log(email);
        break;
      case 'password':
        setPassword(value);
        console.log(password);
        break;
      default:
        break;
    }
  }

  const history = useHistory();

  // SIGNIN FUNCTION

  const signin = async (e) => {
    e.preventDefault();

    // setloading(true);

    try {
      const auth = firebase.auth();
      await auth.signInWithEmailAndPassword(email, password);

      const token = await auth.currentUser.getIdTokenResult();
      // console.log(token.claims.teacher);
      // console.log("above is token");

      if (auth.currentUser && !token.claims.teacher && token.claims.isActive) {

        // alert('you have been closed by admin!')
        history.push('/userdashboard');
      }

      else if (auth.currentUser && token.claims.teacher && token.claims.isActive) {

        history.push('/teachermainpage');
      }

      else {
        alert('sorry but you cant login')
      }
      // auth.currentUser.getIdTokenResult().then((data) => {
      //   console.log(data);
      // })
      // console.log(auth);

      // await auth.signInWithEmailAndPassword(email, password)
      // const token = await auth.currentUser.getIdTokenResult();
      // console.log(auth);
      // setcuurentuser(email);
      // history.push('/userdashboard')

      // if (auth && token.claims.teacher) {
      //   await auth.signInWithEmailAndPassword(email, password);
      //   console.log("logged in");
      //   history.push('/userdashboard');
      // }

      //     else {
      //   console.log("not logged in");
      // }

    } catch {
      alert('error');
    }

    // setloading(false);
  }

  // SIGNIN FUNCTION


  return (
    <>
      <Navbar title={title} />
      <Searchbar />

      <section class="signin">
        <div class="container-fluid">
          {/* <!-- error above line--> */}
          <div class="row">
            <div class="col-md-6 pt-3" styles="background-color: #1f4363;">
              <div class="left">
                <h1>LOGIN YOUR ACCOUNT</h1>
                <h3 class="mt-5">HELP LINE <span class="mt-3">+92 434 43293423</span></h3>
              </div>
            </div>

            <div class="col-md-6 " styles="background-color: #d1d3d4;">
              {/* <div class ="form bg-light"> */}

              <Formstructure>
                <h1>LOGIN</h1>
                <form>

                  <Textbox onChange={setValues} name='email' type='email' placeholder='Email' />

                  <Textbox onChange={setValues} name='password' type='password' placeholder='Password' />

                  <Formbutton onClick={signin} type='button' value='Login' className='btn login-btn w-70 mb-1 text-white' href='/forgotpassword' text='Forgot Password' />

                </form>
              </Formstructure>

            </div>

            {/* <!--
            <div class="col-md-6">
              <div class="right">
                <div class="form-signin">

                  <form>
                    <div class="form-group mt-3">

                      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Email">
                    </div>


                    <div class="form-group mt-3">

                      <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password">
                    </div>

                    <div class="form-group mt-3">

                      <a href="./user-portal/dashboard.html"><input type="button" value="Login"
                        class="btn btn-success form-control"></a>
                    </div>

                    <div class="form-group mt-3">


                      <a href="forgot-password.html">Forgot Password</a>
                      <a href="signup.html">Create New Account</a>

                    </div>

                  </form>
                </div>
              </div>

            </div> --> */}

          </div>
        </div>
      </section>

      <Comments />
      <Footer />

    </>
  )
}
