import { createBrowserRouter} from 'react-router-dom'
import { Layout } from '../pages/Layout'
import { PianoRoll } from '../pages/PianoRoll'
import { Main } from '../pages/Main'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <PianoRoll />
      },
      {
        path: '/main/:query',
        element: <Main />
      }
    ]
  }
])
