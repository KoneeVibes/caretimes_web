import { BaseMarquee } from "../../component/marquee";
import { Banner } from "../../container/banner";
import { Footer } from "../../container/footer";
import { Location } from "../../container/location";
import { Navigation } from "../../container/navigation";
import { Products } from "../../container/products";
import { SavedItems } from "../../container/saveditems";
import { CategoryWrapper } from "./styled";

export const Category = () => {
	return (
		<CategoryWrapper
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
			<Products />
			<Banner />
			<SavedItems />
			<Footer />
		</CategoryWrapper>
	);
};
