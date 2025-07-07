"use client"

import { useState, useEffect } from "react"
import { Home, User, Settings, Phone } from "lucide-react"
import ProfileSection from "./ProfileSection.tsx"
import SettingsSection from "./SettingsSection.tsx"
import SupportSection from "./SupportSection.tsx"
import OverviewSection from "./OverviewSection.tsx"
import "./Dashboard.css"


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "support", label: "Support", icon: Phone },
  ]

  if (!mounted) return null

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewSection />
      case "profile":
        return <ProfileSection />
      case "settings":
        return <SettingsSection />
      case "support":
        return <SupportSection />
      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Dashboard</h1>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`sidebar-item ${activeTab === item.id ? "active" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="sidebar-icon" />
                <span className="sidebar-label">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="content-wrapper">{renderContent()}</div>
      </div>
    </div>
  )
}

export default Dashboard
