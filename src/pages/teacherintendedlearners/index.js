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
export default function TeacherIntendedLearners() {


  const [title, setTitle] = useState('');
  const [learn, setLearn] = useState('');
  const [requirements, setRequirements] = useState('');
  const [videourl, setVideourl] = useState('');
  const [img, setImg] = useState('');



  const [file, setfile] = useState([]);

  const showFile = (e) => {
    console.log(e.target.files[0])
    setfile(e.target.files[0]);
    // setImg(file.url);
  }


  // uploadind data to firestore and storage

  const uploadfiles = () => {
    const currentUser = firebase.auth().currentUser;

    console.log(file);

    // if (file.length <= 0) {
    if (!file) {
      console.log("cant upload file");
      alert("please select image firse");
      return;
    }

    var storageRef = firebase.storage().ref();
    if (currentUser) {
      var uploadtask = storageRef.child(`/courseimage/${currentUser.uid}/${file.name}`);


      uploadtask.put(file).then((snapshot) => {
        console.log(snapshot);

        uploadtask.getDownloadURL().then((url) => {

          console.log(url);

          Firestore.collection("courses").add({
            imgurl: url,
            title: title,
            learn: learn,
            requirement: requirements,
            teacheruid: currentUser.uid,
            videourl: videourl,
            isActive: true,
          })
            .then(() => {
              alert("course has been added now");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        })
      }).catch(() => {
        console.log("cant upload file");
      });

    }
    else {
      alert("log-in first")
    }
    // ADDING DOWNLOADURL TO DATABASE

  };


  const editfiles = () => {
    const currentUser = firebase.auth().currentUser;

    if (file) {
      console.log('file is selected waheed');
    }
    else {
      console.log('no file selected')
    }


    if (file) {
      var storageRef = firebase.storage().ref();
      console.log('user exists');

      if (currentUser) {
        var uploadtask = storageRef.child(`/courseimage/${currentUser.uid}/${file.name}`);


        uploadtask.put(file).then((snapshot) => {
          console.log(snapshot);

          uploadtask.getDownloadURL().then((url) => {

            console.log(url);


            Firestore.collection("courses").doc(coursedetails.id).set({
              imgurl: url,
              title: title,
              learn: learn,
              requirement: requirements,
              teacheruid: currentUser.uid,
              videourl: videourl,
              isActive: true
            }, { merge: true })
              .then(() => {
                alert("course has been added");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
          })
        }).catch(() => {
          console.log("cant upload file");
        });

      }
      else {
        alert("log-in first")
      }
    }

    //if file is not selected
    else {
      if (currentUser) {
        console.log('file is not selected')
        // Firestore.collection('course').doc(coursedetails.id).collection(coursedetails.id)
        Firestore.collection("courses").doc(coursedetails.id).set({
          imgurl: coursedetails.imgurl,
          title: title,
          learn: learn,
          requirement: requirements,
          teacheruid: currentUser.uid,
          videourl: videourl,
          isActive: true
        }, { merge: true })
          .then(() => {
            alert("course has been updated");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
      else {
        alert("log-in first")
      }
    }
  };
  // ADDING DOWNLOADURL TO DATABASE




  const [coursedetails, setCoursedetails] = useState();

  const location = useLocation();


  // const [title, setTitle] = useState('');
  // const [learn, setLearn] = useState('');
  // const [requirements, setRequirements] = useState('');
  // const [videourl, setVideourl] = useState('');



  useEffect(() => {

    if (location.state) {
      const { coursedetails } = location.state;
      setCoursedetails(coursedetails);

      setTitle(coursedetails.title);
      setLearn(coursedetails.learn);
      setRequirements(coursedetails.requirement);
      setVideourl(coursedetails.videourl);
      setImg(coursedetails.imgurl);

      console.log(coursedetails);
    }
  }, [])



  return (
    <>
      <Navbar />
      <Searchbar />

      <TeacherStructure>

        <div class="intended-learners my-5">

          <div class="dog d-flex justify-content-between overflow-hidden">
            <div>
              <h3 class="py-4 px-5">Intended Learners</h3>
            </div>
            {coursedetails ?
              <div class="mt-4"><button class="me-4 py-2">
                <Link to={{
                  pathname: "./teacherlectures",
                  state: {
                    coursedetails: coursedetails
                  }
                }}
                  class="text-dark text-decoration-none">
                  GOTO LECTURES</Link></button>
              </div>
              : <></>
            }
          </div>

          <p class="pt-4 pb-0 px-5 bold">What about a Course title?
          </p>
          <div class="intend-lrn-search mb-3">
            <input name='title'
              value={title}
              onChange={(e) => { setTitle(e.target.value) }}
              class="form-control py-3 ps-3" type="search"
              placeholder="Example: C#, Java etc" aria-label="Search" />
          </div>


          <p class="pt-4 pb-0 px-5 bold">What will students learn in this course?
          </p>
          <p class="px-5">Please enter the learning objectives or outcomes that learners can expect to achieve after
            completing
            your course.</p>

          <div class="intend-lrn-search mb-3">
            <input name='learn'
              value={learn}
              onChange={(e) => { setLearn(e.target.value) }}
              class="form-control py-3 ps-3" type="search"
              placeholder="Example: Define the roles and reponsibilities of a project manager" aria-label="Search" />
          </div>
          {/*
          <div class="intend-lrn-search mb-3">
            <input class="form-control py-3 ps-3" type="search" placeholder="Example: Project timelines and budget"
              aria-label="Search" />
          </div>

          <div class="intend-lrn-search mb-3">
            <input class="form-control py-3 ps-3" type="search" placeholder="Example: Identify and manage project risks"
              aria-label="Search" />
          </div>
          <div class="intend-lrn-search mb-3">
            <input class="form-control py-3 ps-3" type="search" placeholder="Example: Identify and manage project risks"
              aria-label="Search" />
          </div> */}

          <p class="pt-4 pb-0 px-5 bold">What are the requirements or prerequisites for taking your course?
          </p>
          <p class="px-5">List the required skills, experience, tools or equipment learners should have prior to taking your
            course.
            If there are no requirements, use this space as an opportunity to lower the barrier for beginners.</p>

          <div class="intend-lrn-search mb-3">
            <input name='requirements'
              value={requirements}
              onChange={(e) => { setRequirements(e.target.value) }}
              class="form-control py-3 ps-3" type="search"
              placeholder="Example: No Programming experience needed. You will learn everythin you need."
              aria-label="Search" />
          </div>
          {/*
          <div class="intend-lrn-search mb-3">
            <input class="form-control py-3 ps-3" type="search"
              placeholder="Example: No Programming experience needed. You will learn everythin you need."
              aria-label="Search" />
          </div> */}

          {/* for uploading image  */}

          <p class="pt-4 pb-0 px-5 bold">What about Course Preview Image ?
          </p>
          {coursedetails ?
            <div class="intend-lrn-search mb-3">
              <img src={img} alt="no image found" />
            </div>
            : <></>
          }


          <div class="intend-lrn-search mb-3">
            <input type='file' onChange={showFile} class="bg-dark text-white form-control py-3 ps-3"
              aria-label="Search" />
          </div>

          {/* for uploading image  */}



          {/* for course promo video  */}

          <p class="pt-4 pb-0 px-5 bold">Provide link for promo video.
          </p>
          <div class="intend-lrn-search mb-3">
            <input type='text'
              value={videourl}
              onChange={(e) => { setVideourl(e.target.value) }}
              class="form-control py-3 ps-3"
              aria-label="Search" />
          </div>

          {/* for course promo video  */}







          {/* <p class="pt-4 pb-0 px-5 bold">Who is this course for?
          </p>
          <p class="px-5">Write a clear description of the intended learners for your course who will find your course
            content valuable.
            This will help you attract the right learners to your course.</p>

          <div class="intend-lrn-search mb-3">
            <input class="form-control py-3 ps-3" type="search"
              placeholder="Example:Beginners Python curious about data science" aria-label="Search" />
          </div> */}
          <div class="intend-lrn-search mb-5 py-3">
            <button onClick={coursedetails ? editfiles : uploadfiles} class="btn btn-dark w-50 p-2" type="submit">
              <a class="text-decoration-none text-white">{coursedetails ? 'Edit Course' : 'Add Course heey'}</a>
            </button>
          </div>

        </div>

      </TeacherStructure>

      <Footer />

    </>
  )
}
