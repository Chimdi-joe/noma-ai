import React from 'react';
import { Box, Text, VStack, Icon, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';

const MotionBox = motion(Box);

const RecommendationsPanel = ({ recommendations }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      bg="white"
      p={6}
      borderRadius="xl"
      boxShadow="lg"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4} color="brand.700">
        Farming Recommendations
      </Text>

      <VStack spacing={4} align="stretch">
        {recommendations.map((recommendation, index) => (
          <MotionBox
            key={index}
            whileHover={{ scale: 1.02 }}
            p={4}
            bg="gray.50"
            borderRadius="md"
            transition="all 0.2s"
          >
            <Flex align="center" gap={3}>
              <Icon as={FaLeaf} color="green.500" />
              <Text color="gray.700">{recommendation}</Text>
            </Flex>
          </MotionBox>
        ))}

        {recommendations.length === 0 && (
          <Box p={4} bg="gray.50" borderRadius="md">
            <Text color="gray.500" textAlign="center">
              No recommendations available at the moment
            </Text>
          </Box>
        )}
      </VStack>
    </MotionBox>
  );
};

export default RecommendationsPanel;
