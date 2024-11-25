import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const MotionBox = motion(Box);

const ForecastChart = ({ weatherData }) => {
  const formatData = (data) => {
    if (!data) return [];
    return data.map((item) => ({
      name: new Date(item.timestamp).toLocaleTimeString(),
      temperature: item.temperature,
      humidity: item.humidity,
      windSpeed: item.wind_speed,
    }));
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      bg="white"
      p={6}
      borderRadius="xl"
      boxShadow="lg"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4} color="brand.700">
        Weather Trends
      </Text>
      <Box h="400px">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formatData(weatherData)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#FF6B6B"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#4DABF7"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="windSpeed"
              stroke="#748FFC"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </MotionBox>
  );
};

export default ForecastChart;
