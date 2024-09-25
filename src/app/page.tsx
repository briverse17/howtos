'use client'

import { Top } from "./components/atoms/Top";
import { Container } from "./components/organisms/Container";

export default function Home() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Top />
      <Container />
    </div>
  );
}
