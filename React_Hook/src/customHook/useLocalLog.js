import { useEffect } from 'react';

export default function useLocalLog(value) {
  useEffect(() => {
    console.log(value);
  }, [value]);
}
