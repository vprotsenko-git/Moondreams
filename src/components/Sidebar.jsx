import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  const items = [
    { to: '/text2img', label: 'Text → Image' },
    { to: '/img2video', label: 'Image → Video' },
    { to: '/upscale', label: 'Upscale' },
    { to: '/train', label: 'Train Model' },
    { to: '/assets', label: 'Assets' },
  ]

  return (
    <nav className="sidebar">
      <h2 className="logo">Moondreams</h2>
      {items.map(i => (
        <NavLink
          key={i.to}
          to={i.to}
          className={({ isActive }) =>
            'nav-item' + (isActive ? ' active' : '')
          }
        >
          {i.label}
        </NavLink>
      ))}
    </nav>
  )
}