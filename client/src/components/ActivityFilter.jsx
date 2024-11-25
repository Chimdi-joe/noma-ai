import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export const ActivityFilter = ({ activities, selectedActivity, onActivityChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = selectedActivity 
    ? activities.find(a => a.id === selectedActivity)?.label 
    : 'All Activities';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 text-blue-900 dark:text-blue-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
      >
        <span className="font-medium">{selectedLabel}</span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform",
          isOpen && "transform rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700">
          <div className="py-1">
            <button
              className={cn(
                "w-full text-left px-4 py-2 text-sm transition-colors",
                !selectedActivity 
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium" 
                  : "text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
              )}
              onClick={() => {
                onActivityChange(null);
                setIsOpen(false);
              }}
            >
              All Activities
            </button>
            {activities.map((activity) => (
              <button
                key={activity.id}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm transition-colors",
                  selectedActivity === activity.id 
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium" 
                    : "text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
                onClick={() => {
                  onActivityChange(activity.id);
                  setIsOpen(false);
                }}
              >
                {activity.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
