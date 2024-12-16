import { useEffect, useState } from 'react';

export const useClientOnly = <T>(clientOnlyFunc: () => T): T | null => {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    setValue(clientOnlyFunc());
  }, [clientOnlyFunc]);

  return value;
};

