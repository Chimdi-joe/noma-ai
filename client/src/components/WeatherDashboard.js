import React from 'react';
import { useQuery } from 'react-query';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { 
  Cloud, 
  Sun, 
  Droplets, 
  Wind, 
  Navigation, 
  ThermometerSun, 
  RefreshCw,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { mockWeatherData, mockRecommendations, agriculturalActivities } from '../mockData';
import WeatherCard from './WeatherCard';
import { ActivityFilter } from './ActivityFilter';
import { cn } from '../lib/utils';

// Simulating API delay
const fetchWeatherData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockWeatherData;
};

const getPressureIcon = (trend) => {
  switch (trend.toLowerCase()) {
    case 'rising':
      return ArrowUp;
    case 'falling':
      return ArrowDown;
    default:
      return Minus;
  }
};

const getUVDescription = (index) => {
  if (index <= 2) return 'Low';
  if (index <= 5) return 'Moderate';
  if (index <= 7) return 'High';
  if (index <= 10) return 'Very High';
  return 'Extreme';
};

const LoadingState = () => (
  <div className="min-h-screen weather-gradient p-8">
    <div className="container mx-auto space-y-8 animate-pulse">
      <div className="h-12 bg-white/50 rounded-lg w-48"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40 bg-white/50 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="min-h-screen weather-gradient p-8">
    <div className="container mx-auto text-center text-white">
      <h2 className="text-2xl font-bold mb-4">Error loading weather data</h2>
      <p>Unable to load weather data. Please try again.</p>
      <button
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        onClick={onRetry}
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </button>
    </div>
  </div>
);

const WeatherDashboard = () => {
  const [selectedActivity, setSelectedActivity] = React.useState(null);

  const { data: weatherData, isLoading, error, refetch } = useQuery(
    'weatherData',
    fetchWeatherData,
    {
      staleTime: 300000, // 5 minutes
      cacheTime: 3600000, // 1 hour
    }
  );

  const getFilteredRecommendations = () => {
    if (!weatherData) return [];
    if (!selectedActivity) {
      return Object.values(mockRecommendations)
        .flat()
        .filter(rec => rec.priority === "high");
    }
    return mockRecommendations[selectedActivity] || [];
  };

  const getActivityLabel = (activityId) => {
    if (!activityId) return 'All';
    const activity = agriculturalActivities.find(a => a.id === activityId);
    return activity ? activity.label : activityId;
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  const filteredRecommendations = selectedActivity
    ? mockRecommendations[selectedActivity] || []
    : Object.values(mockRecommendations).flat();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="container mx-auto space-y-8">
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div>
            <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100">
              Noma AI
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Smart Farming Insights for Bali, Nigeria | Noma (farming in Hausa)
            </p>
          </div>
          <ActivityFilter 
            activities={agriculturalActivities} 
            selectedActivity={selectedActivity} 
            onActivityChange={setSelectedActivity} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <WeatherCard
            title="Temperature"
            icon={ThermometerSun}
            value={`${weatherData.temperature}°C`}
            subtitle={`Feels like ${weatherData.feelsLike}°C`}
          />
          <WeatherCard
            title="Conditions"
            icon={Cloud}
            value={weatherData.conditions}
            subtitle={`${weatherData.cloudCover}% cloud cover`}
          />
          <WeatherCard
            title="Humidity"
            icon={Droplets}
            value={`${weatherData.humidity}%`}
            subtitle="Relative humidity"
          />
          <WeatherCard
            title="Wind"
            icon={Wind}
            value={`${weatherData.windSpeed} km/h`}
            subtitle={`Direction: ${weatherData.windDirection}`}
          />
          <WeatherCard
            title="UV Index"
            icon={Sun}
            value={weatherData.uvIndex}
            subtitle={getUVDescription(weatherData.uvIndex)}
          />
          <WeatherCard
            title="Pressure"
            icon={getPressureIcon(weatherData.pressureTrend)}
            value={`${weatherData.pressure} hPa`}
            subtitle={`${weatherData.pressureTrend.charAt(0).toUpperCase() + weatherData.pressureTrend.slice(1)}`}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            {`${getActivityLabel(selectedActivity)} Recommendations`}
          </h2>
          <div className="space-y-4">
            {filteredRecommendations.map((rec, index) => (
              <div
                key={rec.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors bg-white dark:bg-gray-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-gray-900 dark:text-gray-100 flex-grow">{rec.recommendation}</p>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap",
                    rec.priority === 'high'
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
                  )}>
                    {rec.priority} priority
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {rec.weatherFactors.map((factor, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm font-medium"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
