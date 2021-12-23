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
import UserStructure from '../../components/userstructure';

export default function UserDashboardEdit(props) {



  const [login, setLogin] = useState(true);

  const [uid, setuid] = useState();

  const [userdata, setuserdata] = useState({});

  useEffect(() => {

    if (props.auth) {
      setLogin(true);
      setuid(props.auth.uid);
      setuserdata(props.userdata);
      console.log(props.userdata);
      setName(userdata?.name);
      setPhone(userdata?.phone);
    }
    else {
      setLogin(false);
    }

  }, [uid]);

  console.log(userdata);



  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');


  // // EDIT NEW DOCUMENT FUCNTION

  const editdoc = async () => {

    Firestore.collection("students").doc(uid).set({
      name: name,
      email: userdata?.email,
      phone: phone
    })
      .then(() => {
        console.log("Document successfully edited!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  // // EDIT NEW DOCUMENT FUCNTION



  // function setValues(ev) {
  //   const { name, value } = ev.target
  //   switch (name) {
  //     case "email":
  //       setName(value);
  //       break;
  //     case "password":
  //       setPhone(value);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  return (
    <>
      <Navbar />
      <Searchbar />

      <UserStructure isStudent={true} btnvalue='Save' onClick={editdoc} >

        <tr>
          <h3 class="pt-3">MY PROFILE</h3>
        </tr>
        <tr>
          <td class="ps-2">Roll No</td>
          <td>:</td>
          <td><input class="bg-light" type="text" placeholder="1234" readonly /></td>
        </tr>
        <tr>
          <td class="ps-2">Name</td>
          <td>:</td>
          <td><input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /></td>
        </tr>
        <tr>
          <td class="ps-2">Email</td>
          <td>:</td>
          <td><input class='bg-light' type="text" value={userdata?.email} readonly /></td>
        </tr>
        <tr>
          <td class="ps-2">Gender</td>
          <td>:</td>
          <td><select class="p-2 w-100">
            <option value="">male</option>
            <option value="">female</option>
          </select></td>
        </tr>
        <tr>
          <td class="ps-2">Mobile</td>
          <td>:</td>
          <td><input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} /></td>
        </tr>
        <tr>
          <td class="ps-2">Address</td>
          <td>:</td>
          <td><input type="text" /></td>
        </tr>
        <tr>
          <td class="ps-2">City</td>
          <td>:</td>
          <td><input type="text" value="das" /></td>
        </tr>
        <tr>
          <td class="ps-2">Country</td>
          <td>:</td>
          <td><select class="p-2 w-100">
            <option value="">USA</option>
            <option value="">CANADA</option>
          </select></td>
        </tr>


      </UserStructure>

      <Footer />
    </>
  )
}
