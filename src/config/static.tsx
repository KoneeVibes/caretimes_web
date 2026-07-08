import {
	CartIcon,
	FacebookIcon,
	// FavouriteIcon,
	LinkedInIcon,
	ProfileIcon,
	TwitterIcon,
} from "../asset";
import LoginIcon from "@mui/icons-material/Login";
import heroImgOne from "../asset/image/WEBSITE BANNER 1.jpg";
import heroImgTwo from "../asset/image/WEBSITE BANNER 2.jpg";
import heroImgThree from "../asset/image/WEBSITE BANNER 3.jpg";
import heroImgFour from "../asset/image/WEBSITE BANNER 4.jpg";
import homeCare from "../asset/image/home-care-products.jpg";
import hairFruit from "../asset/image/hair-fruit.jpg";
import ultraWash from "../asset/image/no-dirty.png";
import headshotone from "../asset/image/testimonial-headshot-one.png";
import headshottwo from "../asset/image/testimonial-headshot-two.png";
import headshotthree from "../asset/image/testimonial-headshot-three.png";

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
		image: heroImgTwo,
	},
	{
		subtitle: "Express Your Scent",
		title: "Fragrance That Lasts All Day",
		description:
			"Our perfumery products are crafted to deliver refreshing, long-lasting scents that enhance personal style and leave a lasting impression.",
		callToActionText: "Explore Category",
		callToActionUrl: "/",
		image: heroImgThree,
	},
	{
		subtitle: "Nourish Your Hair",
		title: "Daily Moisture and Hair Protection",
		description:
			"Our hair creams are formulated to moisturize, soften, and protect hair, helping to reduce dryness while improving strength, shine, and manageability.",
		callToActionText: "Explore Category",
		callToActionUrl: "/",
		image: heroImgOne,
	},
	{
		subtitle: "Cleanse with Care",
		title: "Gentle and Effective Cleansing",
		description:
			"Our soaps are carefully crafted to deliver effective cleansing while being gentle on the skin, supporting hygiene, freshness, and everyday skin comfort.",
		callToActionText: "Explore Category",
		callToActionUrl: "/",
		image: heroImgFour,
	},
];

export const featuredProducts = [
	{
		position: "one",
		name: "Home Care",
		description:
			"Effective household cleaning solutions designed to deliver hygiene, freshness, and everyday protection.",
		thumbnail: homeCare,
		category: ["BODY LOTION", "SOAP", "PERFUME"],
	},
	{
		position: "two",
		name: "Hair Fruit",
		description:
			"Nourishing hair care enriched with fruit-inspired ingredients to support healthy, vibrant hair.",
		thumbnail: hairFruit,
		category: [
			"CRÈME RELAXERS",
			"ROYAL PETROLEUM JELLY",
			"IRRESISTIBLE BEAUTY MAKEUP",
		],
	},
	{
		position: "three",
		name: "Ultra Wash",
		description:
			"Powerful cleaning formula developed for deep cleansing and long-lasting freshness.",
		thumbnail: ultraWash,
		category: [
			"BODY LOTION",
			"BODY DEODORANT",
			"SOAP",
			"PERFUME",
			"CRÈME RELAXERS",
			"ROYAL PETROLEUM JELLY",
			"IRRESISTIBLE BEAUTY MAKEUP",
		],
	},
];

export const testimonial = [
	{
		customer: "Chidinma Okafor",
		review:
			"I tried Caretimes Shampoo recently and I really like it. It washes my hair well but doesn't leave it dry or stripped out. After every wash my hair feels fresh, soft, and easy to manage. It also smells nice. You only need a little bit each time, so the bottle lasts a while and it's worth the money. All in all, it's a good shampoo and I'd recommend it if you want something gentle that actually works.",
		title: "Happy Product User",
		headshot: headshotone,
	},
	{
		customer: "Aisha Bello",
		review:
			"I've been using Caretimes Relaxer and I'm really happy with it. It relaxed my hair evenly and didn't irritate my scalp. Afterward my hair felt soft, smooth, and easy to manage. I also liked that the smell wasn't too strong. Overall, it's a good relaxer that worked well for me, and I'd recommend it to anyone looking for something reliable.",
		title: "Happy Product User",
		headshot: headshottwo,
	},
	{
		customer: "Tobiloba Adeyemi",
		review:
			"I recently used Caretimes products and I was genuinely impressed. They worked exactly as expected, were easy to use, and gave great results. You can tell they're made with care, and I felt satisfied with my purchase. I'd happily recommend Caretimes to anyone looking for reliable, effective personal care products. I'll definitely be buying from them again.",
		title: "Happy Product User",
		headshot: headshotthree,
	},
];

export const footerLinks = {
	Company: [
		{
			title: "About Us",
			url: "/about",
		},
		{
			title: "Become a Distributor",
			url: "/contact/sales",
		},
		{
			title: "Contact Us",
			url: "/contact",
		},
	],
	Account: [
		{
			title: "My Profile",
			url: "/profile",
		},
		{
			title: "Cart",
			url: "/checkout",
		},
	],
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
