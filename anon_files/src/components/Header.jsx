import React from 'react';
import { Home } from 'lucide-react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-b-lg shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center text-xl font-semibold">
          <Home className="mr-2" />
          Todo App
        </a>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-200">Features</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">Pricing</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
