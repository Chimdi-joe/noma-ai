export const mockWeatherData = {
  temperature: 28,
  feelsLike: 30,
  conditions: "Partly Cloudy",
  cloudCover: 40,
  humidity: 65,
  windSpeed: 12,
  windDirection: "NE",
  uvIndex: 6,
  pressure: 1015,
  pressureTrend: "rising"
};

export const agriculturalActivities = [
  { id: 'planting', label: 'Planting' },
  { id: 'harvesting', label: 'Harvesting' },
  { id: 'irrigation', label: 'Irrigation' },
  { id: 'fertilizing', label: 'Fertilizing' },
  { id: 'pestControl', label: 'Pest Control' },
];

export const mockRecommendations = {
  planting: [
    {
      id: 1,
      recommendation: "Ideal conditions for planting maize and cassava due to moderate humidity",
      priority: "high",
      weatherFactors: ["humidity", "temperature"]
    },
    {
      id: 2,
      recommendation: "Consider planting drought-resistant varieties if planning new crops",
      priority: "medium",
      weatherFactors: ["temperature"]
    }
  ],
  harvesting: [
    {
      id: 3,
      recommendation: "Good conditions for grain harvesting due to low humidity",
      priority: "high",
      weatherFactors: ["humidity", "cloudCover"]
    },
    {
      id: 4,
      recommendation: "Plan harvest activities for early morning to avoid peak temperatures",
      priority: "medium",
      weatherFactors: ["temperature"]
    }
  ],
  irrigation: [
    {
      id: 5,
      recommendation: "Reduce irrigation frequency due to recent rainfall",
      priority: "high",
      weatherFactors: ["humidity"]
    },
    {
      id: 6,
      recommendation: "Consider drip irrigation to conserve water",
      priority: "medium",
      weatherFactors: ["temperature", "humidity"]
    }
  ],
  fertilizing: [
    {
      id: 7,
      recommendation: "Favorable conditions for foliar fertilizer application",
      priority: "high",
      weatherFactors: ["windSpeed", "cloudCover"]
    },
    {
      id: 8,
      recommendation: "Wait for calmer winds before applying granular fertilizers",
      priority: "medium",
      weatherFactors: ["windSpeed"]
    }
  ],
  pestControl: [
    {
      id: 9,
      recommendation: "Monitor for increased pest activity due to humid conditions",
      priority: "high",
      weatherFactors: ["humidity", "temperature"]
    },
    {
      id: 10,
      recommendation: "Ideal morning conditions for pest control applications",
      priority: "medium",
      weatherFactors: ["windSpeed", "temperature"]
    }
  ]
};
