import { BaseMarquee } from "../../component/marquee";
import { Hero } from "../../container/hero";
import { Location } from "../../container/location";
import { Navigation } from "../../container/navigation";
import { HomeWrapper } from "./styled";

export const Home = () => {
    return (
        <HomeWrapper
            maxWidth={false}
            sx={{
                padding: "0 !important",
            }}
        >
            <BaseMarquee
                items={[<Location />]}
                background="var(--marquee-bg-color)"
            />
            <Navigation />
            <Hero />
        </HomeWrapper>
    )
}