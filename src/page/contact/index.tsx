import { Navigation } from "../../container/navigation";
import { BaseMarquee } from "../../component/marquee";
import { Location } from "../../container/location";
import { ContactWrapper } from "./styled";
import { Footer } from "../../container/footer";

export const Contact = () => {
	return (
		<ContactWrapper
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
			<Footer />
		</ContactWrapper>
	);
};
