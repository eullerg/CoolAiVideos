'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

const CreditCtx = createContext<{ credits: number }>({ credits: 0 })
export const useCredits = () => useContext(CreditCtx)

/* fake value por enquanto */
export function CreditProvider({ children }: { children: ReactNode }) {
  const [credits] = useState(5)            // TODO: trocar pelo real
  return <CreditCtx.Provider value={{ credits }}>{children}</CreditCtx.Provider>
}
