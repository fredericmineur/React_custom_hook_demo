import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const processRequest = useCallback(async (requestSettings, tranformRequest) => {


    try {
        const response = await fetch(
            requestSettings.url,
            {
                method: requestSettings.method? requestSettings.method: 'GET',
                body: requestSettings.body? requestSettings.body: null,
                headers: requestSettings.headers? requestSettings.headers : {},

            }
        //   'https://react-custom-hooks-28090-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();
  
        tranformRequest(data)
        // const loadedTasks = [];
  
        // for (const taskKey in data) {
        //   loadedTasks.push({ id: taskKey, text: data[taskKey].text });
        // }
  
        // setTasks(loadedTasks);
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
