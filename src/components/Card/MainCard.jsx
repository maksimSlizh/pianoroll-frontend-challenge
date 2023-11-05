import { useState, useEffect } from 'react'

export function MainCard({ elements, it }) {
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 })
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 })
  const [selectedArea, setSelectedArea] = useState(null)

  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    const svgContainer = document.querySelector('.piano-roll__svg-active')
    if (svgContainer) {
      setSvgHeight(svgContainer.clientHeight)
    }
  }, [])

  function handleMouseDown(event) {
    setIsSelecting(true)
    setSelectionStart({ x: event.clientX, y: event.clientY })
    setSelectionEnd({ x: event.clientX, y: event.clientY })
  }

  function handleMouseMove(event) {
    if (isSelecting) {
      setSelectionEnd({ x: event.clientX, y: event.clientY })
    }
  }

  function handleMouseUp() {
    setIsSelecting(false)

    const x = Math.min(selectionStart.x, selectionEnd.x)
    const y = Math.min(selectionStart.y, selectionEnd.y)
    const width = Math.abs(selectionEnd.x - selectionStart.x)
    const height = Math.abs(selectionEnd.y - selectionStart.y)

    const top = Math.min(selectionStart.y, selectionEnd.y)
    const finalY = top < svgHeight ? top : svgHeight - height

    const newSelectedArea = {
      x: x,
      y: finalY,
      width: width,
      height: height,
    };

    setSelectedArea(newSelectedArea)
  }

  function resetSelection() {
    setSelectedArea(null);
  }

  const selectedAreaStyle = {
    position: 'absolute',
    left: selectedArea ? selectedArea.x + 'px' : '0',
    top: selectedArea ? selectedArea.y + 'px' : '0',
    width: selectedArea ? selectedArea.width + 'px' : '0',
    height: selectedArea ? selectedArea.height + 'px' : '0',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    border: '1px solid blue',
    display: selectedArea ? 'block' : 'none',
  };

  return (
    <>
      <div className="description">This is a piano roll number {it}</div>
      <svg
        className="piano-roll__svg-active"
        preserveAspectRatio="none"
        viewBox="0 0 1 1"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ position: 'relative' }}
      >
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
      <div style={selectedAreaStyle}></div>
      <button onClick={resetSelection}>Reset Selection</button>
    </>
  )
}
