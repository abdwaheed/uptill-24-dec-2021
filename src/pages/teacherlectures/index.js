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
import Comments from '../../components/comments';
import UserplaycourseLectures from '../../components/UserplaycourseLectures';
import Formbutton from '../../components/formbutton';
import TeacherLecturesButton from '../../components/teacherlecturesbutton';

export default function TeacherLectures() {


  const location = useLocation();

  const { coursedetails } = location.state;

  const [lecturedata, setLecturedata] = useState([]);

  useEffect(() => {

    // console.log(coursedetails);

    let data = [];
    if (coursedetails.lectures) {
      coursedetails?.lectures.map((lectures) => {
        // Firestore.collection('courses').doc(coursedetails.id).get().then(res => {
        // if (res.exists) {
        data.push(lectures);
        // console.log(data);
        // setLecturedata(prevData => [...prevData, { ...lectures }])
      })
    }
    console.log(data);
    setLecturedata(data);
    // console.log(lecturedata);
    // })
    // })

    // props.userdata?.courses1.map((course) => {
    // Firestore.collection("courses").doc(course).get().then(res => {
    //   if (res.exists)
    //     setCoursedata(prevData => [...prevData, { id: res.id, ...res.data() }])
    // })
    // })
  }, [])

  // console.log(lecturedata);
  // console.log(coursedetails.id);

  return (
    <>
      <Navbar />
      <Searchbar />

      <section class="dashboard-lesson pt-5">
        <div class="banner text-center py-5 text-white bg-danger" styles="background-color: #dc3545;">
          <h2>ANY LECTURE NAME</h2>

        </div>
      </section>


      <section class="user-panel available-courses">

        <div class="courses1 py-5">

          <div class="ten text-white">
            <div className="row text-dark px-4 text-center">
              <h3>ALL LECTURES</h3>
            </div>


            {/* <TeacherLecturesButton text='ADD QUIZ' href='/teaaccherquiz' /> */}
            <TeacherLecturesButton data={coursedetails.id} text='QUIZZES' href='/quizzes' />

            <TeacherLecturesButton text='ADD LECTURE' data={coursedetails}
              href='/teacheruploadlecture' />

            <TeacherLecturesButton text='Q n A' href='/userdiscussion2' />


            <div class={`row mt-5`}>
              {lecturedata.length > 0 ? lecturedata.map((data) => (
                <UserplaycourseLectures
                  // course={coursedetails.id}
                  lecture={data} path='/teachereditlecture' style='mt-5' />
              ))
                :
                <div className='text-dark'>no lectures for this course</div>

              }

              {/*
              <UserplaycourseLectures path='/teachereditlecture' />

              <UserplaycourseLectures path='/teachereditlecture' />

              <UserplaycourseLectures path='/teachereditlecture' /> */}
            </div>

          </div>
        </div>

      </section>

      <Footer />

    </>
  )
}
