import { useCallback, useState } from "react";

const useHttp = (requestSettings, processData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
//   const [tasks, setTasks] = useState([]);

  const sendRequest = useCallback(async (taskText) => {
    setIsLoading(true);
    setError(null);
    // let httpSettings = {};
    // if (method = "POST") {
    //   httpSettings = {
    //     method: "POST",
    //     body: JSON.stringify({ text: taskText }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    // }
    console.log(requestSettings);
    try {
      const response = await fetch(
        requestSettings.url,
        {
            method: requestSettings.method ? requestSettings.method: 'GET',
            body: requestSettings.body ? JSON.stringify(requestSettings.body) : null,
            headers: requestSettings.headers ? requestSettings.headers : {}
        }
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();


       processData(data);

    //   if (method='POST') {
    //     const generatedId = data.name; // firebase-specific => "name" contains generated id
    //     const createdTask = { id: generatedId, text: taskText };
  
    //     // props.onAddTask(createdTask);
    //   } else {
        // const loadedTasks = [];

        // for (const taskKey in data) {
        //   loadedTasks.push({ id: taskKey, text: data[taskKey].text });
        // }
  
        // setTasks(loadedTasks);
    //   }
    

      
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, [processData]);

    return {
        isLoading,
        error,
        sendRequest
    };


};

export default useHttp;



