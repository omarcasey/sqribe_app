import AppShell from '@/components/AppShell'
import React from 'react'

const Dashboard = () => {
  return (
    <AppShell>
        <div className="flex flex-col items-center pb-24 pt-10 w-full text-foreground">
            <div className='flex'>
                <div className='w-2/3'>recent projects</div>
                <div className='w-1/3'>user profile</div>
            </div>
            <div>All Projects List Table</div>
            <div>Usage Statistics. Current Plan Saas, Billing Cycle</div>
            <div className='flex'>
                <div className='w-2/3'>user profile</div>
                <div className='w-1/3'>settings</div>
            </div>
            <div>Tips</div>
        </div>
    </AppShell>
  )
}

export default Dashboard