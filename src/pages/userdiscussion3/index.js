
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
import UserDiscussionTextarea from '../../components/userdiscussiontextarea';
import UserDiscussionButton from '../../components/userdiscussionbutton';
import UserDiscussionStructure from '../../components/userdiscussionstructure';
import UserDiscussionComments from '../../components/userdiscussioncomments';


export default function UserDiscussion1(props) {

  const location = useLocation();
  const history = useHistory();

  // const { questionDetails } = location.state;

  const [answer, setanswer] = useState('whats up my nigga!')
  const [allreplies, setAllReplies] = useState([])


  if (props.userdata?.teacher != undefined) {
    if (props.auth === null) {
      history.push('/')
    }
    else if (props.userdata?.teacher === true) {
      history.push('/teachermainpage')
    }
    else if (!location.state?.questionDetails) {
      history.push('/userdashboard')
    }
  }



  const replyToQuestion = (e) => {
    e.preventDefault();

    Firestore.collection('questionAnswers').add({
      questionsId: location.state?.questionDetails?.id,
      answer: answer,
      commentor: firebase.auth().currentUser.email


    }).then(() => {
      alert("Your respone to this question has been added")
    }).catch(() => {
      alert('cant add your respone')
    })
  }


  useEffect(() => {

    Firestore.collection('questionAnswers').where('questionsId', '==', location.state?.questionDetails?.id)
      .get().then((allanswers) => {
        allanswers.forEach((reply) => {
          setAllReplies(prevData => [...prevData, { id: reply.id, ...reply.data(), }])
        })
      })
  }, [])

  // console.log(questionDetails)

  // console.log(allreplies)
  return (
    <div>
      <Navbar />
      <Searchbar />

      <UserDiscussionStructure heading={location.state?.questionDetails?.title}>

        <div className="py-2 pt-4">
          <h5 className="py-3 px-5">
            {location.state?.questionDetails?.description}
          </h5>

          <div class=" py-3 px-5">
            <UserDiscussionTextarea placeholder='Example: Add your comment here !' />
            <button
              onClick={replyToQuestion}
              className='mt-3 p-2 px-3 bg-dark text-white'>
              POST
            </button>
            {/* <UserDiscussionButton text='POST' href='' /> */}
          </div>

          <h4 className="px-5 pt-4">ANSWERS: </h4>
        </div>

        {allreplies?.length > 0 ?
          allreplies.map((data) => (
            <UserDiscussionComments commentor={data?.commentor} comment={data.answer} date='asnwered at  3-july-2020 12.30 pm' />
          )) :
          <>no answers for this question yet!</>
        }

        {/* <UserDiscussionComments commentor='Haris Ahmed' comment={` ajax is asynchronous request means that you cant return it when it is in progress so if you want return any thing from ajax you must call it's events like success and error.so your code must like below:  `} date='asnwered at  5-feb-2020 12.30 pm' teacher='yes' />

        <UserDiscussionComments commentor='Haris Ahmed' comment={` ajax is asynchronous request means that you cant return it when it is in progress so if you want return any thing from ajax you must call it's events like success and error.so your code must like below:  `} date='asnwered at  5-feb-2020 12.30 pm' />

        <UserDiscussionComments commentor='Mudasser Ahmed' comment={` ajax is asynchronous request means that you cant return it when it is in progress so if you want return any thing from ajax you must call it's events like success and error.so your code must like below:  `} date='asnwered at  3-jan-2021 12.30 pm' />

        <UserDiscussionComments commentor='Junaid Tareen' comment={` ajax is asynchronous request means that you cant return it when it is in progress so if you want return any thing from ajax you must call it's events like success and error.so your code must like below:  `} date='asnwered at  2-feb-2020 12.30 pm' /> */}




      </UserDiscussionStructure>

      <Footer />

    </div >
  )
}




