import { PianoRollCard } from '../components/PianoRollCard/index'

export function generateSVGs(data) {
  return (
    <>
      {Array.from({ length: 19 }, (_, it) => {
        const start = it * 60
        const end = start + 60
        const partData = data.slice(start, end)
        return <PianoRollCard key={it} data={partData} it={it + 1} />
      })}
    </>
  )
}


