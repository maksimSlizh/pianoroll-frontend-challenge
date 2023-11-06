import { NavLink } from 'react-router-dom'
import { Card } from '../Card/index'
import { setLocalStorage } from '../../helpers/storage'
import { generateGradientTable } from '../../helpers/generateGradientTable'

export function PianoRollCard({ data, it }) {
  const backgroundStartColor = { r: 93, g: 181, b: 213 }
  const backgroundEndColor = { r: 21, g: 65, b: 81 }
  const backgroundColormap = generateGradientTable(backgroundStartColor, backgroundEndColor, 128)

  const noteStartColor = { r: 66, g: 66, b: 61 }
  const noteEndColor = { r: 28, g: 28, b: 26 }
  const noteColormap = generateGradientTable(noteStartColor, noteEndColor, 128)

  function timeToX(time, start) {
    return time / (data[data.length - 1].end - start)
  }

  function drawEmptyPianoRoll(pitch_min, pitch_max, pitchSpan, backgroundColormap) {
    const elements = [];
    for (let it = pitch_min; it <= pitch_max + 1; it++) {
      if ([1, 3, 6, 8, 10].includes(it % 12)) {
        const rect = {
          type: 'rect',
          x: 0,
          y: 1 - (it - pitch_min) / pitchSpan,
          width: 1,
          height: 1 / pitchSpan,
          fill: backgroundColormap[12],
          fillOpacity: '0.666',
        };
        elements.push(rect)
      }

      const line = {
        type: 'line',
        x1: 0,
        y1: 1 - (it - pitch_min) / pitchSpan + 1 / pitchSpan,
        x2: 2,
        y2: 1 - (it - pitch_min) / pitchSpan + 1 / pitchSpan,
        strokeWidth: it % 12 === 0 ? 0.003 : 0.001,
        stroke: 'black',
      };
      elements.push(line)
    }
    return elements
  }

  function drawPianoRoll(sequence, backgroundColormap, noteColormap) {
    const start = sequence[0].start
    const pitches = sequence.map(note => note.pitch)

    let pitch_min = Math.min(...pitches)
    let pitch_max = Math.max(...pitches)
    let pitch_span = pitch_max - pitch_min

    if (pitch_span < 24) {
      const diff = 24 - pitch_span
      const low = Math.ceil(diff / 2)
      const high = Math.floor(diff / 2)
      pitch_min -= low
      pitch_max += high
    }

    pitch_min -= 3
    pitch_max += 3
    pitch_span = pitch_max - pitch_min
    const note_height = 1 / pitch_span

    const elements = drawEmptyPianoRoll(pitch_min, pitch_max, pitch_span, backgroundColormap)

    sequence.forEach((note) => {
      const x = timeToX(note.start - start, start)
      const w = timeToX(note.end - note.start, start)

      const y = 1 - (note.pitch - pitch_min) / pitch_span

      const color = noteColormap[note.velocity]

      const note_rectangle = {
        type: 'rect',
        x,
        width: w,
        y,
        height: note_height,
        fill: color,
        class: 'note-rectangle',
      };

      elements.push(note_rectangle)
    });

    return elements
  }


  const elements = drawPianoRoll(data, backgroundColormap, noteColormap)
  setLocalStorage('piano', { it, elements })

  return (
    <NavLink className="link" to={`/main/${it}`} >
      <div className="piano-roll-card">
        <Card elements={elements} it={it} />
      </div>
    </NavLink>
  )
}
