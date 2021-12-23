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



import React from 'react'
import Searchbar from '../../components/searchbar';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Comments from '../../components/comments';
import CtitleDetails from '../../components/CtitleDetails';
import Iframe from '../../components/iframe';
import { useLocation } from 'react-router';

export default function Pcourses(props) {
  var isLogin = false;
  var isEnroll = false;

  const location = useLocation();

  const { coursedata } = location.state;

  console.log(coursedata.videourl);


  const [uid, setUid] = useState('');
  const auth = firebase.auth();


  useEffect(() => {
    if (auth.currentUser) {
      setUid(auth.currentUser.uid);
    }
    else {
      setUid(null);
    }
  }, [])



  // // EDIT NEW DOCUMENT FUCNTION

  const enrollCourse = async () => {

    Firestore.collection("students").doc(uid).update({
      // courses: { course3: 'web' }
      courses1: firebase.firestore.FieldValue.arrayUnion(coursedata.id)

    }, { merge: true })
      .then(() => {
        // alert("you have been enrolled in this course!");
        Firestore.collection('courses').doc(coursedata.id).update({
          students: firebase.firestore.FieldValue.arrayUnion(uid)

        }, { merge: true })
          .then(() => {
            alert('you have been enrolled in this course');
          }).catch((error) => {
            alert(error);
          })
      })
      .catch((error) => {
        alert("Error enrolling in this course: ", error);
      });



  }

  // // EDIT NEW DOCUMENT FUCNTION



  return (
    <>
      <Navbar />
      <Searchbar />



      {/* <!--   ---   POPULAR COURSE COURSE SECTION  ----    --> */}

      <section class="course-video bg-white">
        <div class="video-container my-5">

          <CtitleDetails title={coursedata.title} />

          {/* <div class="ban2  text-white">
            <div class="row">
              <div class="col-md-8 py-3">
                <h3 class="text-white text-center">XYZ Course</h3>
              </div>
              <div class="col-md-4 pt-2 text-dark text-center bg-white text-center"
                styles="display:flex; align-items:center; justify-content:center;">

                <button class="btn btn-danger py-3 px-4"><a href="" class="text-decoration-none text-white">MARKET
                  JOBS</a></button>
              </div>
            </div>
          </div>

          <div class="ban2 p-4">
            <h4 class="text-white course-landing-imgs mb-3">What will you learn</h4>

            <div class="course-landing-imgs text-white">
              <div class="row mb-2">

                <div class="col-md-6">
                  <li>html5</li>
                </div>
                <div class="col-md-6">
                  <li>css</li>
                </div>

              </div>

              <div class="row">

                <div class="col-md-6">
                  <li>js</li>
                </div>
                <div class="col-md-6">
                  <li>etc</li>
                </div>

              </div>
            </div>

          </div> */}

          <div class="ban3 border-none">
            <h2>Requirements</h2>
            <li class="mt-3">html</li>

            <h2 class="mt-5">Instructor</h2>
            <h5 class="mt-3">{coursedata.teacheruid}</h5>
            <p>Instructor at Udemy</p>
            <img src="./images/avail4.jpg" alt="" />
          </div>

          <div class="ban2 abcc py-3 px-4 text-white">
            <h3>{coursedata.title}</h3>

            <ul>
              <li>Acquire essential skills for producing professional work with the Microsoft Office suite including Word,
                Excel, PowerPoint, and more.</li>
              <li>Microsoft offers free online courses with certificates that can help you build your skills ... Find the
                right IT training at, onlinediploma.pk</li>
            </ul>

            <h4>About Course</h4>
            <ul>
              <li>Course Duration : 9h 11m 27sec</li>
              <li>Total Lecture : 44</li>
              <li>Language : Urdu Hindi</li>
            </ul>
          </div>

          <div class="ban2 bg-white">
            {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/mE68wy5ZFFI" title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe> */}


            <Iframe link={coursedata.videourl} />
          </div>


          <div class="ban2 text-center py-3">
            <div class=" course-btns-container">
              <div class="row">

                {auth.currentUser ?
                  <div class="col-md-6">
                    <Link to=""><input onClick={enrollCourse} type="submit" value="Enroll"
                      class="btn py-2 text-white w-100 bg-secondary" /></Link>
                  </div>
                  :
                  <div class="col-md-6">
                    <Link to="/signup"><input type="submit" value="Login"
                      class="btn py-2 text-white w-100 bg-secondary" /></Link>
                  </div>
                }
                {/* {isLogin && isEnroll ?
                  <div class="col-md-12">
                    <Link to="/signup"><input type="submit" value="GOTO COURSE"
                      class="btn py-2 text-white w-100 bg-secondary" /></Link>
                  </div>
                  :

                  [
                    (!isLogin ?
                      <>
                        <div class="col-md-6">
                          <Link to="/signup"><input onClick={enrollCourse} type="submit" value="Enroll"
                            class="btn py-2 text-white w-100 bg-secondary" /></Link>
                        </div>

                      </> :
                      [
                        (
                          isLogin && !isEnroll ?

                            <div class="col-md-12">
                              <Link to="/signup"><input type="submit" value="ENROLL NOW"
                                class="btn py-2 text-white w-100 bg-secondary" /></Link>
                            </div>
                            : ''
                        )
                      ]
                    )
                  ]
                } */}


              </div>
            </div>
          </div>


          <div class="ban2 div1 py-3 px-4 text-white" id="div1">
            <h2>OFFICE AUTOMATION (Course Outline)</h2>
            <h3 class="mb-5">Version 2007-2010 and onward</h3>
            <h3>Word Processing</h3>
            <ul>
              <li>Ms-Word, Word processing, Manual and electronic Word processing.</li>
              <li>Screen Layouts</li>
              <li>Menus</li>
              <li>Shortcut</li>
              <li>Toolbars</li>
              <li>Title Bar, Status Bar, Scroll</li>
              <li>Bars and Rulers.</li>
            </ul>
            <h3 class="mt-5 pb-2">Working with Files</h3>
            <ul>
              <li>Create, Open, Save, Rename and Close a document.</li>
              <li>Working on Multiple Documents.</li>
              <li>Cut, Copy, Paste, Special Undo and Redo Operations.</li>
              <li>Find Replace and go to Commands.</li>
              <li>Text, Paragraph and Page Formatting.</li>
              <li>Header and Footer.</li>
              <li>Date and Time.</li>
              <li>Bullets and Numbering.</li>
              <li>Columns and Drop Caps.</li>
              <li>Tabs and Margins.</li>
              <li>Comments and Foot Notes.</li>
              <li>Insert a picture and its Formatting.</li>
              <li>Use of Spelling and Grammar Check , Auto Correct Synonyms Theasurus.</li>
              <li>Page Break Section Break and Background Printing.</li>
              <li>Table of contents Glossary,</li>
              <li>Hyperlink and Bookmark.</li>
              <li>Insert a Table, Add,</li>
              <li>Delete Columns Rows and</li>
              <li>Cells.</li>
              <li>Merge and Split Cells.</li>
              <li>Formula Implementations.</li>
            </ul>

          </div>

        </div>
      </section>


      <Comments />
      <Footer />
    </>
  )
}
