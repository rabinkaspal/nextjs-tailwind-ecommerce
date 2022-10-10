import React from "react";

function Footer() {
    return (
        <footer className=" bg-gray-100 p-8 text-gray-500 font-sans font-thin text-sm md:text-md">
            <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-7xl flex flex-col items-center sm:items-start sm:justify-between sm:flex-row space-y-4 sm:space-y-0">
                <p className="">&copy; All rights reserved. 2022</p>
                <ul className="flex flex-row gap-2 md:my-0 ">
                    <li className="p-1">
                        <button>Home</button>
                    </li>
                    <li className="p-1">
                        <button>About</button>
                    </li>
                    <li className="p-1">
                        <button>Contact</button>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
