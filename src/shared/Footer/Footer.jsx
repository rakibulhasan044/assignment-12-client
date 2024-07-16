import logo from "../../assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-gray-800 mt-10">
            <div className="container px-6 py-12 mx-auto">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">
                            Subscribe to our newsletter to get updates.
                        </h1>
                        <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                            <input
                                type="email"
                                className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                                placeholder="Email Address"
                            />
                            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold text-gray-800 dark:text-white">Quick Links</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <a href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Home</a>
                            <a href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Who We Are</a>
                            <a href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Our Philosophy</a>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold text-gray-800 dark:text-white">Industries</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <a href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Retail & E-Commerce</a>
                            <a href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Information Technology</a>
                            <a href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Finance & Insurance</a>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />

                <div className="flex items-center justify-between">
                    <div className='flex flex-col items-center'>
                        <img className="w-auto size-16" src={logo} alt="Company Logo" />
                        <p className='text-xl font-bold text-violet-500'>Campus Bites</p>
                    </div>

                    <div className="flex -mx-2">
                        <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Reddit">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM6.807 10.543c-.598 0-1.136.365-1.357.921-.22.556-.08 1.19.357 1.601.115.109.247.198.392.264-.012.146-.012.292 0 .439 0 2.24 2.615 4.062 5.829 4.062 3.214 0 5.83-1.822 5.83-4.062.011-.146.011-.293 0-.439.607-.295.928-.972.773-1.628-.155-.656-.745-1.117-1.42-1.108h-.053c-.358.013-.699.158-.957.407-1.137-.774-2.474-1.201-3.85-1.23l.65-3.12 2.138.45c.055.507.483.891.993.892.036 0 .072-.002.108-.006.53-.053.925-.513.898-1.045-.026-.532-.465-.95-.998-.95-.037.001-.074.004-.111.01-.317.033-.599.216-.759.492L12.82 6c-.022-.005-.044-.007-.066-.007-.145.002-.269.103-.3.245l-.748 3.473c-1.392.019-2.748.447-3.9 1.229-.27-.255-.628-.396-.999-.396zM12.18 16.524c-.056 0-.113 0-.169-.001-.956-.005-1.763-.276-2.426-.775-.046-.055-.068-.126-.061-.197.007-.071.042-.137.097-.182.049-.04.109-.062.171-.062.062 0 .122.021.171.061.56.411 1.238.631 1.933.63.057 0 .114 0 .171-.001.686.001 1.355-.219 1.913-.629.048-.042.111-.063.175-.063.064 0 .126.022.175.064.109.112.107.291-.005.402-.663.501-1.47.771-2.304.773zm2.127-2.444h-.016l.008-.039c-.44-.03-.799-.362-.864-.798-.065-.436.182-.858.594-1.015.412-.157.878-.006 1.12.362.242.369.195.856-.113 1.171-.179.195-.429.31-.693.319h-.035h.033zM9.67 14c-.552 0-1-.448-1-1 0-.552.448-1 1-1 .552 0 1 .448 1 1 0 .552-.448 1-1 1z"></path>
                            </svg>
                        </a>
                        <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.002 12.002C2.003 16.921 5.58 21.11 10.439 21.881V14.892H7.902v-2.89H10.44V9.802c-.113-1.043.243-2.082.973-2.836.73-.753 1.757-1.143 2.803-1.064.75.012 1.498.079 2.239.2v2.459h-1.264c-.436-.057-.874.086-1.191.39-.317.304-.478.735-.439 1.172V12.002h2.772L15.891 14.893H13.563v6.988c5.254-.831 8.939-5.63 8.384-10.921-.555-5.291-5.154-9.222-10.467-8.945-5.312.278-9.478 4.666-9.479 9.986z"></path>
                            </svg>
                        </a>
                        <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="GitHub">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.026 2C7.133 2 2.962 5.548 2.178 10.378 1.395 15.208 4.231 19.893 8.873 21.44c.5.09.679-.218.679-.482 0-.237-.008-.864-.011-1.699-2.775.6-3.361-1.338-3.361-1.338-.182-.603-.575-1.121-1.106-1.46-.9-.619.069-.605.069-.605.641.087 1.205.467 1.527 1.028.273.496.733.863 1.278 1.018.545.155 1.129.087 1.623-.19.046-.506.271-.979.634-1.334-2.213-.251-4.541-1.108-4.541-4.931 0-1.469.568-2.796 1.495-3.793-.15-.37-.387-1.125.144-2.349 0 0 1.257-.403 4.125 1.54 1.2-.333 2.466-.499 3.733-.506 1.267.007 2.533.173 3.733.506 2.868-1.943 4.124-1.54 4.124-1.54.531 1.224.294 1.98.144 2.349.927.997 1.495 2.324 1.495 3.793 0 3.83-2.329 4.678-4.544 4.926.278.24.527.713.527 1.439 0 1.041-.01 1.882-.01 2.137 0 .266.18.574.684.476C19.768 19.89 22.601 15.205 21.816 10.375 21.031 5.546 16.86 2 12.026 2z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
