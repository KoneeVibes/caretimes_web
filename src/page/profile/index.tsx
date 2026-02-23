import { Navigation } from "../../container/navigation";
import { BaseMarquee } from "../../component/marquee";
import { Location } from "../../container/location";
import { ProfileWrapper } from "./styled";
import { Footer } from "../../container/footer";
import { ProfileArea } from "../../container/profilearea";

export const Profile = () => {
	return (
		<ProfileWrapper
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
			<ProfileArea />
			<Footer />
		</ProfileWrapper>
	);
};
