import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNote } from '../redux/noteSlice'
import { PianoRollDisplay } from '../components/PianoRollDisplay/index'

export function PianoRoll() {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.note)
  const [isDataLoaded, setIsDataLoaded] = useState(true)

  function handleClick() {
    setIsDataLoaded(false)
  }

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchNote())
    }
  }, [dispatch, isDataLoaded])

  useEffect(() => {
    if (data && data.length > 0) {
      setIsDataLoaded(true)
    }
  }, [data])

  return (
    <div className="container">
      <h1 className="title"> Welcome to PianoRoll frontend coding challenge!</h1>
      <section className="preview">
        <div className="preview__button">
          <button className="button" onClick={handleClick}>Load CSV</button>
        </div>
        <div>
          {loading ? 'Loading...' : isDataLoaded
            ? <div className="piano-roll">
              <PianoRollDisplay data={data} />
            </div> : 'Click "Load CSV" to load data'}
        </div>
      </section>
    </div>
  )
}
