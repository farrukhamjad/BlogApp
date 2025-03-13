import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <>
      <section className="relative z-10 overflow-hidden py-13 bg-dark-clr">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full lg:pl-0 p-6 lg:w-5/12">
                        <div className="flex h-full flex-col">
                            <div className="mb-4 inline-flex items-center">
                                <Link to={'/'}>
                                    <Logo width="100px" />
                                </Link>
                            </div>
                            <div>
                                <p className="text-sm text-font-clr">
                                    &copy; Copyright 2025. All Rights Reserved Blog App.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-6 text-lg font-semibold uppercase text-heading-clr">
                                Help
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base text-font-clr hover:text-primary-clr hover:pl-2 transition-all"
                                        to="/"
                                    >
                                        Help Center
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base text-font-clr hover:text-primary-clr hover:pl-2 transition-all"
                                        to="/"
                                    >
                                        Help Forum
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base text-font-clr hover:text-primary-clr hover:pl-2 transition-all"
                                        to="/"
                                    >
                                        Video Tutorials
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base text-font-clr hover:text-primary-clr hover:pl-2 transition-all"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-6 text-lg font-semibold uppercase text-heading-clr">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base text-font-clr hover:text-primary-clr hover:pl-2 transition-all"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base text-font-clr hover:text-primary-clr hover:pl-2 transition-all"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base text-font-clr hover:text-primary-clr hover:pl-2 transition-all"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-6 text-lg font-semibold uppercase text-heading-clr">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base text-font-clr hover:text-primary-clr hover:pl-2 transition-all"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base text-font-clr hover:text-primary-clr hover:pl-2 transition-all"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Footer
