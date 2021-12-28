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
import Navbar from '../../components/navbar'
import Searchbar from '../../components/searchbar'
import Footer from '../../components/footer'
import TeacherStructure from '../../components/TeacherStructure'
import { Redirect, useLocation } from 'react-router';

export default function ActualQuiz(props) {

  const history = useHistory();
  const location = useLocation();


  const [title, setTitle] = useState("")

  // const courseData;
  // const courseData = null;
  // if (!props.auth) {
  //   history.push('/')
  // }

  // else if (props.userdata[0].teacher) {
  //   if (!location.state?.courseData) {
  //     history.push('/teachermainpage')
  //   }
  // }
  // else {
  //   history.push('/userdashboard')
  // }



  if (props.userdata?.teacher != undefined) {
    if (props.auth === null) {
      history.push('/')
    }
    else if (props.userdata?.teacher === false) {
      history.push('/userdashboard')
    }
    if (!location.state?.courseData) {
      history.push('/teachermainpage')
    }
  }



  useEffect(() => {

    // if (location.state) {
    //   const { courseData } = location.state;

    //   console.log(courseData)
    // }
    // else {
    //   history.push('/teachermainpage')
    // }
  }, [])

  const addQuest = (e) => {
    e.preventDefault();
    Firestore.collection('quizzes').add({
      title: title,
      courseId: location.state?.courseData
    }).then((doc) => {
      history.push({
        pathname: '/teacherquiz',
        state: {
          quizId: doc.id
        }
      })
      console.log(doc.id);
    })
  }

  return (
    <>
      <Navbar />
      <Searchbar />

      <TeacherStructure>
        <div class="intended-learners my-5">
          <div class="dog d-flex justify-content-between overflow-hidden">
            <div>
              <h3 class="py-4 px-5">QUIZ DETAILS</h3>
            </div>

          </div>

          <p class="pt-4 pb-0 px-5 bold">Enter Quiz Title
          </p>
          <div class="intend-lrn-search mb-3">
            <input onChange={(e) => setTitle(e.target.value)} class="form-control py-3 ps-3" type="search" aria-label="Search" />
          </div>


          <div class="intend-lrn-search mb-5 py-3">
            <button onClick={addQuest}
              class="btn btn-dark w-50 p-2" type="button">
              ADD QUIZ
            </button>
          </div>

        </div>

      </TeacherStructure>

      <Footer />
    </>
  )
}
