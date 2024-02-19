import React from 'react'

const Navbar = () => {

  return (
<nav className="w-full mx-auto rounded-md bg-gray-200 shadow shadow-gray-300 px-8 md:px-auto fixed top-0 left-0 right-0">
	<div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
		{/* <!-- Logo --> */}
		<div className="bg-emerald-600 md:order-1 rounded-md">
			{/* <!-- Heroicon - Chip Outline --> */}
			<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
				stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
			</svg>
		</div>
		<div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
			<ul className="flex font-semibold justify-between">
                {/* <!-- Active Link = text-indigo-500
                Inactive Link = hover:text-indigo-500 --> */}
				<li className="md:px-4 md:py-2 text-blue-700"><a href="#">Dashboard</a></li>
				<li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Calendar</a></li>
				<li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Notes</a></li>
				<li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Roadmap</a></li>
				<li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Contact</a></li>
			</ul>
		</div>
		<div className="order-2 md:order-3">
			<button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-gray-50 rounded-xl flex items-center gap-2">
                {/* <!-- Heroicons - Login Solid --> */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Login</span>
            </button>
		</div>
	</div>
</nav>


  )
}

export default Navbar
