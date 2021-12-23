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
import Navbar from '../../components/navbar'
import Searchbar from '../../components/searchbar'
import Footer from '../../components/footer'
import TeacherStructure from '../../components/TeacherStructure'


export default function TeacherEditLecture() {


  const location = useLocation();

  const { lecture } = location.state;
  const { courseId } = location.state;
  const [removeurl, setRemoveUrl] = useState(false);
  const [lectureUrl, setLectureUrl] = useState(lecture);


  // // EDIT NEW DOCUMENT FUCNTION

  const editLecture = async (e) => {

    e.preventDefault();

    Firestore.collection("courses").doc(courseId).update({
      lectures: firebase.firestore.FieldValue.arrayRemove(lecture)
    }, { merge: true })
      .then(() => {
        setRemoveUrl(true);
      })
      .catch((error) => {
        alert("Cant update course: ", error);
      });


    // ADDING NEW URL

    Firestore.collection("courses").doc(courseId).update({
      lectures: firebase.firestore.FieldValue.arrayUnion(lectureUrl)
    }, { merge: true })
      .then(() => {
        alert("Lecture has been updated!");
      })
      .catch((error) => {
        alert("Cant update course: ", error);
      });

  }

  // // EDIT NEW DOCUMENT FUCNTION


  useEffect(() => {

  }, [])



  return (
    <>
      <Navbar />
      <Searchbar />

      <TeacherStructure>
        <div class="intended-learners my-5">
          <div class="dog d-flex justify-content-between overflow-hidden">
            <div>
              <h3 class="py-4 px-5">EDIT LECTURE</h3>
            </div>

          </div>



          {/*
          <p class="pt-4 pb-0 px-5 bold">Enter Lecture Number
          </p>

          <div class=" d-flex justify-content-between overflow-hidden">

            <div class="intend-lrn-search mb-3">
              <input class="form-control py-3 ps-3" type="search" placeholder="Example: Enter Lecture Number to Find " aria-label="Search" />
            </div>

            <div class="mt-2"><button class="me-4 py-2"><Link to="/teachereditlecture"
              class="text-dark text-decoration-none">
              FIND LECTURE</Link></button>
            </div>
          </div>

          <p class="pt-4 pb-0 px-5 bold">Enter Lecture Title
          </p>


          <div class="intend-lrn-search mb-3">
            <input class="form-control py-3 ps-3" type="search" placeholder="Example: Enter Lecture Title "
              aria-label="Search" />
          </div>

          <p class="pt-4 pb-0 px-5 bold">Enter Lecture Description
          </p>


          <div class="intend-lrn-search mb-3">
            <input class="form-control py-3 ps-3" type="search" placeholder="Example: Enter Lecture Description "
              aria-label="Search" />
          </div> */}


          <p class="pt-4 pb-0 px-5 bold">Enter Youtube Link For The Lecture to "Edit"
          </p>



          <div class="intend-lrn-search mb-3">
            <input
              value={lectureUrl}
              onChange={(e) => { setLectureUrl(e.target.value) }}
              class="form-control py-3 ps-3"
              type="search"
              placeholder="Example: Enter URL / LINK "
              aria-label="Search" />
          </div>



          <div class="intend-lrn-search mb-5 py-3">
            <button
              onClick={editLecture}
              class="btn btn-dark w-50 p-2"
              type="submit">
              <a class="text-decoration-none text-white"
                href="">Update
              </a>
            </button>
          </div>

        </div>

      </TeacherStructure>

      <Footer />
    </>
  )
}
