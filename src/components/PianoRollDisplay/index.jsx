import { generateSVGs } from '../../helpers/generateSVGs'

export function PianoRollDisplay({ data }) {
  return (
    <>
      {data && data.length > 0 ? generateSVGs(data) : ''}
    </>
  )
}
