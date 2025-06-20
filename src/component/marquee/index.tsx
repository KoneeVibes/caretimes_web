import Marquee from "react-fast-marquee";
import { BaseMarqueePropsType } from "../../type/component.type";

export const BaseMarquee: React.FC<BaseMarqueePropsType> = ({ items, background }) => {
    return (
        <Marquee
            autoFill={true}
            pauseOnHover={true}
            pauseOnClick={true}
            style={{
                background: background,
                userSelect: "none"
            }}
        >
            {items}
        </Marquee>
    )
}