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

export default function TeacherQuiz() {


  const location = useLocation();
  // const { quizdetails } = location.state;

  const [id, setId] = useState('');

  const [questions, setQuestions] = useState([]);

  const [question, setQuestion] = useState("")
  const [option1, setOption1] = useState("")
  const [option2, setOption2] = useState("")
  const [option3, setOption3] = useState("")
  const [option4, setOption4] = useState("")
  const [answer, setAnswer] = useState("")

  const [singleQuestion, setSingleQuestion] = useState();
  // console.log("State Change: ", questions)
  const { lecture } = location.state;


  useEffect(() => {
    if (location.state) {
      const { quizId } = location.state;
      setId(quizId);
      console.log(quizId);


      //coming from quizquestions
      // const { lecture } = location.state;
      if (lecture) {
        setSingleQuestion(lecture)

        console.log(lecture.id)
        setQuestion(lecture.question)
        setOption1(lecture.option1)
        setOption2(lecture.option2)
        setOption3(lecture.option3)
        setOption4(lecture.option4)
        setAnswer(lecture.answer)
      }


    }
  }, [])

  //ADDING QUESTIONS TO DATABASE
  const submitquiz = (e) => {
    e.preventDefault();
    // var db = firebase.firestore();
    var batch = Firestore.batch()
    questions.forEach((doc) => {
      var docRef = Firestore.collection("questions_test").doc(); //automatically generate unique id
      batch.set(docRef, doc);
    });
    batch.commit()
    alert('quizz has been added')

  }

  //ADDING QUESTIONS TO DATABASE
  const [totalQuestions, settotalQuestions] = useState(0)

  const addQuest = (e) => {
    e.preventDefault()
    setQuestions([...questions, { question, option1, option2, option3, option4, answer, id }])
    settotalQuestions(totalQuestions + 1)
  }


  const EditQuestion = (e) => {
    e.preventDefault()

    Firestore.collection('questions_test').doc(lecture.questId).update({
      question: question,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      answer: answer,
    }).then(() => {
      alert('question has been updated')
    }).catch(() => {
      alert('cant update question')
    })

  }

  // console.log(lecture.questId);

  return (
    <>
      <Navbar />
      <Searchbar />

      <TeacherStructure>
        <div class="intended-learners my-5">
          <div class="dog d-flex justify-content-between overflow-hidden">
            <div>
              <h3 class="py-4 px-5">{singleQuestion ? 'EDIT' : 'ADD'} QUIZ QUESTION HERE</h3>
            </div>

            {/* <div class="mt-4"><button class="me-4 py-2"><Link to="/teachereditlecture"
                  class="text-dark text-decoration-none">
                  EDIT LECTURE</Link></button></div> */}
          </div>

          {/* <p class="pt-4 pb-0 px-5 bold">Enter Quiz Number
              </p>


              <div class="intend-lrn-search mb-3">
                <input class="form-control py-3 ps-3" type="search" placeholder="Example:Enter Lecture Number to Add / Edit " aria-label="Search" />
              </div> */}

          <p class="pt-4 pb-0 px-5 bold">Enter Question
          </p>


          <div class="intend-lrn-search mb-3">
            <input class="form-control py-3 ps-3"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              type="search" placeholder="Example: Enter Question Here "
              aria-label="Search" />
          </div>

          <p class="pt-4 pb-0 px-5 bold">Enter Options In Give Below Text Boxes
          </p>


          <div class="intend-lrn-search mb-3">
            <input class="form-control py-3 ps-3"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              type="search" placeholder="Enter Option 1 "
              aria-label="Search" />
          </div>
          <div class="intend-lrn-search mb-3">
            <input class="form-control py-3 ps-3"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              type="search" placeholder="Enter Option 2 "
              aria-label="Search" />
          </div>
          <div class="intend-lrn-search mb-3">
            <input class="form-control py-3 ps-3"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
              type="search" placeholder="Enter Option 3 "
              aria-label="Search" />
          </div>

          <div class="intend-lrn-search mb-3">
            <input class="form-control py-3 ps-3"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
              type="search" placeholder="Enter Option 4 "
              aria-label="Search" />
          </div>



          <p class="pt-4 pb-0 px-5 bold">Enter Correct Option Number
          </p>


          {/* radio buttons */}
          <div class="form-check">
            <input class="form-check-input"
              onClick={(val) => setAnswer(val.target.value)}
              value="0" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
              checked={answer == '0' ? true : false} />
            <label class="form-check-label" for="flexRadioDefault1">
              Option1
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input"
              onClick={(val) => setAnswer(val.target.value)}
              value="1" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
              checked={answer == '1' ? true : false} />
            <label class="form-check-label" for="flexRadioDefault2">
              Option2
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input"
              onClick={(val) => setAnswer(val.target.value)}
              value="2" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
              checked={answer == '2' ? true : false} />
            <label class="form-check-label" for="flexRadioDefault2">
              Option3
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
              onClick={(val) => setAnswer(val.target.value)}
              value="3"
              checked={answer == '3' ? true : false} />
            <label class="form-check-label" for="flexRadioDefault2">
              Option4
            </label>
          </div>

          {/* radio buttons */}

          {
            !singleQuestion ?
              <>
                {totalQuestions <= 3 ?
                  <div class="intend-lrn-search mb-5 py-3">
                    <button onClick={addQuest} class="btn btn-dark w-50 p-2" type="button"><a class="text-decoration-none text-white"
                      href="">Add Question</a></button>
                  </div>
                  :
                  <div class="intend-lrn-search mb-5 py-3">
                    <button
                      onClick={submitquiz}
                      class="btn btn-dark w-50 p-2" type="button"><a class="text-decoration-none text-white"
                        href="">Submit Quiz</a></button>
                  </div>
                }
              </>
              :
              <div class="intend-lrn-search mb-5 py-3">
                <button
                  onClick={EditQuestion}
                  class="btn btn-dark w-50 p-2" type="button"><a class="text-decoration-none text-white"
                    href="">EDIT QUESTION</a></button>
              </div>

          }
        </div>

      </TeacherStructure>

      <Footer />
    </>
  )
}
