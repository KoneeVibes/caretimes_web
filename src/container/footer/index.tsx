import { Box, SelectChangeEvent, Stack, Typography, useMediaQuery } from "@mui/material";
import { FooterWrapper } from "./styled";
import oliteLogo from "../../asset/olite-logo.svg";
import { BaseFieldSet } from "../../component/form/fieldset/styled";
import { BaseInput } from "../../component/form/input/styled";
import { BaseButton } from "../../component/button/styled";
import { useState } from "react";
import { footerLinks, socialMedia } from "../../config/static";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

export const Footer = () => {
    const matches = useMediaQuery('(max-width:200px)');

    const [formDetails, setFormDetails] = useState({
        email: ""
    });

    const handleChange = (e: SelectChangeEvent<unknown> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormDetails(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNewsletterRegistration = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <FooterWrapper>
            <Stack
                className="footer-layer-one"
            >
                <Stack
                    direction={{ desktop: "row" }}
                    gap={"calc(var(--flex-gap)/4)"}
                    className="footer-layer-one-LHS"
                >
                    <Box>
                        <img
                            src={oliteLogo}
                            alt="olite-logo"
                            style={{
                                width: matches ? "100%" : "auto",
                                height: "auto"
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontFamily={"Inter"}
                            fontWeight={600}
                            fontSize={18}
                            lineHeight={"normal"}
                            whiteSpace={"normal"}
                            color={"var(--marquee-bg-color)"}
                        >
                            Produced by
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            fontFamily={"Cormorant"}
                            fontWeight={500}
                            fontSize={{ mobile: 24, desktop: 36 }}
                            lineHeight={"normal"}
                            whiteSpace={"normal"}
                            color={"var(--marquee-bg-color)"}
                        >
                            Olite Manufacturing Company Limited
                        </Typography>
                    </Box>
                </Stack>
                <Stack
                    className="footer-layer-one-RHS"
                >
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontFamily={"Cormorant"}
                            fontWeight={500}
                            fontSize={{ mobile: 24, desktop: 36 }}
                            lineHeight={"normal"}
                            whiteSpace={"normal"}
                            textAlign={{ desktop: "right" }}
                            color={"var(--marquee-bg-color)"}
                        >
                            Subscribe To Our Newsletter
                        </Typography>
                        <Typography
                            variant="body1"
                            fontFamily={"Inter"}
                            fontWeight={500}
                            fontSize={{ mobile: 14 }}
                            lineHeight={"normal"}
                            whiteSpace={"normal"}
                            textAlign={{ desktop: "right" }}
                            color={"var(--marquee-bg-color)"}
                        >
                            Get the latest updates on new products and upcoming sales
                        </Typography>
                    </Box>
                    <Stack>
                        <Box
                            marginLeft={{ desktop: "auto" }}
                        >
                            <form
                                className="registration-form"
                                onSubmit={handleNewsletterRegistration}
                            >
                                <Box>
                                    <BaseFieldSet>
                                        <BaseInput
                                            name="email"
                                            bgcolor={"var(--light-color)"}
                                            placeholder="Enter your email"
                                            value={formDetails.email}
                                            onChange={(e) => handleChange(e)}
                                            sx={{
                                                gap: "calc(var(--flex-gap)/8)",
                                                borderBottom: "1px solid var(--input-field-border-color)"
                                            }}
                                        />
                                    </BaseFieldSet>
                                </Box>
                                <Box
                                    sx={{ display: "flex", overflow: "hidden" }}
                                >
                                    <BaseButton
                                        disableElevation
                                        variant="contained"
                                    >
                                        Submit
                                    </BaseButton>
                                </Box>
                            </form>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                className="footer-layer-two"
            >
                <Stack
                    className="footer-layer-two-LHS"
                >
                    {Object.entries(footerLinks).map(([sectionTitle, links], index) => (
                        <Stack
                            key={index}
                            gap={"calc(var(--flex-gap)/2)"}
                        >
                            <Box>
                                <Typography
                                    variant="h3"
                                    fontFamily="Inter"
                                    fontWeight={600}
                                    fontSize={{ mobile: 18 }}
                                    lineHeight="normal"
                                    whiteSpace="normal"
                                    color="var(--dark-color)"
                                >
                                    {sectionTitle}
                                </Typography>
                            </Box>
                            <Stack
                                gap={"calc(var(--flex-gap)/8)"}
                            >
                                {links.map((item, subIndex) => (
                                    <Box key={subIndex}>
                                        <Typography
                                            variant="body1"
                                            fontFamily="Inter"
                                            fontWeight={500}
                                            fontSize={{ mobile: 14 }}
                                            lineHeight="normal"
                                            whiteSpace="normal"
                                            color="var(--off-gray-color)"
                                            sx={{ cursor: "pointer" }}
                                        >
                                            {item}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
                <Stack
                    className="footer-layer-two-RHS"
                >
                    <Box>
                        <Typography
                            variant="h3"
                            fontFamily="Inter"
                            fontWeight={600}
                            fontSize={{ mobile: 18 }}
                            lineHeight="normal"
                            whiteSpace="normal"
                            color="var(--dark-color)"
                        >
                            Contact Us
                        </Typography>
                    </Box>
                    <Stack
                        className="footer-layer-two-RHS-contact-area"
                    >
                        <Box
                            overflow={"hidden"}
                        >
                            <PhoneOutlinedIcon />
                        </Box>
                        <Stack
                            gap={"calc(var(--flex-gap)/4)"}
                        >
                            <Box>
                                <Typography
                                    variant="body1"
                                    fontFamily="Inter"
                                    fontWeight={400}
                                    fontSize={{ mobile: 14 }}
                                    lineHeight="normal"
                                    whiteSpace="normal"
                                    color="var(--dark-color)"
                                >
                                    Got questions? Call us 24/7
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    variant="body1"
                                    fontFamily="Inter"
                                    fontWeight={700}
                                    fontSize={{ mobile: 14 }}
                                    lineHeight="normal"
                                    whiteSpace="normal"
                                    color="var(--dark-color)"
                                >
                                    (00) 11 234 5648
                                </Typography>
                            </Box>
                        </Stack>
                        <Box
                            overflow={"hidden"}
                        >
                            <ArrowForwardIosIcon />
                        </Box>
                    </Stack>
                    <Stack
                        flexDirection={{ tablet: "row" }}
                        alignItems={{ tablet: "center" }}
                        gap={"calc(var(--flex-gap)/8)"}
                    >
                        <Box>
                            <Typography
                                variant="caption"
                                fontFamily="Inter"
                                fontWeight={700}
                                fontSize={{ mobile: 14 }}
                                lineHeight="normal"
                                whiteSpace="normal"
                                color="var(--dark-color)"
                            >
                                Find us on:
                            </Typography>
                        </Box>
                        <Stack
                            flexDirection={"row"}
                            gap={"calc(var(--flex-gap)/16)"}
                        >
                            {socialMedia?.map((channel, index) => (
                                <Box
                                    key={index}
                                    sx={{ cursor: "pointer" }}
                                >
                                    {channel.icon}
                                </Box>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                className="footer-layer-three"
            >
                <Box>
                    <Typography
                        variant="body1"
                        fontFamily="Inter"
                        fontWeight={400}
                        fontSize={{ mobile: 12 }}
                        lineHeight="normal"
                        whiteSpace="normal"
                        color="var(--dark-color)"
                    >
                        @2025 Caretimes Cosmetics | All Rights Reserved
                    </Typography>
                </Box>
            </Stack>
        </FooterWrapper >
    )
}