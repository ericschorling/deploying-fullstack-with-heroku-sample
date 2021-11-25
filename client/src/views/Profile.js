import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import { useSelector } from "react-redux";
import imageService from '../services/images'

export default function Profile() {
  const imageUrl = useSelector(state => state.user.image_url)
  const fName = useSelector(state => state.user.fName)
  const lName = useSelector(state => state.user.lName)
  const userName = useSelector(state => state.user.userName)
  const [savedImages, setSavedImages] = useState([])
  const [showSaved, setShowSaved] = useState(false)
  const userID = useSelector(state=> state.user.userID)

  useEffect(()=>{
    imageService
            .getAllImages({
              userId: userID
            })
            .then(data => {
                console.log(data)
                setSavedImages(data.images)
        })
  },[userID])
  const _handleGallery =(evt)=>{
    evt.preventDefault()
    showSaved ? setShowSaved(false) : setShowSaved(true)
    
  }
  return (
    <>
      <Navbar profile/>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="profile"
                        src={require("../assets/img/default.jpeg").default}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          22
                        </span>
                        <span className="text-sm text-gray-500">Friends</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {savedImages.length}
                        </span>
                        <span className="text-sm text-gray-500">Drawings</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                    {`${fName} ${lName}`}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-user mr-2 text-lg text-gray-500"></i>{" "}
                    {userName}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        A great user who loves to draw things. Edit to tell us more about yourself!
                      </p>
                      <button 
                            className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                            type="button"
                            onClick={(evt)=>_handleGallery(evt)}
                        >
                            <i className="fas fa-images"></i>
                            Gallery
                        </button>
                      {showSaved ? 
                            <div className="saved-images">
                                {savedImages ? 
                                    savedImages.map((image, key)=>(
                                        <div className="drawing">
                                            <img key={key} alt='saved drawing' src={image.drawing_src}></img>
                                        </div>
                                    ))
                                    :null
                                }
                            </div>
                            : null
                        }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
