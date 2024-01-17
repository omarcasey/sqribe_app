import AppShell from '@/components/App/AppShell'
import React from 'react'
import withAuth from '@/components/App/withAuth'

const Settings = () => {
  return (
    <AppShell>
        <div className="flex flex-col items-center pb-24 pt-10 w-full text-foreground max-w-7xl mx-auto">
            Settings
        </div>
    </AppShell>
  )
}

export default withAuth(Settings);