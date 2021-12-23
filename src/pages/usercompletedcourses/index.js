import React from 'react'
import Searchbar from '../../components/searchbar';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Comments from '../../components/comments';
import UserStructure from '../../components/userstructure';
import { Link } from 'react-router-dom'

export default function UserCompletedCourses() {
  return (
    <>
      <Navbar />
      <Searchbar />

      <UserStructure>
        <h3 class="pt-3">COMPLETED COURSES</h3>

        <table class="w-100">
          <thead>
            <tr>
              <td>No</td>
              <td>Course Name</td>
              <td>View Lesson</td>
              <td>Request Certificate</td>
              <td>Retake Final</td>
            </tr>
          </thead>

          <tbody>

          </tbody>

        </table>

      </UserStructure>

      <Footer />
    </>
  )
}
