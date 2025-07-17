import React, { createContext, useState } from 'react';
import './App.css';

export const MarketingContext = createContext();

export const MarketingProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    bizName: '',
    productIdeas: ['', '', ''],
    customers: [
      { name: '', age: '', job: '', desire: '' },
      { name: '', age: '', job: '', desire: '' },
      { name: '', age: '', job: '', desire: '' }
    ],
    values: ['', '', ''],
    vision: '',
    coreValue: '',
    marketingPhrase: '',
    experienceScene: '',
    timeRequired: '',
    frequency: '',
    incomePerFan: '',
    monthlyGoal: ''
  });

  return (
    <MarketingContext.Provider value={{ formData, setFormData }}>
      {children}
    </MarketingContext.Provider>
  );
};
