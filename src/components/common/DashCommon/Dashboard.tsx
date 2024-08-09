import React from 'react'

import SideBar from "./SideBar"
import Body from './Body.jsx'

const Dashboard: React.FC = () => {
  return (
    
      <div className="dashboard-container flex">
        <SideBar />
        <Body />
      </div>
    
  )
}

export default Dashboard
