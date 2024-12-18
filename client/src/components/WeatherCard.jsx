import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const WeatherCard = ({ title, icon: Icon, value, subtitle }) => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium text-blue-900 dark:text-blue-100">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-blue-800 dark:text-blue-200" />}
      </CardHeader>
      <CardContent>
        <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {typeof subtitle === 'string' ? subtitle : subtitle}
        </p>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
