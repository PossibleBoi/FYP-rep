import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-yellow-400 py-3">
            <div className="container mx-auto text-center text-white">
                <p>&copy; 2024 DIYO. All rights reserved.</p>
                <Link to='/about_us' >About Us</Link>
            </div>
        </footer>
    );
}
