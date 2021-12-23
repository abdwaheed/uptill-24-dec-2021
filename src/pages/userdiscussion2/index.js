
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



import React from 'react'
import Searchbar from '../../components/searchbar';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import UserDiscussionStructure from '../../components/userdiscussionstructure';


export default function UserDiscussion1() {


  const location = useLocation();
  const { courseId } = location.state;

  const [allQuestions, setallQuestions] = useState([])

  useEffect(() => {

    Firestore.collection('stdQuestions').where('coureId', '==', courseId)
      .get().then((allquestions) => {
        allquestions.forEach((question) => {
          console.log(question.data())
          setallQuestions(prevData => [...prevData, { id: question.id, ...question.data(), }])
        })
      })
  }, [])


  return (
    <div>
      <Navbar />
      <Searchbar />

      <UserDiscussionStructure heading='Reply to an existing question'>

        {
          allQuestions?.length > 0 ?
            allQuestions.map((data) => (
              <div className="py-2 pt-4">
                <Link to={{
                  pathname: '/userdiscussion3',
                  state: {
                    questionDetails: data
                  }
                }}
                  class="pt-4 pb-0 px-5 bold text-decoration-none"> {data.title}
                </Link>
              </div>
            ))
            :
            <>no questions added for this course yet</>
        }


        {/* <div className="py-2">
          <Link to='/userdiscussion3' class="pt-4 pb-0 px-5 bold text-decoration-none">2. Syntax error, not found.
          </Link>
        </div>

        <div className="py-2 pb-4">
          <Link to='/userdiscussion3' class="pt-4 pb-0 px-5 bold text-decoration-none">3. Program failure due to error in code.
          </Link>
        </div> */}

      </ UserDiscussionStructure >

      <Footer />

    </div >
  )
}




