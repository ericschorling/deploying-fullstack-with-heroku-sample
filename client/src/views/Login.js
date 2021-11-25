import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoggedIn, setUserData } from "../features/user/userSlice";
import imageService from '../services/images'

export default function Login() {
  const [userName, setUserName] = useState('')
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.user.loggedIn)
  //const fName = useSelector(state => state.user.fName)
  const [signup, setSignUp] = useState(false)
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [email, setEmail] = useState('')
  const _handleLogin =(evt) =>{
    evt.preventDefault()
    
    imageService
      .getLoggedInUser({
        user: userName
      })
      .then(data => dispatch(setUserData(data[0])))
    
    dispatch(setLoggedIn())
    navigate("/")
  }
  const _handleUserInput=(evt, type)=>{
    let value = evt.target.value
    switch (type) {
      case 'first':
        setFName(value)
        break;
      case 'last':
        setLName(value)
        break;
      case 'email':
        setEmail(value)
        break;
      case 'user':
        setUserName(value)
        break;
      default:
        break;
    }
  }
  const _handleSignup=(evt)=>{
    evt.preventDefault()
    imageService
      .addUser({
        fName: fName,
        lName: lName,
        userName: userName,
        email: email
      })
      .then(data => {
        dispatch(setUserData(data[0]))
        console.log(data)
      })
    dispatch(setLoggedIn())
    navigate("/")
  }
  const _switchLogin =(evt)=>{
    evt.preventDefault()
    signup ? setSignUp(false) : setSignUp(true)
  }
  return (
    <>
      <main>
        <section className="absolute w-full h-full">
        
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                "url(" + require("../assets/img/register_bg_2.png").default + ")",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full px-4">
                <div className="relative flex flex-row flex-wrap min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  {signup ? 
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <h4>Sign Up</h4>
                    </div>
                    <form autoComplete="on">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-6/12"
                          placeholder="First Name"
                          style={{ transition: "all .15s ease" }}
                          onChange={(evt)=>_handleUserInput(evt,'first')}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Last Name
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-6/12"
                          placeholder="Last Name"
                          style={{ transition: "all .15s ease" }}
                          onChange={(evt)=>_handleUserInput(evt,'last')}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                          onChange={(evt)=>_handleUserInput(evt,'email')}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          User Name
                        </label>
                        <input
                          type="user"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="User Name"
                          style={{ transition: "all .15s ease" }}
                          onChange={(evt)=>_handleUserInput(evt,'user')}
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={(evt)=>_handleSignup(evt)}
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                    <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={(evt)=>_switchLogin(evt)}
                        >
                          Log In
                        </button>
                      </div>
                      <Link 
                        className="text-gray-800 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                        to={"/"}
                      >Home</Link>
                  </div> : 
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <h4>Sign In</h4>
                    </div>
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          User Name
                        </label>
                        <input
                          type="user"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="User Name"
                          style={{ transition: "all .15s ease" }}
                          onChange={(evt)=>_handleUserInput(evt)}
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={(evt)=>_handleLogin(evt)}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                    <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={(evt)=>_switchLogin(evt)}
                        >
                          Create New Account
                        </button>
                      </div>
                      <Link 
                        className="text-gray-800 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                        to={"/"}
                      >Home</Link>
                  </div> }
                </div> 
              </div>
            </div>
          </div>
          {/* <Footer/> */}
        </section>
      </main>
    </>
  );
}
