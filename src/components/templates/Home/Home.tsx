import { Bottom } from "../../atoms/Bottom"
import { Top } from "../../atoms/Top"
import { Container } from "../../organisms/Container"


export function Home() {
    return (
        <div>
            <Top />
            <Container />
            <Bottom />
        </div >
    )
}
