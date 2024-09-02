"use client"

import { ArticlesType } from "./types";
import { useEffect, useState } from "react";
import Top from "./components/Top/Top";
import MenuItem from "./components/MenuItem/MenuItem";
import { Viewer } from "./components/Viewer";
import Bottom from "./components/Bottom/Bottom";
export default function Home() {
  const [fileList, setFileList] = useState<ArticlesType>(Object());
  const [fileContent, setFileContent] = useState<string>('');
  const [active, setActive] = useState<string>('');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch(
        `https://raw.githubusercontent.com/briverse17/howtos/content/contents.json`
      );
      const data = await response.json();
      setFileList(data);

      // Load and display the first file's content
      if (Object.keys(data).length > 0) {
        const first = Object.keys(data)[0];
        setActive(first);
        loadFile(first);
      }
    };
    fetchList();
  }, []);

  // Function to load and display the file content
  const loadFile = async (fileName: string) => {
    const response = await fetch(`https://raw.githubusercontent.com/briverse17/howtos/content/${fileName}`);
    const content = await response.text();
    setActive(fileName);
    setFileContent(content);
  };


  return (
    <div>
      <Top></Top>
      <div className="container flex mx-auto my-2 max-h-[calc(100vh-6rem)]">
        <div className="w-1/5 border-[1px] rounded-2xl border-gray-300">
          <div className="px-2 py-2 grid gap-2 text-sm">
            {Object.entries(fileList).map(([key, value]) => (
              <MenuItem
                id={key}
                key={key}
                value={value}
                active={active}
                hovered={hovered}
                onClick={loadFile}
                onMouseEnter={setHovered}
                onMouseLeave={setHovered}
              />
            ))}
          </div>
        </div>
        <Viewer content={fileContent} />
      </div>
      <Bottom></Bottom>
    </div>
  );
}
