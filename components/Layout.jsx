import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

function Layout({ children }) {
    return (
        <div>
            <NavBar />
            <main className="max-w-2xl mx-auto py-12  px-8 md:px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8 font-sans">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
