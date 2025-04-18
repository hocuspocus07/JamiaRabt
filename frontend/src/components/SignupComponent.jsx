import React, { useState } from 'react';

function SignupComponent() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen lg:min-w-7xl flex justify-center items-center bg-gray-900 p-4">
      <div className={`bg-white rounded-xl shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-full max-w-[768px] min-h-[480px]`}>
        
        {/* Sign Up Form */}
        <div className={`absolute top-0 h-full w-full md:w-1/2 left-0 transition-all duration-600 ease-in-out opacity-0 z-1 ${isRightPanelActive ? 'translate-x-0 md:translate-x-full opacity-100 z-5' : ''}`}>
          <form onSubmit={handleSubmit} className="bg-white flex items-center justify-center flex-col py-0 px-4 md:px-[50px] h-full text-center">
            <h1 className="font-bold m-0 text-gray-800 text-2xl">Create Account</h1>
            <div className="my-5 mx-0">
              <a href="#" className="border border-[#DDDDDD] rounded-full inline-flex justify-center items-center mx-1 my-0 h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#333">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="#" className="border border-[#DDDDDD] rounded-full inline-flex justify-center items-center mx-1 my-0 h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#333">
                  <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814c-1.784-1.672-4.166-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-.768-.083-1.53-.248-2.271h-9.752z"/>
                </svg>
              </a>
              <a href="#" className="border border-[#DDDDDD] rounded-full inline-flex justify-center items-center mx-1 my-0 h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#333">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
            <span className="text-xs text-gray-600">or use your email for registration</span>
            <input 
              type="text" 
              name="name"
              placeholder="Name" 
              className="bg-[#eee] border-none py-3 px-4 my-2 mx-0 w-full text-gray-800"
              value={formData.name}
              onChange={handleChange}
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              className="bg-[#eee] border-none py-3 px-4 my-2 mx-0 w-full text-gray-800"
              value={formData.email}
              onChange={handleChange}
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              className="bg-[#eee] border-none py-3 px-4 my-2 mx-0 w-full text-gray-800"
              value={formData.password}
              onChange={handleChange}
            />
            <button 
              type="submit"
              className="rounded-3xl border border-[#FF4B2B] bg-[#FF4B2B] text-white text-xs font-bold py-3 px-11 uppercase tracking-[1px] transition-transform duration-80 ease-in focus:outline-none active:scale-95 mt-4"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute top-0 h-full w-full md:w-1/2 left-0 transition-all duration-600 ease-in-out z-2 ${isRightPanelActive ? 'translate-x-full' : ''}`}>
          <form onSubmit={handleSubmit} className="bg-white flex items-center justify-center flex-col py-0 px-4 md:px-[50px] h-full text-center">
            <h1 className="font-bold m-0 text-gray-800 text-2xl">Sign in</h1>
            <div className="my-5 mx-0">
              <a href="#" className="border border-[#DDDDDD] rounded-full inline-flex justify-center items-center mx-1 my-0 h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#333">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="#" className="border border-[#DDDDDD] rounded-full inline-flex justify-center items-center mx-1 my-0 h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#333">
                  <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814c-1.784-1.672-4.166-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-.768-.083-1.53-.248-2.271h-9.752z"/>
                </svg>
              </a>
              <a href="#" className="border border-[#DDDDDD] rounded-full inline-flex justify-center items-center mx-1 my-0 h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#333">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
            <span className="text-xs text-gray-600">or use your account</span>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              className="bg-[#eee] border-none py-3 px-4 my-2 mx-0 w-full text-gray-800"
              value={formData.email}
              onChange={handleChange}
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              className="bg-[#eee] border-none py-3 px-4 my-2 mx-0 w-full text-gray-800"
              value={formData.password}
              onChange={handleChange}
            />
            <a href="#" className="text-[#333] text-sm no-underline my-4 mx-0">Forgot your password?</a>
            <button 
              type="submit"
              className="rounded-3xl border border-[#FF4B2B] bg-[#FF4B2B] text-white text-xs font-bold py-3 px-11 uppercase tracking-[1px] transition-transform duration-80 ease-in focus:outline-none active:scale-95"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100">
          <div className={`bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] text-white relative -left-full h-full w-[200%] transition-transform duration-600 ease-in-out ${isRightPanelActive ? 'translate-x-1/2' : ''}`}>
            <div className={`absolute flex items-center justify-center flex-col py-0 px-10 text-center top-0 h-full w-1/2 transition-transform duration-600 ease-in-out ${isRightPanelActive ? 'translate-x-0' : '-translate-x-[-20%]'}`}>
              <h1 className="font-bold m-0">Welcome Back!</h1>
              <p className="text-sm font-thin leading-5 tracking-[0.5px] my-5 mx-0">
                To keep connected with us please login with your personal info
              </p>
              <button 
                className="rounded-3xl border border-white bg-transparent text-white text-xs font-bold py-3 px-11 uppercase tracking-[1px] transition-transform duration-80 ease-in focus:outline-none active:scale-95"
                onClick={() => setIsRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className={`absolute flex items-center justify-center flex-col py-0 px-10 text-center top-0 h-full w-1/2 right-0 transition-transform duration-600 ease-in-out ${isRightPanelActive ? 'translate-x-1/5' : 'translate-x-0'}`}>
              <h1 className="font-bold m-0">Hello, Friend!</h1>
              <p className="text-sm font-thin leading-5 tracking-[0.5px] my-5 mx-0">
                Enter your personal details and start journey with us
              </p>
              <button 
                className="rounded-3xl border border-white bg-transparent text-white text-xs font-bold py-3 px-11 uppercase tracking-[1px] transition-transform duration-80 ease-in focus:outline-none active:scale-95"
                onClick={() => setIsRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupComponent;