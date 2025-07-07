"use client"

import {
  Bell,
  Shield,
  Palette,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Key,
  Trash2,
  Download,
  Upload,
} from "lucide-react"
import { useState } from "react"

const SettingsSection = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  const settingsCategories = [
    {
      title: "Appearance",
      icon: Palette,
      color: "purple-indigo",
      settings: [
        {
          id: "darkMode",
          label: "Dark Mode",
          description: "Switch between light and dark themes",
          type: "toggle",
          value: darkMode,
          onChange: setDarkMode,
          icons: { on: Moon, off: Sun },
        },
        {
          id: "language",
          label: "Language",
          description: "Choose your preferred language",
          type: "select",
          value: "English",
          options: ["English", "Spanish", "French", "German"],
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      color: "blue-cyan",
      settings: [
        {
          id: "notifications",
          label: "Push Notifications",
          description: "Receive notifications on your device",
          type: "toggle",
          value: notifications,
          onChange: setNotifications,
          icons: { on: Bell, off: Bell },
        },
        {
          id: "emailNotifications",
          label: "Email Notifications",
          description: "Receive updates via email",
          type: "toggle",
          value: emailNotifications,
          onChange: setEmailNotifications,
          icons: { on: Mail, off: Mail },
        },
        {
          id: "soundEnabled",
          label: "Sound Effects",
          description: "Play sounds for interactions",
          type: "toggle",
          value: soundEnabled,
          onChange: setSoundEnabled,
          icons: { on: Volume2, off: VolumeX },
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      color: "green-emerald",
      settings: [
        {
          id: "profileVisibility",
          label: "Profile Visibility",
          description: "Make your profile visible to others",
          type: "toggle",
          value: profileVisibility,
          onChange: setProfileVisibility,
          icons: { on: Eye, off: EyeOff },
        },
        {
          id: "twoFactorAuth",
          label: "Two-Factor Authentication",
          description: "Add an extra layer of security",
          type: "toggle",
          value: twoFactorAuth,
          onChange: setTwoFactorAuth,
          icons: { on: Shield, off: Shield },
        },
      ],
    },
  ]

  const accountActions = [
    {
      title: "Change Password",
      description: "Update your account password",
      icon: Key,
      color: "orange-yellow",
      action: "change-password",
    },
    {
      title: "Export Data",
      description: "Download your account data",
      icon: Download,
      color: "blue-cyan",
      action: "export-data",
    },
    {
      title: "Import Data",
      description: "Import data from another service",
      icon: Upload,
      color: "purple-indigo",
      action: "import-data",
    },
    {
      title: "Delete Account",
      description: "Permanently delete your account",
      icon: Trash2,
      color: "red-pink",
      action: "delete-account",
      dangerous: true,
    },
  ]

  return (
    <>
      {/* Header */}
      <div className="content-header">
        <h2 className="main-title">Settings</h2>
        <p className="main-subtitle">Manage your account settings and preferences.</p>
      </div>

      {/* Settings Categories */}
      {settingsCategories.map((category, categoryIndex) => {
        const CategoryIcon = category.icon
        return (
          <section
            key={category.title}
            className="dashboard-section settings-section"
            style={{ animationDelay: `${categoryIndex * 200}ms` }}
          >
            <h3 className="section-title">
              <div className={`section-icon ${category.color}`}>
                <CategoryIcon className="icon" />
              </div>
              {category.title}
            </h3>
            <div className="settings-grid">
              {category.settings.map((setting, index) => {
                const OnIcon = setting.icons?.on
                const OffIcon = setting.icons?.off
                return (
                  <div key={setting.id} className="setting-card" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="setting-content">
                      <div className="setting-info">
                        <h4 className="setting-label">{setting.label}</h4>
                        <p className="setting-description">{setting.description}</p>
                      </div>
                      <div className="setting-control">
                        {setting.type === "toggle" && (
                          <button
                            className={`toggle-button ${setting.value ? "active" : ""}`}
                            onClick={() => setting.onChange?.(!setting.value)}
                          >
                            <div className="toggle-slider">
                              {OnIcon && OffIcon && (
                                <div className="toggle-icon">
                                  {setting.value ? (
                                    <OnIcon className="icon-small" />
                                  ) : (
                                    <OffIcon className="icon-small" />
                                  )}
                                </div>
                              )}
                            </div>
                          </button>
                        )}
                        {setting.type === "select" && (
                          <select className="setting-select" defaultValue={setting.value}>
                            {setting.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}

      {/* Account Actions */}
      <section className="dashboard-section account-actions-section">
        <h3 className="section-title">
          <div className="section-icon red-pink">
            <Lock className="icon" />
          </div>
          Account Actions
        </h3>
        <div className="actions-grid">
          {accountActions.map((action, index) => {
            const ActionIcon = action.icon
            return (
              <div
                key={action.action}
                className={`action-card ${action.dangerous ? "dangerous" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`action-icon ${action.color}`}>
                  <ActionIcon className="icon" />
                </div>
                <div className="action-content">
                  <h4 className="action-title">{action.title}</h4>
                  <p className="action-description">{action.description}</p>
                </div>
                <button className={`action-button ${action.dangerous ? "dangerous" : ""}`}>
                  {action.dangerous ? "Delete" : "Manage"}
                </button>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default SettingsSection
