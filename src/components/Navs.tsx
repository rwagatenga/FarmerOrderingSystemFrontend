import React, { useState } from 'react'
import { ModeToggle } from './mode-toggle'
import getAuthenticatedUser from '@/hooks/auth'

type NavbarProps = {
    onOpenSidebar: () => void
  }
const Navigation: React.FC<NavbarProps> = ({ onOpenSidebar }) => {
    const [openDropdown, setOpenDropdown] = useState(false)

    const handleOpenDropdown = () => {
        setOpenDropdown(!openDropdown)
      }

  return (
    <nav className="fixed z-50 top-0 right-0 left-0 p-2 bg-gray-500 dark:bg-slate-800 dark:text-white backdrop-blur-sm">
        <div className="mx-auto flex container justify-between blur-0">
        <div className="flex items-center justify-start gap-6">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-indigo-800 rounded-lg sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-indigo-800 dark:hover:bg-gray-200 dark:focus:ring-gray-200"
              onClick={onOpenSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <h2 className="text-4xl">Logo</h2>
            </div>
            <ModeToggle />
        </div>
    </nav>
  )
}

export default Navigation
