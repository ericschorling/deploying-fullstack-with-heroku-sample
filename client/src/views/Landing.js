import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import { useSelector } from "react-redux";

export default function Landing() {
  const loggedIn = useSelector(state => state.user.loggedIn)
  console.log(loggedIn)
  return (
    <>
      <Navbar home/>
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
            style={{
              minHeight: "75vh"
            }}>
          <div className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: "url('https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')"
              }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
              <div className="container items-center flex flex-wrap">
                <div className="w-full  px-4 ml-auto mr-auto text-center">
                  <div className="pr-12">
                    <h1 className="text-black font-semibold text-5xl">
                      Let's Draw Something Fun!!
                    </h1>
                    <p className="mt-4 text-lg text-gray-800 ">
                      A small but versitle app to create and save artwork on your computer, tablet, or phone. Too much fun!
                    </p>
                  </div>
                </div>

              </div>
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
        </div>

        <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-pen"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Drawing Fun</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Use a easy to change mouse or touch based pointer to draw and create. Easy to find new and intersting shapes and colors.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Infinitely Editable
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Erase and undo changes with the click of a button. No mark is perminent and all mistakes can be fixed. 
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                      <i className="fas fa-save"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Save it for Later
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Create an account and you can save your artwork for future perusal and usage across the internet. Share your sweet images with friends and family. 
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full  px-4 mr-auto ml-auto">
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Creating with Draw App is too much Fun!!
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  This simple but versitle application allows you to use the power of Canvas in HTML to create your own artwork. Modifty the size and color of your pen to build a beautiful picture. 
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  The drawing app is versitle enough to provide you with the color and pen size options you need to build an incredible piece of artwork. The images created can be saved and shared across the internet. It reall is too much fun!
                </p>
                <Link to="/pictionary">
                  <button class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    <i class="fas fa-pen"></i> Let's Draw
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
