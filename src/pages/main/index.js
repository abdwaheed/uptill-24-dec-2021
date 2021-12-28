
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
import Homedesign from '../../components/homedesign';
import Textbox from '../../components/textbox';
import Formbutton from '../../components/formbutton';
import Formstructure from '../../components/formstructure';
import PcourseImages from '../../components/PcourseImages';
import AcourseCard from '../../components/AcourseCard';
import Footer from '../../components/footer';
import Comments from '../../components/comments';
import CoursesPage from '../courses';

export default function MainPage(props) {


  const [loading, setloading] = useState(false);


  //FOR GETTING USER EMAIL

  const [currentuser, setcuurentuser] = useState();

  //FOR GETTING USER EMAIL

  const auth = firebase.auth();


  var storageRef = firebase.storage().ref();


  // AUTH STATE CHECK


  const [coursData, setCourseData] = useState([]);

  const [val, setval] = useState('');

  useEffect(() => {

    console.log(a)

    if (props.auth) {
      setval('hello');
    }
    else {
      console.log("logged out")
    }

    let tempdata = [];

    // function to getset data
    const getsetdata = async () => {
      const data = await Firestore.collection('courses').get();

      data.forEach((alldata) => {
        tempdata.push({ id: alldata.id, ...alldata.data() })
      })
      setCourseData(tempdata);

    }
    // function to getset data


    getsetdata();



  }, [])

  // AUTH STATE CHECK



  // to navigate
  const history = useHistory();
  // to navigate


  // SIGNUP FUNCTION


  const signup = async (e) => {
    e.preventDefault();

    setloading(true);

    try {

      await auth.createUserWithEmailAndPassword(email, password);

      const role = Functions.httpsCallable('studentRole');
      const result = await role({ email });
      console.log(result);

      await Firestore.collection("students").doc(auth.currentUser.uid).set({

        name: '',
        email: email,
        phone: ''
      })

      console.log("done auth and user added to firestore");
      setcuurentuser(email);

      history.push('/userdashboard');

    } catch {
      alert('error');
    }

    setloading(false);
  }

  // SIGNUP FUNCTION


  // SIGNIN FUNCTION

  const signin = async (e) => {
    e.preventDefault();

    setloading(true);

    try {

      await firebase.auth().signInWithEmailAndPassword(emailref.current.value, passwordref.current.value)

      setcuurentuser(emailref.current.value);
    } catch {
      alert('error');
    }

    setloading(false);
  }

  // SIGNIN FUNCTION


  // SIGNOUT FUNCTION

  const signout = (e) => {
    e.preventDefault();

    firebase.auth().signOut().then(() => {
      console.log("logout successfull")
    }).catch((error) => {
      console.log(error)
    });
  }

  // SIGNOUT FUNCTION




  // FORGOTPASSWORD FUNCTION


  const forgotPassword = async (e) => {
    e.preventDefault();

    try {
      const actionCodeSettings = {
        url: 'https://www.example.com/?email=user@example.com',
        iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        },
        handleCodeInApp: true
      }
      console.log("done");
    }
    catch (error) {
      console.log(error)
      console.log("error");
    }

  }


  const emailref = useRef();
  const passwordref = useRef();


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

  let a = 0;

  // coursData.map((data) => {
  //   console.log(data.learn);
  // })

  return (
    <>
      <Navbar />
      <Searchbar />

      {/* <!--   ---  HOME PAGE FORM  ----    --> */}

      <div className="home">

        <div className="container">

          <div className="row">

            <div className="col-md-7">
              <div className="grand_parent">
                <h2 className="text-center mb-5"> Welcome To E- Learning</h2>

                <div className="container">

                  <Homedesign one='159' two='Total' three='Users' four='Users' />
                  <Homedesign one='102' two='Active' three='Users' four='Users' />

                </div>

                <div className="container">

                  <Homedesign one='25' two='Courses' three='Total' four='Course' />
                  <Homedesign one='55' two='Users' three='Grad' four='Users' />

                </div>

              </div>
            </div>

            <div className="col-md-5">

              <Formstructure>

                <h1>STD ADMISSION</h1>
                <form>

                  <Textbox type='text' placeholder='Name' />

                  <Textbox name="email" onChange={setValues} type='email' placeholder='Email' />

                  <Textbox name="password" onChange={setValues} type='password' placeholder='Password' />

                  <Textbox type='text' placeholder='Captcha Code' />

                  <Formbutton onClick={signup} type='submit' className='btn btn-success w-100 mb-1' href='/signin' text='Click Here To Login' />

                </form>
              </Formstructure>

            </div>

          </div>

        </div>
      </div>


      {/* <!--   ---  POPULAR COURES SECTION  ----    --> */}

      <section className="popular-courses">

        <div className="pics-container">

          <h2 className="text-center my-5">POPULAR <span className="word-color">COURSES</span></h2>

          <div className="container">
            <div className="row">

              {
                coursData.map((data) => {
                  // data.isActive ?
                  a = a + 1
                  return data.isActive && a < 5 ?

                    (<PcourseImages href='/popularcourse' data={data} />)

                    :
                    <></>
                })
              }

              {/*
              <PcourseImages href='/popularcourse' src='/images/p2.png' />

              <PcourseImages href='/popularcourse' src='/images/p3.jpg' />

              <PcourseImages href='/popularcourse' src='/images/p4.png' /> */}

            </div>
          </div>
        </div>
      </section>


      {/* <!--   ---  AVAILABLE COURSES SECTION  ----    --> */}

      <section className="available-courses">

        <h2 className="text-center py-5">AVAILABLE <span className="word-color">COURSES</span></h2>

        <div className="courses">

          <div className="row pb-5">

            {coursData.map((data) => (
              data.isActive ?
                <div className="col-md-6 mb-4">
                  {/* <AcourseCard img={data.imgurl} href='/popularcourse' heading={data.title} /> */}
                  <AcourseCard href='/popularcourse' data={data} />

                </div>
                :
                <></>

            ))
            }


            {/* <div className="col-md-6 mb-4">
              <AcourseCard img='/images/avail3.jpg' href='/popularcourse' heading='Web Development' />
            </div> */}

          </div>


          {/*
          <div className="row pb-5">
            <div className="col-md-6 mb-4">

              <AcourseCard img='/images/avail2.jpg' href='/popularcourse' heading='Python' />
            </div>


            <div className="col-md-6 mb-5">

              <AcourseCard img='/images/avail4.jpg' href='/popularcourse' heading='Javascript' />
            </div>

          </div> */}

        </div>

      </section >



      {/* <!--   ---  COMMENTS  ----    --> */}

      {/* < section className="comments" >
        <div className="comment-container">
          <div className="row">
            <div className="col-md-2">
              <img src="/images/bulb1.png" alt="" className="pt-5 px-3 w-90" />
            </div>

            <div className="col-md-4">
              <h4 className="pt-5 px-5">AN INVESTMENT IN KNOWLEDGE PAYS THE BEST INTEREST.</h4>
            </div>

            <div className="col-md-5">
              <img src="/images/user-comment.PNG" alt="" className="pt-5 px-3 w-100" />
            </div>

          </div>
        </div>
      </section > */}

      <Comments />


      {/* <!---  FOOTER  ---> */}


      {/* < footer className="page-footer font-small" >


        <div className="container-fluid text-md-left py-5">


          <div className="footer">

            <div className="row">
              <div className="col-md-5 mb-md-0 mb-3 px-5">

                <h5 className="text-uppercase mb-4">GET IN TOUCH </h5>
                <p>Learn at the comfort of yourn own home!</p>
                <p>Phone: +92 336 326552 </p>
                <p>Email: whs@gmail.com</p>

              </div>




              <div className="col-md-3 mb-md-0 mb-3 px-5">


                <h5 className="text-uppercase mb-4">Top Courses</h5>

                <ul className="list-unstyled footer-middle text-primary">

                  <li>
                    <a href="courses.html">All Courses</a>
                  </li>
                  <li>
                    <a href="verification.html">Online Verification</a>
                  </li>
                  <li>
                    <a href="aboutus.html">About Us</a>
                  </li>
                  <li>
                    <a href="contactus.html">Contact Us</a>
                  </li>
                </ul>

              </div>


              <div className="col-md-3 mb-md-0 mb-3 px-5">
                <h5 className="text-uppercase mb-4">SOCIAL MEDIA</h5>

                <ul className="list-unstyled footer-last">
                  <li>
                    <a href="facebook.com">
                      <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                  </li>

                  <li>
                    <a href="gmail.com">
                      <ion-icon name="logo-google"></ion-icon>
                    </a>
                  </li>
                  <li>
                    <a href="twitter.com">
                      <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                  </li>
                </ul>

              </div>
            </div>
          </div>

        </div>


        <div className="footer-copyright text-center py-3 text-white">2021 © Copyright:
          <a href="index.html" className="text-warning"> All rights reserved</a>
        </div>

      </footer > */}
      <Footer />





    </>
  )
}
