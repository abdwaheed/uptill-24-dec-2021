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


import Navbar from '../../components/navbar'
import Searchbar from '../../components/searchbar'
import Footer from '../../components/footer'
import TeacherStructure from '../../components/TeacherStructure'

export default function TeacherProfile(props) {



  const [login, setLogin] = useState(true);

  const [uid, setuid] = useState();

  const [userdata, setuserdata] = useState({});



  useEffect(() => {

    if (props.auth) {
      setLogin(true);
      setuid(props.auth.uid);

      setuserdata(props.userdata);
      console.log(props.userdata);

    }
    else {
      setLogin(false);
    }


  }, [uid]);


  return (
    <>
      <Navbar />
      <Searchbar />

      <TeacherStructure>
        <div class="profile-teacher">
          <div class="row">
            <h2 class="pb-4 m-0 ps-0 mt-4">Profile & Settings</h2>

            <div class="col-md-6">
              <label for="" class="mb-1 mt-5 bold">First Name</label>
              <div class="p-0 ms-0 mb-3">
                <input class="form-control py-3 ps-3" type="search" placeholder="xyz" aria-label="Search" />
              </div>

              <label for="" class="mb-1 mt-1 bold">Last Name</label>
              <div class="p-0 ms-0 mb-3">
                <input class="form-control py-3 ps-3" type="search" placeholder="xyz" aria-label="Search" />
              </div>

              <label for="" class="mb-1 mt-1 bold">Phone</label>
              <div class="p-0 ms-0 mb-3">
                <input class="form-control py-3 ps-3" type="search" placeholder="1234" aria-label="Search" />
              </div>

              <label for="" class="mb-1 mt-1 bold">Email</label>
              <div class="p-0 ms-0 mb-3">
                <input class="form-control py-3 ps-3" type="search" placeholder="xyz" aria-label="Search" />
              </div>

              <label for="" class="mb-1 mt-1 bold">Password</label>
              <div class="p-0 ms-0 mb-4">
                <input class="form-control py-3 ps-3" type="search" placeholder="xyz" aria-label="Search" />
              </div>


              <img class="w-100 mt-4" src="./images/avail3.jpg" alt="" />
              <h3 class="font-weight-bold mt-3">Profile Picture
              </h3>
              <input class="mt-2" type="file" />

              {/* <!--FOR SAVE BUTTON--> */}

              <div class="mb-5 py-3 mt-4">
                <button class="btn btn-dark w-50 p-2" type="submit"><a class="text-decoration-none text-white"
                  href="./intender-learners.html">Save</a></button>
              </div>
            </div>

            <div class="col-md-6">

            </div>
          </div>
        </div>

      </TeacherStructure>

      <Footer />
    </>
  )
}
