import type { ReactNode } from 'react'

// Shared page shell only — deliberately not a generic layout abstraction.
export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-2xl">{children}</div>
    </main>
  )
}
