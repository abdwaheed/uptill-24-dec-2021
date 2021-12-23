
// FIREBASE IMPORTS

import { Link, useHistory, useLocation } from 'react-router-dom';
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
import UserDiscussionStructure from '../../components/userdiscussionstructure';
import UserDiscussionButton from '../../components/userdiscussionbutton';
import UserDiscussionTextarea from '../../components/userdiscussiontextarea';



export default function UserDiscussion1() {


  const location = useLocation();
  const { courseId } = location.state;

  const [questTitle, setquestTitle] = useState();
  const [questDescription, setquestDescription] = useState('why this error causes so much');



  useEffect(() => {
    console.log(questDescription)
  }, [questDescription])


  const askQuestion = (e) => {
    e.preventDefault();
    Firestore.collection('stdQuestions').add({

      courseId: courseId,
      title: questTitle,
      description: questDescription

    }).then(() => {
      alert("your question has been added")
    }).catch(() => {
      alert('cant add your question')
    })
  }


  return (
    <div>
      <Navbar />
      <Searchbar />

      <UserDiscussionStructure heading='FORUM'>

        {/* <h3 className='px-5 pt-4 pb-2'>Ask A Question</h3> */}

        <p class="pt-4 pb-0 px-5 bold">Enter your question Title.
        </p>

        {/* <div class=""> */}

        <div class="intend-lrn-search mb-3">
          <input type='text'
            onChange={(e) => { setquestTitle(e.target.value) }}
            class="form-control py-3 ps-3"
            type="textarea" placeholder="Example: Enter Question Title here " aria-label="Search" />
        </div>





        <p class="pt-2 pb-0 px-5 bold">Enter your question Description.
        </p>

        <div class="px-5 mb-3">
          <UserDiscussionTextarea placeholder='Example: Add your comment here !' />
        </div>


        {/* BUTTONS */}
        <div class="px-5 mb-0">
          {/* <UserDiscussionButton title={questTitle} descript={questDescription}
            text='Ask A Question' href='/teachereditlecture' /> */}
          <button
            onClick={askQuestion}
            className='bg-dark text-white p-2'>Ask a Question
          </button>
        </div>

        <div class="px-5 overflow-hidden mt-5 mb-5">
          <UserDiscussionButton courseId={courseId} text='View / Reply exisiting Question' href='/userdiscussion2' />
        </div>
        {/* BUTTONS */}


      </UserDiscussionStructure>

      <Footer />

    </div>
  )
}




