import { useState, useEffect, useRef } from 'react'

export function MainCard({ elements, it }) {
  const [isSelecting, setIsSelecting] = useState(false)
  const [selections, setSelections] = useState([])
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 })
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 })
  const [isHeight, setHeight] = useState(0)
  const [isTop, setTop] = useState(0)
  const [highlightMode, setHighlightMode] = useState('blue')
  const [isDragging, setIsDragging] = useState(false)
  const [draggedSelectionIndex, setDraggedSelectionIndex] = useState(null)
  const [lineCoords, setLineCoords] = useState({ x: 0, y1: 0, y2: 0 })

  const svgContainerRef = useRef(null)

  useEffect(() => {
    const svgContainer = svgContainerRef.current
    if (svgContainer) {
      const rect = svgContainer.getBoundingClientRect()
      const top = rect.top
      const height = svgContainer.clientHeight
      setHeight(height)
      setTop(top)
    }
  }, []);

  function handleMouseDown(event) {
    if (isDragging) return

    setIsSelecting(true);
    setSelectionStart({ x: event.clientX, y: event.clientY })
    setSelectionEnd({ x: event.clientX, y: event.clientY })
  }

  function handleMouseMove(event) {
    if (isDragging) {
      if (draggedSelectionIndex !== null) {
        const newX = event.clientX
        const newY = selections[draggedSelectionIndex].y
        const newSelections = [...selections]
        newSelections[draggedSelectionIndex] = {
          ...newSelections[draggedSelectionIndex],
          x: newX,
          y: newY,
        };
        setSelections(newSelections);
      }
    } else if (isSelecting) {
      setSelectionEnd({ x: event.clientX, y: event.clientY })
    }

    const lineX = event.clientX;
    setLineCoords({ x: lineX, y1: isTop, y2: isTop + isHeight })
  }

  function handleMouseUp() {
    if (isSelecting) {
      const x1 = Math.min(selectionStart.x, selectionEnd.x)
      const y = isTop
      const width = Math.abs(selectionEnd.x - selectionStart.x)
      const height = isHeight

      const newSelection = {
        x: x1,
        y: y,
        width: width,
        height: height,
        color: highlightMode === 'blue' ? 'blue' : 'yellow',
      };

      console.log('Selection:', newSelection)

      setSelections([...selections, newSelection])
    }
    setIsSelecting(false)
  }

  function handleSelectionMouseDown(index) {
    if (!isDragging) {
      setIsDragging(true)
      setDraggedSelectionIndex(index)
    }
  }

  function handleSelectionMouseUp() {
    if (isDragging) {
      setIsDragging(false)
      setDraggedSelectionIndex(null)
    }
  }

  function toggleHighlightMode(mode) {
    setHighlightMode(mode)
  }

  function deleteSelection(index) {
    const newSelections = selections.filter((_, i) => i !== index)
    setSelections(newSelections)
  }

  return (
    <>
      <div className="main__content">
        <h3 className="description">This is a piano roll number {it}</h3>
        <div className="main__row">
          <button className="button-slow" onClick={() => toggleHighlightMode('blue')}>
            Slow
          </button>
          <button className="button-fast" onClick={() => toggleHighlightMode('yellow')}>
            Fast
          </button>
        </div>
      </div>

      <div

        style={{
          position: 'relative',
        }}
      >
        <svg
          ref={svgContainerRef}
          className="piano-roll__svg-active"
          preserveAspectRatio="none"
          viewBox="0 0 1 1"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
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

        {isSelecting && (
          <div
            style={{
              position: 'fixed',
              left: selectionStart.x + 'px',
              top: isTop + 'px',
              width: Math.abs(selectionEnd.x - selectionStart.x) + 'px',
              height: isHeight + 'px',
              backgroundColor: highlightMode === 'blue' ? 'rgba(0, 0, 255, 0.2)' : 'rgba(255, 255, 0, 0.2)',
              border: '1px solid ' + highlightMode,
              pointerEvents: 'none',
              zIndex: 9998,
            }}
          />
        )}
        {!isSelecting && !isDragging && (
          <div
            style={{
              position: 'fixed',
              left: lineCoords.x + 'px',
              top: isTop + 'px',
              width: '1px',
              height: isHeight + 'px',
              backgroundColor: 'black',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          />
        )}
      </div>

      {selections.map((selection, index) => (
        <div
          key={index}
          style={{
            position: 'fixed',
            left: selection.x + 'px',
            top: selection.y + 'px',
            width: selection.width + 'px',
            height: selection.height + 'px',
            backgroundColor: selection.color === 'blue' ? 'rgba(0, 0, 255, 0.2)' : 'rgba(255, 255, 0, 0.2)',
            border: '1px solid ' + selection.color,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={() => handleSelectionMouseDown(index)}
          onMouseUp={handleSelectionMouseUp}
        >
          <button className="button__delete" onClick={() => deleteSelection(index)}>x</button>
        </div>
      ))}
    </>
  )
}
