'use client'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/context/store'
import SessionProvider from '@/app/components/SessionProvider'

type Props = {
  children: ReactNode
}

export default function ContextProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  )
}
