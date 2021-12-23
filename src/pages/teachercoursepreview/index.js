import React from 'react'
import Navbar from '../../components/navbar'
import Searchbar from '../../components/searchbar'
import Footer from '../../components/footer'
import TeacherStructure from '../../components/TeacherStructure'

export default function TeacherCoursePreview() {
  return (
    <>
      <Navbar />
      <Searchbar />

      <TeacherStructure>
        <section class="course-video bg-white">
          <div class="video-container my-5">
            <div class="ban2 text-center py-3">
              <h3 class="text-white">XYZ Course</h3>
            </div>

            <div class="ban2 p-4">
              <h4 class="text-white course-landing-imgs mb-3">What will you learn</h4>

              <div class="course-landing-imgs text-white">
                <div class="row mb-2">

                  <div class="col-md-6">
                    <li>html5</li>
                  </div>
                  <div class="col-md-6">
                    <li>css</li>
                  </div>

                </div>

                <div class="row">

                  <div class="col-md-6">
                    <li>js</li>
                  </div>
                  <div class="col-md-6">
                    <li>etc</li>
                  </div>

                </div>
              </div>


            </div>

            <div class="ban3 border-none bg-white">
              <h2>Requirements</h2>
              <li class="mt-3">html</li>

              <h2 class="mt-5">Instructor</h2>
              <h5 class="mt-3" style={{ borderBottom: '1px solid blac', display: 'inlineBlock' }}>DR Ahmed</h5>
              <p>Instructor at Udemy</p>
              <img src="./images/avail4.jpg" style={{ width: '120px', height: '120px', borderRadius: '50%' }} alt="" />
            </div>

            <div class="ban2 abcc py-3 px-4 text-white">
              <h3>Microsoft Office 2007-10 Training Courses</h3>

              <ul>
                <li>Acquire essential skills for producing professional work with the Microsoft Office suite including Word,
                  Excel, PowerPoint, and more.</li>
                <li>Microsoft offers free online courses with certificates that can help you build your skills ... Find the
                  right IT training at, onlinediploma.pk</li>
              </ul>

              <h4>About Course</h4>
              <ul>
                <li>Course Duration : 9h 11m 27sec</li>
                <li>Total Lecture : 44</li>
                <li>Language : Urdu Hindi</li>
              </ul>
            </div>

            <div class="ban2 bg-white">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/mE68wy5ZFFI" title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>


            <div class="ban2 div1 py-3 px-4 text-white" id="div1">
              <h2>OFFICE AUTOMATION (Course Outline)</h2>
              <h3 class="mb-5">Version 2007-2010 and onward</h3>
              <h3>Word Processing</h3>
              <ul>
                <li>Ms-Word, Word processing, Manual and electronic Word processing.</li>
                <li>Screen Layouts</li>
                <li>Menus</li>
                <li>Shortcut</li>
                <li>Toolbars</li>
                <li>Title Bar, Status Bar, Scroll</li>
                <li>Bars and Rulers.</li>
              </ul>
              <h3 class="mt-5 pb-2">Working with Files</h3>
              <ul>
                <li>Create, Open, Save, Rename and Close a document.</li>
                <li>Working on Multiple Documents.</li>
                <li>Cut, Copy, Paste, Special Undo and Redo Operations.</li>
                <li>Find Replace and go to Commands.</li>
                <li>Text, Paragraph and Page Formatting.</li>
                <li>Header and Footer.</li>
                <li>Date and Time.</li>
                <li>Bullets and Numbering.</li>
                <li>Columns and Drop Caps.</li>
                <li>Tabs and Margins.</li>
                <li>Comments and Foot Notes.</li>
                <li>Insert a picture and its Formatting.</li>
                <li>Use of Spelling and Grammar Check , Auto Correct Synonyms Theasurus.</li>
                <li>Page Break Section Break and Background Printing.</li>
                <li>Table of contents Glossary,</li>
                <li>Hyperlink and Bookmark.</li>
                <li>Insert a Table, Add,</li>
                <li>Delete Columns Rows and</li>
                <li>Cells.</li>
                <li>Merge and Split Cells.</li>
                <li>Formula Implementations.</li>
              </ul>

            </div>

          </div>
        </section>

      </TeacherStructure>

      <Footer />
    </>
  )
}
