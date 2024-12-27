import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Navigation from './routes/Navigation';

const App: React.FC = () => {
  return (
    <RouterProvider router={Navigation} />

  );
};

export default App;
