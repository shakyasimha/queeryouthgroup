import React from 'react'
import { Link } from 'react-router-dom'

import QYGLogo from '../assets/QYGpng.png'

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "#F5EFE0" }} className="h-16 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex items-center justify-start space-x-3">
                <img src={QYGLogo} className="h-12 w-auto" alt="QYG Logo" />
                <span style={{ color: "#D41367" }} className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> Queer Youth Group </span>
            </div>
            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <Link to="/about" style={{ color: "#D41367 "}} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" style={{ color: "#D41367 "}} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
                            Contact Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/blog" style={{ color: "#D41367 "}} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link to="/donate" style={{ color: "#D41367 "}} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
                            Donate
                        </Link>
                    </li>
                    <li>
                        <Link to="/services" style={{ color: "#D41367 "}} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
                            Our Services
                        </Link>
                    </li>
                    <li>
                        <Link to="/team" style={{ color: "#D41367 "}} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
                            Our Team
                        </Link>
                    </li>
                    <li>
                        <Link to="/resources" style={{ color: "#D41367 "}} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
                            Resources
                        </Link>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar