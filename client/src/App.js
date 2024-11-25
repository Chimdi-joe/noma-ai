import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import WeatherDashboard from './components/WeatherDashboard';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';
import { ThemeToggle } from './components/theme-toggle';
import './styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="weather-app-theme">
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main className="container mx-auto py-10">
            <ThemeToggle />
            <WeatherDashboard />
          </main>
          <Toaster />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
