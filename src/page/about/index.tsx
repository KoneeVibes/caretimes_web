import { Navigation } from "../../container/navigation";
import { BaseMarquee } from "../../component/marquee";
import { Location } from "../../container/location";
import { AboutWrapper } from "./styled";
import { Footer } from "../../container/footer";
import { PageTitle } from "../../container/pagetitle";
import { OurStory } from "../../container/ourstory";
import { WhatWeDo } from "../../container/whatwedo";
import { Testimonial } from "../../container/testimonial";

export const About = () => {
	return (
		<AboutWrapper
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
			<PageTitle title="About Us" />
			<OurStory />
			<WhatWeDo />
			<Testimonial />
			<Footer />
		</AboutWrapper>
	);
};
