import { About } from "@/widgets/about"
import { Adventures } from "@/widgets/adventures"
import { HeroMain } from "@/widgets/hero-main"
import { Quests } from "@/widgets/quests"

export const MainPage = () => {
    return (
        <>
            <HeroMain />
            <Adventures />
            <About />
            <Quests />
        </>
    )
}