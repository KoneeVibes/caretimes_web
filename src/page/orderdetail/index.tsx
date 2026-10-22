import { BaseMarquee } from "../../component/marquee";
import { Order } from "../../container/order";
import { Footer } from "../../container/footer";
import { Location } from "../../container/location";
import { Navigation } from "../../container/navigation";
import { OrderDetailWrapper } from "./styled";

export const OrderDetail = () => {
	return (
		<OrderDetailWrapper
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
			<Order />
			<Footer />
		</OrderDetailWrapper>
	);
};
