import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const processRequest = useCallback(async (httpSettings, tranformData) => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await fetch(
          httpSettings.url, 
          {
              method: httpSettings.method? httpSettings.method: 'GET',
              body: httpSettings.body? httpSettings.body: null,
              headers: httpSettings.headers? httpSettings.headers: {}
          }
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();
  
        tranformData(data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);

      
  }, []);
  return {
    isLoading, error, processRequest
}
};

export default useHttp;
