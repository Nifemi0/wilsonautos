'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const sp = useSearchParams()
  const redirectTo = sp.get('redirectTo') || '/admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push(redirectTo)
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-body px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-body font-medium text-[#1E2030] mb-1.5">Email</label>
        <input
          type="email"
          id="admin-email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="admin@wilsonexpressautos.com"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-body font-medium text-[#1E2030] mb-1.5">Password</label>
        <input
          type="password"
          id="admin-password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors"
        />
      </div>
      <button
        type="submit"
        id="admin-login-btn"
        disabled={loading}
        className="w-full bg-[#1E2030] hover:bg-[#2a2d45] disabled:opacity-60 text-white font-display font-bold py-3.5 rounded-xl transition-colors"
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1E2030] rounded-2xl mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <circle cx="12" cy="12" r="10" fill="#F59E0B" opacity="0.2"/>
              <path d="M8 12h8M12 8v8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="font-display font-bold text-[#1E2030] text-2xl">Wilson Express Autos</h1>
          <p className="font-body text-gray-500 text-sm mt-1">Admin Dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="font-display font-bold text-[#1E2030] text-xl mb-6">Sign In</h2>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-gray-400 font-body mt-6">
          This portal is for authorized personnel only.
        </p>
      </div>
    </div>
  )
}
