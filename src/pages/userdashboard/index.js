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
import UserStructure from '../../components/userstructure';
// import UserButton from '../../components/userbutton';

export default function UserDashboard(props) {


  const [login, setLogin] = useState(true);

  const [uid, setuid] = useState();

  const [userdata, setuserdata] = useState({});





  useEffect(() => {

    // const getData = async (uid) => {
    //   const data = await Firestore.collection('students').doc(uid).get();
    //   // const data = await userdata.data();
    //   setuserdata(data.data());
    // }

    // const getdata = async () => {
    //   const udata = await Firestore.collection('students').doc(uid).get();
    //   const data = udata.data();
    // }

    if (props.auth) {
      setLogin(true);
      setuid(props.auth.uid);
      // Firestore.collection('students').doc(uid).get().then((snapshot) => {
      //   setuserdata(snapshot.data());
      // });
      setuserdata(props.userdata);
      console.log(props.userdata);


      // getData(uid);
      // console.log(userdata);
    }
    else {
      setLogin(false);
    }
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     setLogin(true);

    //     setuid(firebase.auth().currentUser.uid);

    //     // const { data } = await Firestore.collection('students').doc(uid).get();

    //     // setuserdata(data);

    //     Firestore.collection('students').doc(uid).get().then((snapshot) => {
    //       setuserdata(snapshot.data());
    //     })
    //   }
    //   else {
    //     setLogin(false);
    //   }
    // })

  }, [uid]);

  // console.log(userdata);
  // *** important *** //
  // console.log(userdata?.name);
  // console.log(userdata?.name);
  // *** important *** //
  console.log(userdata?.name);

  return (

    <>
      <Navbar />
      <Searchbar />


      <UserStructure isStudent={true} btnvalue='Edit Profile' >

        <tr>
          <h3 class="pt-3">MY PROFILE</h3>
        </tr>
        <tr>
          <td class="ps-2">Roll No</td>
          <td class="w">:</td>
          <td className='bg-light'>{uid}</td>
        </tr>
        <tr>
          <td class="ps-2">Name</td>
          <td>:</td>
          <td>{userdata?.name}</td>
        </tr>
        <tr>
          <td class="ps-2">Email</td>
          <td>:</td>
          <td className='bg-light'>{userdata?.email}</td>
        </tr>
        <tr>
          <td class="ps-2">Gender</td>
          <td>:</td>
          <td>Male</td>
        </tr>
        <tr>
          <td class="ps-2">Mobile</td>
          <td>:</td>
          <td>{userdata?.phone}</td>
        </tr>
        <tr>
          <td class="ps-2">Address</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td class="ps-2">City</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td class="ps-2">Country</td>
          <td>:</td>
          <td></td>
        </tr>

        {/* <UserButton /> */}

      </UserStructure>

      < Footer />

    </>

  )
}
