import { BaseMarquee } from "../../component/marquee";
import { Banner } from "../../container/banner";
import { BestSellers } from "../../container/bestsellers";
import { Categories } from "../../container/categories";
import { FeaturedProducts } from "../../container/featuredproducts";
import { Footer } from "../../container/footer";
import { Hero } from "../../container/hero";
import { Location } from "../../container/location";
import { Navigation } from "../../container/navigation";
import { Testimonial } from "../../container/testimonial";
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
            <Categories />
            <BestSellers />
            <Banner />
            <FeaturedProducts />
            <Testimonial />
            <Footer />
        </HomeWrapper>
    )
}