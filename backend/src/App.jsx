import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Auth from '../../frontend/src/pages/LoginPage'
import Home from '../../frontend/src/components/dashboard/HomeScreen'

export default function App() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    // Check for real Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Check for guest session
    const guest = localStorage.getItem('velura_guest')
    if (guest) {
      setSession({ isGuest: true, ...JSON.parse(guest) })
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session)
      } else {
        setSession(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Show nothing while session is being determined — prevents auth screen flash
  if (session === undefined) return null

  return session ? <Home session={session} /> : <Auth />
}