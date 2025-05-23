import Sidebar from './Sidebar'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-16 md:ml-64">{children}</main>
    </div>
  )
}
