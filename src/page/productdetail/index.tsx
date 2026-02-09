import { BaseMarquee } from "../../component/marquee";
import { Footer } from "../../container/footer";
import { Location } from "../../container/location";
import { Navigation } from "../../container/navigation";
import { ProductDescription } from "../../container/productdescription";
import { SavedItems } from "../../container/saveditems";
import { ProductWrapper } from "./styled";

export const ProductDetail = () => {
	return (
		<ProductWrapper
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
			<ProductDescription />
			<SavedItems />
			<Footer />
		</ProductWrapper>
	);
};
