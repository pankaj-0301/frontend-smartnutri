import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DishLookup } from './components/DishLookup';
import { JsonInput } from './components/JsonInput';
import { motion } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState<'dish' | 'json'>('dish');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`tab ${activeTab === 'dish' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => setActiveTab('dish')}
            >
              🔍 Dish Name Lookup
            </button>
            <button
              className={`tab ${activeTab === 'json' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => setActiveTab('json')}
            >
              📋 JSON Data Input
            </button>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dish' ? <DishLookup /> : <JsonInput />}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;