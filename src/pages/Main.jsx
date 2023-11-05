import { getLocalStorage, getAllLocalStorage } from "../helpers/storage"
import { useParams, NavLink } from 'react-router-dom'
import { MainCard } from '../components/Card/MainCard'
import { Card } from '../components/Card/index'


export function Main() {
  const { query } = useParams()
  const data = getLocalStorage("piano", query)
  const elements = getAllLocalStorage("piano", query)

  function renderCards() {
    if (elements) {
      return Object.keys(elements).map(it => (
        <NavLink className="link" to={`/main/${it}`} key={it}>
          <div className="piano-roll-card">
            <Card elements={elements[it]} it={it} />
          </div>
        </NavLink>
      ));
    }
    return null
  }
  return (
    <div className="container">
      <section className="main">
        <div className="main__card">
          <MainCard elements={data} it={query} />
        </div>
        <div className="main__aside">
          {renderCards()}
        </div>
      </section>
    </div>
  )
}
