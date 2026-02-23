import {
	CartIcon,
	FacebookIcon,
	// FavouriteIcon,
	LinkedInIcon,
	ProfileIcon,
	TwitterIcon,
} from "../asset";
import LoginIcon from "@mui/icons-material/Login";
import heroImgOne from "../asset/image/hero-image-one.svg";
import babycare from "../asset/image/category-babycare.svg";
import skincare from "../asset/image/category-skincare.svg";
import bodylotion from "../asset/image/category-bodylotion.svg";
import deodorant from "../asset/image/category-bodylotion.svg";
import haircare from "../asset/image/category-haircare.svg";
import coconutbodylotion from "../asset/image/featured-product-coconut-body-lotion.svg";
import hairafro from "../asset/image/featured-product-hair-afro.svg";
import headshotone from "../asset/image/testimonial-headshot-one.svg";
import headshottwo from "../asset/image/testimonial-headshot-two.svg";
import headshotthree from "../asset/image/testimonial-headshot-three.svg";

export const navLinks = [
	{
		name: "Home",
		url: "/",
	},
	{
		name: "All Products",
		url: "/product",
	},
	{
		name: "About Us",
		url: "/about",
	},
	{
		name: "Contact Us",
		url: "/contact",
	},
];

export const navCallToActions = [
	{
		name: "Login",
		icon: <LoginIcon sx={{ color: "var(--light-color)" }} />,
	},
	{
		name: "Profile",
		icon: <ProfileIcon />,
	},
	{
		name: "Cart",
		icon: <CartIcon />,
	},
];

export const physicalLocations = ["Lagos", "Asaba", "Ibadan", "Portharcourt"];

export const heroInfo = [
	{
		subtitle: "Protect Your Skin",
		title: "Daily Care for Healthy Skin",
		description:
			"Our skincare products are thoughtfully formulated to cleanse, nourish, and protect the skin, supporting a healthy, balanced complexion for everyday confidence.",
		callToActionText: "Explore Category",
		callToActionUrl: "/",
		image: heroImgOne,
	},
	{
		subtitle: "Strengthen Your Hair",
		title: "Everyday Care for Healthy Hair",
		description:
			"Our hair care solutions are carefully formulated to cleanse, nourish, and protect hair, helping to improve strength, shine, and manageability for daily confidence.",
		callToActionText: "Explore Category",
		callToActionUrl: "/",
		image: heroImgOne,
	},
	{
		subtitle: "Care for Your Body",
		title: "Daily Comfort and Lasting Freshness",
		description:
			"Designed for everyday use, our body care products cleanse, moisturize, and refresh the skin while supporting comfort, hygiene, and long-lasting freshness.",
		callToActionText: "Explore Category",
		callToActionUrl: "/",
		image: heroImgOne,
	},
];

export const productCategories = [
	{ title: "Baby Care", img: babycare },
	{ title: "Body Care", img: skincare },
	{ title: "Body Lotion", img: bodylotion },
	{ title: "Deodorant", img: deodorant },
	{ title: "Hair Care", img: haircare },
	{ title: "Baby Care", img: babycare },
	{ title: "Body Care", img: skincare },
	{ title: "Body Lotion", img: bodylotion },
	{ title: "Deodorant", img: deodorant },
	{ title: "Hair Care", img: haircare },
	{ title: "Baby Care", img: babycare },
	{ title: "Body Care", img: skincare },
	{ title: "Body Lotion", img: bodylotion },
	{ title: "Deodorant", img: deodorant },
	{ title: "Hair Care", img: haircare },
];

export const featuredProducts = [
	{
		position: "one",
		name: "Coconut Body Lotion",
		description:
			"Freshly made from harvested coconut with the best nutrients for your skin",
		thumbnail: coconutbodylotion,
		category: ["BODY LOTION"],
	},
	{
		position: "two",
		name: "Women’s Collections",
		description: "Featured woman collections that give you another vibe",
		thumbnail: coconutbodylotion,
		category: ["CRÈME RELAXERS", "IRRESISTIBLE BEAUTY MAKEUP", "SOAP"],
	},
	{
		position: "three",
		name: "Hair Afro",
		description: "New product with anti-dandruff",
		thumbnail: hairafro,
		category: ["ROYAL PETROLEUM JELLY"],
	},
	{
		position: "four",
		name: "Perfume",
		description: "Gucci intense OUD EDP",
		thumbnail: hairafro,
		category: ["PERFUME", "BODY DEODORANT"],
	},
];

export const testimonial = [
	{
		customer: "Robert Fox",
		review:
			"Tranexx has transformed my approach to finance. Their smart investing options have helped me grow my wealth, and their user-friendly platform makes managing my money a breeze. I've never felt more confident about my financial future.",
		title: "Happy Product User",
		headshot: headshotone,
	},
	{
		customer: "Cameron Williamson",
		review:
			"Tranexx has transformed my approach to finance. Their smart investing options have helped me grow my wealth, and their user-friendly platform makes managing my money a breeze. I've never felt more confident about my financial future.",
		title: "Happy Product User",
		headshot: headshottwo,
	},
	{
		customer: "Esther Howard",
		review:
			"Tranexx has transformed my approach to finance. Their smart investing options have helped me grow my wealth, and their user-friendly platform makes managing my money a breeze. I've never felt more confident about my financial future.",
		title: "Happy Product User",
		headshot: headshotthree,
	},
	{
		customer: "Robert Fox 3",
		review:
			"Tranexx has transformed my approach to finance. Their smart investing options have helped me grow my wealth, and their user-friendly platform makes managing my money a breeze. I've never felt more confident about my financial future.",
		title: "Happy Product User",
		headshot: headshotone,
	},
	{
		customer: "Cameron Williamson 3",
		review:
			"Tranexx has transformed my approach to finance. Their smart investing options have helped me grow my wealth, and their user-friendly platform makes managing my money a breeze. I've never felt more confident about my financial future.",
		title: "Happy Product User",
		headshot: headshottwo,
	},
	{
		customer: "Esther Howard 3",
		review:
			"Tranexx has transformed my approach to finance. Their smart investing options have helped me grow my wealth, and their user-friendly platform makes managing my money a breeze. I've never felt more confident about my financial future.",
		title: "Happy Product User",
		headshot: headshotthree,
	},
];

export const footerLinks = {
	Company: [
		"About Us",
		"Become a Distributor",
		"Our Locations",
		"Contact Us",
		"Career",
	],
	"Quick Links": [
		"Join our Newsletter",
		"Shipping and Returns",
		"Privacy Policy",
		"Terms of Use",
		"FAQs",
	],
	Account: ["My Account", "Wishlist", "Cart", "Track Order"],
};

export const socialMedia = [
	{
		name: "LinkedIn",
		icon: <LinkedInIcon />,
		url: "",
	},
	{
		name: "Facebook",
		icon: <FacebookIcon />,
		url: "",
	},
	{
		name: "Twitter",
		icon: <TwitterIcon />,
		url: "",
	},
];

export const offerings = [
	{
		title: "Personal Care Products",
		description:
			"Thoughtfully formulated essentials designed to support daily hygiene, comfort, and overall wellness",
	},
	{
		title: "Perfumery Products",
		description:
			"Refreshing and long-lasting fragrances crafted to enhance confidence and personal expression",
	},
	{
		title: "Toiletries & Soaps",
		description:
			"Reliable cleaning solutions developed for effective hygiene at home and on the go",
	},
	{
		title: "Color Cosmetics",
		description:
			"High-quality makeup products created to enhance natural beauty with lasting color and performance",
	},
];
