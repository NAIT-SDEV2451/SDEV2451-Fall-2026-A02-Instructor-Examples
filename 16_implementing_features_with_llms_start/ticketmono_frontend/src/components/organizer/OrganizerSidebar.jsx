import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function OrganizerSidebar() {
  const { user } = useAuth()

  return (
    <aside className="w-full md:w-44 shrink-0 flex flex-col bg-base-200 border-b md:border-b-0 md:border-r border-base-300 p-3">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-primary rounded" />
        <div className="leading-tight">
          <p className="font-bold">TICKETS</p>
          <p className="text-xs text-primary">STUDIO</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2" aria-label="Organizer">
        <NavLink
          to="/organizer/events"
          className="btn btn-sm btn-soft btn-primary justify-start"
        >
          Events
        </NavLink>
        {/* These pages don't exist yet. */}
        <button className="btn btn-sm btn-ghost justify-start" disabled>Sales</button>
        <button className="btn btn-sm btn-ghost justify-start" disabled>Attendees</button>
        <button className="btn btn-sm btn-ghost justify-start" disabled>Settings</button>
      </nav>

      <div className="mt-6 md:mt-auto pt-3 border-t border-base-300">
        <p className="text-sm font-semibold truncate">{user.username}</p>
        <p className="text-xs text-base-content/60">Organizer</p>
      </div>
    </aside>
  )
}

export default OrganizerSidebar
