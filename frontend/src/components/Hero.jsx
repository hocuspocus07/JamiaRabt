import React from 'react'

function Hero() {
    return (
        <section className="pt-24 bg-gray-900 pb-32">
            <div className="px-12 mx-auto max-w-7xl">
                <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                    <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-white md:text-6xl md:tracking-tight">
                        <span>Introducing</span>{' '}
                        <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">JamiaRabt</span>{' '}
                        <span className="block mt-1 text-2xl md:text-3xl text-gray-400 dark:text-gray-300 font-light">
                            Honoring Legacy, Building Futures
                        </span>
                    </h1>
                    <p className="px-0 mb-8 text-lg text-white font-light md:text-xl lg:px-24">
                        Where every alumnus finds a home. Reconnect, network, and grow together with your Jamia family.
                    </p>
                    <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                        <a href="/signup" className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0">
                            Get Started
                            <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
                <div className="w-full mx-auto mt-20 text-center md:w-10/12">
                    <div className="relative z-0 w-full mt-8">
                        <div className="relative overflow-hidden shadow-2xl">
                            <div className="flex items-center flex-none px-4 bg-green-400 rounded-b-none h-11 rounded-xl">
                                <div className="flex space-x-1.5">
                                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                                </div>
                            </div>
                            <img src="https://cdn.devdojo.com/images/march2021/green-dashboard.jpg" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;
