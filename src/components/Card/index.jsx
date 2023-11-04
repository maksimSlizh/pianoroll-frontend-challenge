import { useParams } from 'react-router-dom'

export function Card({ elements, it }) {
  const { query } = useParams()

  return (
    <>
      <div className="description">This is a piano roll number {it}</div>
      <svg className={query == it ? 'piano-roll__svg-active' : 'piano-roll__svg'}
        preserveAspectRatio="none"
        viewBox="0 0 1 1">
        {elements.map((element, index) => (
          element.type === 'rect' ? (
            <rect
              key={index}
              x={element.x}
              width={element.width}
              y={element.y}
              height={element.height}
              fill={element.fill}
              className={element.class}
            />
          ) : element.type === 'line' ? (
            <line
              key={index}
              x1={element.x1}
              y1={element.y1}
              x2={element.x2}
              y2={element.y2}
              strokeWidth={element.strokeWidth}
              stroke={element.stroke}
            />
          ) : null
        ))}
      </svg>
    </>
  )
}
