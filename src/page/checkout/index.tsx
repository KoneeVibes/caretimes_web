import { BaseMarquee } from "../../component/marquee";
import { Footer } from "../../container/footer";
import { Location } from "../../container/location";
import { Navigation } from "../../container/navigation";
import { CheckoutWrapper } from "./styled";

export const Checkout = () => {
	return (
		<CheckoutWrapper
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
		</CheckoutWrapper>
	);
};
