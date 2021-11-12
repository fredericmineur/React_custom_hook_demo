

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const { isLoading, error, processRequest } = useHttp();

  const transformRequest = (taskText,taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  

  const enterTaskHandler = async (taskText) => {
    processRequest(
      {
        url: "https://react-custom-hooks-28090-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: taskText })
      },
      transformRequest.bind(null, taskText)
    );
    // setIsLoading(true);
    // setError(null);
    // try {
    //   const response = await fetch(
    //     "https://react-custom-hooks-28090-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({ text: taskText }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Request failed!");
    //   }

    //   const data = await response.json();

    //   const generatedId = data.name; // firebase-specific => "name" contains generated id
    //   const createdTask = { id: generatedId, text: taskText };

    //   props.onAddTask(createdTask);
    // } catch (err) {
    //   setError(err.message || "Something went wrong!");
    // }
    // setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
