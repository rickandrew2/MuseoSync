import React from 'react'
import { ScheduleForm } from '@/components/ui/ScheduleForm'

const Visit = () => {
  return (
    <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 p-6">
            <h1 className="text-3xl font-bold mb-4">Plan Your Visit</h1>
            <p className="mb-8">We look forward to welcoming you!</p>
            <ScheduleForm />
        </div>
    </>
  )
}

export default Visit
