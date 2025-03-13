import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, Signup, AllPosts, AddPost, EditPost, Post, Dashboard, UserProfile, CategoryPage } from './pages/index.js'
import { AuthLayout, Login } from './components/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
          path: "/signup",
          element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
          ),
      },
      {
          path: "/all-posts",
          element: (
            <AuthLayout authentication>
                {" "}
                <AllPosts />
            </AuthLayout>
          ),
      },
      {
          path: "/add-post",
          element: (
            <AuthLayout authentication>
                {" "}
                <AddPost />
            </AuthLayout>
          ),
      },
      {
          path: "/edit-post/:slug",
          element: (
            <AuthLayout authentication>
                {" "}
                <EditPost />
            </AuthLayout>
          ),
      },
      {
          path: "/post/:slug",
          element: <Post />,
      },
      {
          path: "/dashboard",
          element: (
          <AuthLayout authentication>
              {" "}
              <Dashboard />
          </AuthLayout>),
      },
      {
          path: "/user/:userProfile",
          element: <UserProfile />,
      },
      {
        path: "/all-posts/:category",
        element: <CategoryPage />,
    },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
