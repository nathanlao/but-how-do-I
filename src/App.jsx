// import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';

import './App.css';

// const Post = lazy(() => import('./pages/Post'));
// const Home = lazy(() => import('./pages/Home'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/post/:title',
    element: <Post />
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
