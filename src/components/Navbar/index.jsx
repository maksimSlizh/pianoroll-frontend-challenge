import { NavLink } from 'react-router-dom'
import svg from '../../assets/white.svg'

export function Navbar() {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/">
          <div className="logo-container">
            <img src={svg} alt="Logo" />
          </div>
        </NavLink>
      </nav>
    </>
  )
}
