import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux'

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const loggedIn = useSelector(state => state.user.loggedIn)
  return (
    <>
      <nav
      
        className={
          (props.transparent
            ? "top-0 absolute z-50 w-full"
            : "relative shadow-lg bg-white shadow-lg") +
          " flex flex-wrap items-center justify-between px-2 py-3 "
        }
      >
      <div className="logo">
        <img alt="draw app logo" src={require("../assets/img/drawing-app-logo.png").default}></img>
        </div>
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            {props.home ? null : <Link className={
                (props.transparent ? "text-white" : "text-gray-800") +
                " text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              } to="/">
                Home
              </Link>}
            <div
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <div
                className={"text-pink-800 fa fa-bars"}>
              </div>
            </div>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                {props.profile ? null :  loggedIn ? <Link
                  className={
                    (props.transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  
                  to="/profile">
                  <i
                    className={
                      (props.transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " far fa-file-alt text-lg leading-lg mr-2"
                    }
                  />{" "}
                  Profile
                </Link> :
                null
                }
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                {loggedIn ? null : 
                  <Link 
                    className="bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                    type="button"
                    to="/login">
                    
                    <i className="fas fa-sign-in-alt"></i> Log-In
                  </Link>
                }
                {props.draw ? null : <Link
                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  to="/pictionary"
                >
                  <i className="fas fa-pen"></i> Let's Draw
                </Link>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
