import { Bottom } from "../../atoms/Bottom"
import { Top } from "../../atoms/Top"
import { Container } from "../../organisms/Container"


export function Home() {
    return (
        <div className="flex flex-col justify-between h-screen">
            <Top />
            <Container />
            <Bottom />
        </div >
    )
}
