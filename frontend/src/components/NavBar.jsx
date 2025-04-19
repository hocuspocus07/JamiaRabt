import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
	const [isOpen, setIsOpen] = useState(false);
	const [activeItem, setActiveItem] = useState('');
	const toggleNav = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button
				className="md:hidden fixed top-4 right-4 z-999 p-2 rounded-lg shadow-lg"
				onClick={toggleNav}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current dark:text-gray-800">
					<rect width="352" height="32" x="80" y="96"></rect>
					<rect width="352" height="32" x="80" y="240"></rect>
					<rect width="352" height="32" x="80" y="384"></rect>
				</svg>
			</button>
			<div
				className={`fixed overflow-y-auto z-999 flex flex-col min-h-screen p-3 w-60 dark:bg-gray-50 dark:text-gray-800 bg-gray-800 shadow-lg md:shadow-none transition-all duration-300 ease-in-out
          ${isOpen ? 'left-0' : '-left-60 md:left-0'}`}
			>
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-purple-500 text-transparent bg-clip-text leading-12">JamiaRabt</h2>
					</div>

					<div className="flex-1">
						<ul className="pt-2 pb-4 space-y-1 text-sm">
							<li
								className={`rounded-sm transition-colors duration-200 ${activeItem === 'Home'
										? 'bg-gray-500 text-white'
										: 'hover:bg-gray-100 hover:text-black'
									}`}
							>
								<Link to="/" className="flex items-center p-2 space-x-3 rounded-md" onClick={(e) => {

									setActiveItem('Home');
								}}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
										<path d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z"></path>
									</svg>
									<span>Home</span>
								</Link>
							</li>
							<li
								className={`rounded-sm transition-colors duration-200 ${activeItem === 'About'
										? 'bg-gray-500 text-white'
										: 'hover:bg-gray-100 hover:text-black'
									}`}
							>
								<Link to="/about-us" className="flex items-center p-2 space-x-3 rounded-md" onClick={(e) => {

									setActiveItem('About');
								}}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										className="w-5 h-5 stroke-current dark:stroke-gray-600"
										fill="none"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle cx="12" cy="12" r="10" />
										<path d="M12 16v-4" />
										<path d="M12 8h.01" />
									</svg>
									<span>About</span>
								</Link>
							</li>
							<li
								className={`rounded-sm transition-colors duration-200 ${activeItem === 'Login/Signup'
										? 'bg-gray-500 text-white'
										: 'hover:bg-gray-100 hover:text-black'
									}`}
							>
								<Link to="/signup" className="flex items-center p-2 space-x-3 rounded-md" onClick={(e) => {

									setActiveItem('Login/Signup');
								}}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										className="w-5 h-5 stroke-current dark:stroke-gray-600"
										fill="none"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
										<polyline points="10 17 15 12 10 7" />
										<line x1="15" y1="12" x2="3" y2="12" />
									</svg>
									<span>Login/Signup</span>
								</Link>
							</li>
							<li
								className={`rounded-sm transition-colors duration-200 ${activeItem === 'Forum'
										? 'bg-gray-500 text-white'
										: 'hover:bg-gray-100 hover:text-black'
									}`}
							>
								<Link
									to="/community"
									className="flex items-center p-2 space-x-3 rounded-md"
									onClick={(e) => {
										setActiveItem('Forum');
									}}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										className="w-5 h-5 stroke-current dark:stroke-gray-600"
										fill="none"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										{/* Speech bubbles */}
										<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
										<path d="M8 15a3.5 3.5 0 0 0 5 0" />
										<path d="M12 15a3.5 3.5 0 0 0 5 0" />
									</svg>
									<span>Forum</span>
								</Link>
							</li>
							<li
								className={`rounded-sm transition-colors duration-200 ${activeItem === 'Chat'
										? 'bg-gray-500 text-white'
										: 'hover:bg-gray-100 hover:text-black'
									}`}
							>
								<Link to="/chat" className="flex items-center p-2 space-x-3 rounded-md" onClick={(e) => {

									setActiveItem('Chat');
								}}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
										<path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
										<path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"></path>
									</svg>
									<span>Chat</span>
								</Link>
							</li>
							<li
								className={`rounded-sm transition-colors duration-200 ${activeItem === 'Alumni Directory'
										? 'bg-gray-500 text-white'
										: 'hover:bg-gray-100 hover:text-black'
									}`}
							>
								<Link
									to="/alumni"
									className="flex items-center p-2 space-x-3 rounded-md"
									onClick={(e) => {

										setActiveItem('Alumni Directory');
									}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current dark:text-gray-600">
										<path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
									</svg>
									<span>Alumni Directory</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<Link to='/dashboard' className='mt-auto mb-2'>
				<div
					className={`rounded-lg transition-all duration-200 cursor-pointer flex items-center mt-auto space-x-4 ${activeItem === 'Profile'
							? 'bg-gray-200 dark:bg-gray-700 shadow-inner'
							: 'hover:bg-gray-100 dark:hover:bg-gray-800'
						}`}
					onClick={(e) => {
						setActiveItem('Profile');
					}}
				>
					<div className="flex-shrink-0">
						<img
							src="/profile-pic.png"
							alt="profile"
							className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
						/>
					</div>
					<div className="flex-1 min-w-0">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
							Leroy Jenkins
						</h2>
						<div className="flex items-center mt-1">
							<span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 mr-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
								View profile
							</span>
						</div>
					</div>
					{activeItem === 'Profile' && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 text-gray-500 dark:text-gray-400"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</div>
					</Link>
			</div>
		</>
	);
}

export default NavBar;