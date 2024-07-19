import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { ArticlesType } from "./types";

function App() {
  const [fileList, setFileList] = useState<ArticlesType>(Object());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/briverse17/howtos/content/contents.json`
        );
        const content = await response.json();
        if (!response.ok) {
          throw new Error(`Error: ${content}`);
        }
        setFileList(content);
        setError(null);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchList();
  }, []);

  return <>{error ? "Error" : <Home articles={fileList}></Home>}</>;
}

export default App;
