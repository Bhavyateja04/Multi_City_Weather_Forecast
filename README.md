# 🌤️ Multi-City Weather Forecast Dashboard

A responsive and interactive weather dashboard built with React that allows users to search, manage, and monitor weather information for multiple cities.

The application integrates with the WeatherAPI.com API to display real-time weather conditions and a 7-day forecast, with temperature trends visualized using Recharts.

---

## 🚀 Live Features

- 🌍 Automatic location detection using the browser Geolocation API
- 🔎 Search and add cities by name
- 🌡️ Current temperature with Celsius/Fahrenheit toggle
- 💧 Humidity information
- 💨 Wind speed
- 🌤️ Weather condition icons
- 📅 7-day weather forecast
- 📈 High/low temperature trend chart
- 🗑️ Remove cities from the dashboard
- 💾 Persistent cities using Browser Local Storage
- ⏳ Skeleton loading states while fetching weather data
- ❌ User-friendly error handling
- 📱 Responsive design for desktop, tablet, and mobile
- 🔄 Weather data refresh support

---

## 🖥️ Application Overview

The dashboard provides a simple interface for monitoring weather conditions across multiple cities.

### Dashboard

Users can:

1. Search for a city.
2. Add the city to the dashboard.
3. View its current weather.
4. View the upcoming 7-day forecast.
5. Compare high and low temperature trends.
6. Switch between Celsius and Fahrenheit.
7. Remove cities when they are no longer needed.

The application also attempts to detect the user's location on their first visit and automatically loads the weather for the detected city.

---

## ✨ Key Features

### 🔍 City Search

Users can search for any supported city using the search bar.

Example:

```text
Hyderabad
London
Mumbai
Tokyo
Singapore
The city is added to the dashboard after a successful API response.

Duplicate cities are prevented.

📍 Geolocation

On the initial visit, the application requests permission to access the user's location through the browser Geolocation API.

The coordinates are then sent to WeatherAPI.com to determine the user's city and retrieve its weather information.

If location permission is denied, users can continue using the application through manual city search.

🌡️ Temperature Unit Toggle

Users can switch between:

°C Celsius
°F Fahrenheit

The selected unit is applied to:

Current temperature
Feels-like temperature
Forecast high temperatures
Forecast low temperatures
Temperature chart

The selected preference is persisted using Local Storage.

📅 7-Day Forecast

Each city card displays a 7-day weather forecast containing:

Day of the week
Weather condition icon
Maximum temperature
Minimum temperature
📈 Temperature Trend Visualization

The application uses Recharts to visualize the temperature trend for the forecast period.

The chart displays:

High temperature
Low temperature
Daily forecast values
Temperature unit based on the selected preference

This allows users to quickly understand how temperatures are expected to change over the coming days.

💾 Local Storage Persistence

The application uses the browser's Local Storage API to persist user preferences.

Saved information includes:

weather-dashboard-cities
weather-dashboard-unit
weather-dashboard-visited

When the user reloads the application, previously saved cities are restored automatically.

⏳ Loading State

A skeleton loading UI is displayed while weather data is being fetched.

This prevents the dashboard from appearing empty while waiting for the API response and provides better user feedback.

❌ Error Handling

The application handles common failure scenarios such as:

Invalid city names
API request failures
Location permission denial
Unsupported browser geolocation
Duplicate cities

Users receive a clear error message without the application crashing.

🛠️ Tech Stack
Technology	Purpose
React	User interface and application state
Vite	Development server and build tooling
Tailwind CSS	Responsive styling
Recharts	Temperature data visualization
Lucide React	Weather and UI icons
WeatherAPI.com	Weather and forecast data
JavaScript	Application logic
Browser Local Storage	Persistent user preferences
Browser Geolocation API	Automatic location detection
📁 Project Structure
weather-dashboard/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── EmptyState.jsx
│   │   ├── ForecastChart.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SkeletonLoader.jsx
│   │   └── WeatherCard.jsx
│   │
│   ├── hooks/
│   │   └── useWeather.js
│   │
│   ├── utils/
│   │   └── weatherIcons.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env.local
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
⚙️ Getting Started
Prerequisites

Make sure the following are installed:

Node.js
npm
Git

Check your Node.js installation:

node --version

Check npm:

npm --version
📥 Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Navigate to the project:

cd weather-dashboard

Install dependencies:

npm install
🔑 Environment Configuration

The application requires a WeatherAPI.com API key.

Create a file named:

.env.local

in the root directory of the project.

Add:

VITE_WEATHER_API_KEY=YOUR_WEATHER_API_KEY

Replace:

YOUR_WEATHER_API_KEY

with your actual WeatherAPI.com API key.

Important

Never commit .env.local to GitHub.

The project includes .env.local in .gitignore to prevent accidentally exposing the API key.

▶️ Running the Application

Start the development server:

npm run dev

Vite will display a local URL similar to:

http://localhost:5173

Open the URL in your browser.

🏗️ Production Build

To create a production-ready build:

npm run build

To preview the production build locally:

npm run preview
🧪 Testing Checklist

Before submitting the project, verify the following:

Application
 Application starts successfully with npm run dev
 No console errors
 Production build succeeds with npm run build
Weather API
 Current weather loads correctly
 7-day forecast loads correctly
 Weather condition is displayed
 Weather icons are displayed
City Management
 User can search for a city
 City is added after successful search
 Multiple cities can be displayed
 Duplicate cities are prevented
 Cities can be removed
Temperature
 Celsius mode works
 Fahrenheit mode works
 Current temperature changes
 Forecast temperatures change
 Chart temperatures change
Persistence
 Cities are saved to Local Storage
 Cities remain after page refresh
 Temperature preference remains after refresh
 Removed cities remain removed after refresh
Geolocation
 Location permission is requested on initial visit
 Detected city is added automatically
 Application works when location permission is denied
User Experience
 Loading skeleton appears while fetching
 Invalid city produces an error message
 Application does not crash on API failure
 Layout works on desktop
 Layout works on mobile
🔌 API Integration

The application uses the WeatherAPI.com Forecast API.

A typical request looks like:

https://api.weatherapi.com/v1/forecast.json

The application sends:

key
q
days
aqi
alerts

Example query:

q=Hyderabad
days=7

The API response provides the data required by the application, including:

Location
Current weather
Temperature
Humidity
Wind
Weather condition
Daily maximum temperature
Daily minimum temperature
Weather icons
🧩 Application Architecture

The application follows a component-based React architecture.

App
│
├── SearchBar
│
├── WeatherCard
│   │
│   └── ForecastChart
│
├── SkeletonLoader
│
└── EmptyState

Weather API communication is separated into a custom hook:

useWeather()

This keeps API logic separate from UI components and makes the application easier to maintain.

🔄 Data Flow

The basic data flow is:

User Search
     │
     ▼
SearchBar
     │
     ▼
useWeather()
     │
     ▼
WeatherAPI.com
     │
     ▼
Weather Data
     │
     ├──────────────┐
     ▼              ▼
WeatherCard     ForecastChart
     │              │
     ▼              ▼
Current Weather   Temperature Trend

For geolocation:

Browser Location
       │
       ▼
Latitude / Longitude
       │
       ▼
WeatherAPI.com
       │
       ▼
Detected City
       │
       ▼
Weather Card
💾 Local Storage Design

The application stores the following information:

Saved Cities
weather-dashboard-cities

Example:

[
  "Hyderabad",
  "London",
  "Mumbai"
]
Temperature Unit
weather-dashboard-unit

Example:

"C"

or:

"F"
Initial Visit
weather-dashboard-visited

This is used to determine whether the application should perform the initial automatic geolocation attempt.

📱 Responsive Design

The dashboard is designed to work across different screen sizes.

Desktop

Multiple weather cards can be displayed in a grid.

Tablet

Cards automatically adjust to the available width.

Mobile

The layout switches to a single-column presentation so that:

Search controls remain accessible
Weather cards remain readable
Forecast information remains usable
Charts fit within the screen
🔒 Security Note

The WeatherAPI key is stored in .env.local and excluded from version control.

However, because this is a frontend application using Vite environment variables, the API key is ultimately available to the browser at runtime.

For a production application with strict API-key protection, the recommended architecture would be:

React Frontend
      │
      ▼
Backend / Serverless Function
      │
      ▼
WeatherAPI.com

For this assignment, the API key follows the provided frontend environment-variable requirement.

🚀 Future Improvements

Possible improvements for a production version include:

Hourly forecast
Weather alerts
Air quality information
Dark mode
Weather-based background themes
Favorite cities
Search suggestions
API response caching
Backend proxy for API-key protection
Automated unit and integration tests
Deployment with CI/CD

These features are outside the core requirements of this assignment.

📌 Assignment Requirements Coverage
Requirement	Implementation
Single-command startup	Vite + npm
Automatic geolocation	Browser Geolocation API
Search cities	SearchBar component
Current weather	WeatherAPI
Humidity	WeatherAPI
Wind speed	WeatherAPI
Weather description	WeatherAPI condition data
7-day forecast	WeatherAPI Forecast API
Remove city	WeatherCard
Celsius/Fahrenheit	React state + Local Storage
Local Storage persistence	Browser Local Storage
Temperature chart	Recharts
Loading state	SkeletonLoader
Weather icons	Weather condition mapping
Responsive UI	Tailwind CSS
Error handling	API and user-input validation
👨‍💻 Author

Bhavya Teja

Frontend Development Assignment

Built using React, Vite, Tailwind CSS, Recharts, and WeatherAPI.com.