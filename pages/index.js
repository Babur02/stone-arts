import Head from 'next/head'
import Login from '../components/Login'
import Layout from '@/components/Layout'
import { useAuth } from '../context/AuthContext'
import AdminDashboard from '@/components/AdminDashboard'
import ClientForm from './clientform.js'

export default function Home() {
  const { currentUser } = useAuth()
  return (
    <>
      <Head>
        <title>Stone Arts App</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      {!currentUser && <Login />}
      {currentUser && currentUser.email === 'admin@stonearts.com' && <AdminDashboard />}
      {currentUser && currentUser.email === 'salesgalleria@stonearts.com' && <ClientForm />}
    </>
  )
}
