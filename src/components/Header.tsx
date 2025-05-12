import React from 'react';
import { Utensils } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Utensils className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Smart Nutrition Analyzer</h1>
            <p className="text-primary-100 text-sm">Analyze nutrition for Indian dishes</p>
          </div>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li className="hover:text-primary-200 transition-colors">
              <a href="#" className="text-sm font-medium">About</a>
            </li>
            <li className="hover:text-primary-200 transition-colors">
              <a href="#" className="text-sm font-medium">FAQ</a>
            </li>
            <li className="hover:text-primary-200 transition-colors">
              <a href="#" className="text-sm font-medium">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};