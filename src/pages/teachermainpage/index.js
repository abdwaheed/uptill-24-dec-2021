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
import TeacherStructure from '../../components/TeacherStructure'

export default function TeacherMainPage(props) {


  // const [uid, setuid] = useState('');
  // const [userdata, setuserdata] = useState();

  const [courses, setCourses] = useState([]);


  useEffect(() => {

    if (props.auth) {
      // console.log(props.auth.uid)
      Firestore.collection('courses').where('teacheruid', '==', props.auth.uid).get()
        .then((data) => {
          data.forEach((doc) => {
            setCourses(prevData => [...prevData, { id: doc.id, ...doc.data() }])
          })
        })
    }
    else {
    }

  }, []);

  console.log(courses);


  return (
    <>
      <Navbar />
      <Searchbar />


      <TeacherStructure>


        {/* <!-- FOR TEACHER MAIN PAGE --> */}
        <div class="main-page">
          <h1>Courses</h1>

          <div class=" d-flex justify-content-between">

            <div class="py-3">
              <input class="p-2" type="search" placeholder="Search Course" aria-label="Search" />
              <button class="btn btn-danger ms-1 mt-1" type="submit">Search</button>
            </div>

            <div class="py-3">
              <button class="btn btn-danger p-2" type="submit"><Link class="text-decoration-none text-white"
                to="/teachernewcourseP1">New
                Course</Link></button>
            </div>
          </div>

          {courses.map((course) => (
            <div class="teacher-course my-5 bg-white">
              <div class="row">
                <div class="col-md-10">
                  <div>
                    <img src={course.imgurl} alt="" class="less" />
                  </div>

                  <div class="good2 d1">
                    <Link to={{
                      pathname: "./teacherintendedlearners",
                      state: {
                        coursedetails: course
                      }
                    }}
                      class="text-dark text-decoration-none">
                      <p>{course.title}</p>

                      <div class='d2 px-4 w-100 edit-hover'
                        style={{ backgroundColor: 'none', justifyContent: 'center', alignItems: 'center', display: 'flex', height: '2rem' }}>

                        <p style={{ color: 'blue' }}>Edit/Manage Course</p>
                      </div>
                      <p class="pt-4 pb-0 mb-0">Draft <span>Public</span></p>
                    </Link>
                  </div>
                </div>

                <div class="col-md-2" style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                  <button class="w-100 btn btn-danger"><Link to="/teachercoursepreview"
                    class="text-decoration-none text-white">Preview</Link></button>
                </div>

              </div>
            </div>
          ))
          }


          {/*
          <div class="teacher-course my-5 bg-white">
            <div class="row">
              <div class="col-md-10">
                <div>
                  <img src="./images/p1.png" alt="" class="less" />
                </div>

                <div class="good2 d1">
                  <Link to="./teacherintendedlearners" class="text-dark text-decoration-none">
                    <p>Html</p>

                    <div class='d2 px-4 w-100 edit-hover'
                      style={{ backgroundColor: 'none', justifyContent: 'center', alignItems: 'center', display: 'flex', height: '2rem' }}>
                      <p style={{ color: 'blue' }}>Edit/Manage Course</p>
                    </div>
                    <p class="pt-4 pb-0 mb-0">Draft <span>Public</span></p>
                  </Link>
                </div>
              </div>

              <div class="col-md-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button class="w-100 btn btn-danger"><Link to="/teachercoursepreview"
                  class="text-decoration-none text-white">Preview</Link></button>
              </div>

            </div>

          </div>

          <div class="teacher-course my-5 bg-white">
            <div class="row">
              <div class="col-md-10">
                <div>
                  <img src="./images/p1.png" alt="" class="less" />
                </div>

                <div class="good2 d1">
                  <Link to="./teacherintendedlearners" class="text-dark text-decoration-none">
                    <p>Html</p>

                    <div class='d2 px-4 w-100 edit-hover'
                      style={{ backgroundColor: 'none', justifyContent: 'center', alignItems: 'center', display: 'flex', height: '2rem' }}>
                      <p style={{ color: 'blue' }}>Edit/Manage Course</p>
                    </div>
                    <p class="pt-4 pb-0 mb-0">Draft <span>Public</span></p>
                  </Link>
                </div>
              </div>

              <div class="col-md-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button class="w-100 btn btn-danger"><Link to="/teachercoursepreview"
                  class="text-decoration-none text-white">Preview</Link></button>
              </div>

            </div> */}



          {/* </div> */}

        </div>

      </TeacherStructure>
      {/* </section > */}

      <Footer />
    </>
  )
}
