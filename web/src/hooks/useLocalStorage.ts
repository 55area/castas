import { useState, useEffect, useCallback } from 'react';

interface UseLocalStorageReturn<T> {
  value: T | null;
  setValue: (value: T | null) => void;
  removeValue: () => void;
  isLoading: boolean;
}

/**
 * Custom hook for managing localStorage with React state
 * @param key - localStorage key
 * @param initialValue - Initial value if no stored value exists
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | null = null
): UseLocalStorageReturn<T> {
  const [value, setValueState] = useState<T | null>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setValueState(JSON.parse(stored));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  // Set value in localStorage and state
  const setValue = useCallback(
    (newValue: T | null) => {
      try {
        if (newValue === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
        setValueState(newValue);
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  // Remove value from localStorage and state
  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setValueState(null);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return { value, setValue, removeValue, isLoading };
}

export default useLocalStorage;
