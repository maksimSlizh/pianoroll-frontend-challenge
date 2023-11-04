import { store } from './redux/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index'
export function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}


