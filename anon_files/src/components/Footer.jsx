import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 mt-8 rounded-t-lg shadow-md">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
