import React, { useState } from "react"

const Popup = () => {
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState("")

  const fetchLocation = async () => {
    setLoading(true)
    try {
      const ipRes = await fetch("https://api64.ipify.org?format=json")
      const ipData = await ipRes.json()
      const ipAdd = ipData.ip

      const inInfo = await fetch(
        `https://ipinfo.io/${ipAdd}/json?token=6f7d33dc7ee656`
      )
      const ip = await inInfo.json()
      const country = ip.country
      const city = ip.city

      setLocation(`Your country is ${country} and city is ${city}`)
    } catch (error) {
      console.error("Error fetching location:", error)
      setLocation("Location data not available")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="popup-container p-6 bg-white rounded shadow-md">
      <button
        className={`popup-button ${
          loading ? "cursor-not-allowed" : "hover:bg-blue-600"
        } py-2 px-4 rounded ${
          loading ? "bg-gray-300" : "bg-blue-500 text-white"
        }`}
        onClick={fetchLocation}
        disabled={loading}>
        {loading ? (
          <span className="spinner spinner-container"></span>
        ) : (
          "Show my location"
        )}
      </button>
      <div className="mt-4 text-center popup-text">{location}</div>
    </div>
  )
}

export default Popup
