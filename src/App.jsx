// import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import FadeInWrapper from './components/FadeInWrapper';

import './App.css';

// const Post = lazy(() => import('./pages/Post'));
// const Home = lazy(() => import('./pages/Home'));

const router = createBrowserRouter([
  {
    path: '/but-how-do-I/',
    element: <Home />
  },
  {
    path: '/but-how-do-I/post/:title',
    element: (
      <FadeInWrapper>
        <Post />
      </FadeInWrapper>
    )
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
