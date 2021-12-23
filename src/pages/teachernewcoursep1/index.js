import React from 'react'
import Searchbar from '../../components/searchbar';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import TeacherStructure from '../../components/TeacherStructure';
import { Link } from 'react-router-dom';

export default function TeacherNewCourseP1() {
  return (
    <>
      <Navbar />
      <Searchbar />

      <TeacherStructure >
        <div>
          <h2 class="text-center mt-5 mb-3">Let's start with the course you're making.</h2>

          <div class="pt-4 pb-5 px-3 mt-5 course-p1-s1 text-center border border-dark">
            <Link to="teachernewcourseP2" class="text-decoration-none text-black">
              <ion-icon name="logo-youtube"></ion-icon>
              <h4 class="mt-2">course</h4>
              <p>Create rich learning experiences with the help of video lectures, quizzes, coding excercies, etc.</p>
            </Link>
          </div>
        </div>
      </TeacherStructure>


      <Footer />
    </>
  )
}
