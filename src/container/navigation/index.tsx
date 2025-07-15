import { Box, IconButton, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { NavigationWrapper } from "./styled";
import logo from "../../asset/logo.png";
import { useNavigate } from "react-router-dom";
import { navCallToActions, navLinks } from "../../config/static";
import { HashLink } from 'react-router-hash-link';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { BaseFieldSet } from "../../component/form/fieldset/styled";
import { BaseInput } from "../../component/form/input/styled";
import { SearchIcon } from "../../asset";
import { BaseNotificationModal } from "../../component/modal/notification";
import authMethodSelectionThumbnail from "../../asset/image/auth-method-selection-thumbnail.png";
import { AuthenticationFormModal } from "../forms/authentication";

export const Navigation = () => {
    const navigate = useNavigate();
    const {
        openMenu,
        setOpenMenu,
        isAuthenticationMethodSelectionModalOpen,
        setIsAuthenticationMethodSelectionModalOpen,
        setIsAuthenticationFormModalOpen
    } = useContext(AppContext);

    const [formDetails, setFormDetails] = useState({
        productName: ""
    });

    useEffect(() => {
        if (openMenu) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "visible"
        }
    }, [openMenu]);

    const handleLogoClick = () => {
        setOpenMenu(false);
        navigate("/");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<unknown>) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAuthenticationMethodSelectionModalClose = () => {
        return setIsAuthenticationMethodSelectionModalOpen(false);
    };

    const handleAuthenticationMethodSelection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        e.stopPropagation();
        e.preventDefault();
        setIsAuthenticationMethodSelectionModalOpen(false);
        switch (id) {
            case "callToActionI":
                setIsAuthenticationFormModalOpen({ status: true, index: 0 })
                break;
            case "callToActionII":
                setIsAuthenticationFormModalOpen({ status: true, index: 1 })
                break;
            case "callToActionIII":
            default:
                break;
        };
        return;
    };

    const authMethodSelectionBody = (
        <Box
            component={"div"}
            padding={"0 calc(var(--basic-padding)/2)"}
            marginBlockStart={"calc(var(--basic-margin)/8)"}
        >
            <Typography
                variant="body1"
                fontFamily={"Inter"}
                fontWeight={400}
                fontSize={14}
                lineHeight={"normal"}
                color="var(--dark-color)"
                textAlign={"center"}
                whiteSpace={"normal"}
            >
                Create an account or Log in to continue.
            </Typography>
        </Box>
    );

    return (
        <NavigationWrapper>

            {/* Modals below */}
            <BaseNotificationModal
                className="authentication-method-selection-notification-modal"
                title="Get started buying today"
                open={isAuthenticationMethodSelectionModalOpen}
                isLoading={false}
                headerBg={<img
                    src={authMethodSelectionThumbnail}
                    alt="Authentication Method Selection Modal Thumbnail"
                    style={{
                        objectFit: "fill",
                        width: "100%",
                        height: "100%",
                        aspectRatio: "1/1"
                    }}
                />}
                body={authMethodSelectionBody}
                callToActionI="Create an account"
                callToActionII="Log in to an account"
                callToActionIII="Continue as guest"
                handleClose={handleAuthenticationMethodSelectionModalClose}
                handleCallToAction={handleAuthenticationMethodSelection}
            />
            <AuthenticationFormModal />
            {/* Modals above */}

            <Box
                component={"div"}
                className="favicon-box"
            >
                <img
                    src={logo}
                    alt="logo"
                    onClick={handleLogoClick}
                />
            </Box>
            <Stack
                className="nav-items"
            >
                <Stack
                    className="nav-links"
                >
                    {navLinks.map((navLink, index) => {
                        return (
                            <HashLink
                                key={index}
                                to={navLink.url}
                                smooth={true}
                                onClick={() => setOpenMenu(false)}
                            >
                                <Typography
                                    variant="subtitle1"
                                    fontFamily={"Inter"}
                                    fontWeight={400}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    color={"var(--light-color)"}
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                >
                                    {navLink.name}
                                </Typography>
                            </HashLink>
                        )
                    })}
                </Stack>
                <Box
                    component={"div"}
                    className="nav-search-field-box"
                >
                    <form>
                        <BaseFieldSet>
                            <BaseInput
                                radius="0"
                                border="none"
                                name="productName"
                                placeholder="Search Products"
                                startAdornment={<SearchIcon />}
                                value={formDetails.productName}
                                onChange={(e) => handleChange(e)}
                                padding="calc(var(--basic-padding)/7.6) 0"
                                sx={{
                                    gap: "calc(var(--flex-gap)/8)",
                                    borderBottom: "1px solid var(--input-field-border-color)"
                                }}
                            />
                        </BaseFieldSet>
                    </form>
                </Box>
                <Stack
                    className="mobile-nav-call-to-actions"
                >
                    {navCallToActions.map((callToAction, index) => (
                        <Box
                            key={index}
                            overflow={"hidden"}
                        >
                            <IconButton>{callToAction.icon}</IconButton>
                        </Box>
                    ))}
                </Stack>
            </Stack>
            <Stack
                className="desktop-nav-call-to-actions"
            >
                {navCallToActions.map((callToAction, index) => (
                    <Box
                        key={index}
                        overflow={"hidden"}
                    >
                        <IconButton>{callToAction.icon}</IconButton>
                    </Box>
                ))}
            </Stack>
            <Box
                component={"div"}
                className="menu-button-box"
            >
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="menu"
                    sx={{
                        color: "var(--light-color)",
                        padding: 0
                    }}
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    <MenuIcon />
                </IconButton>
            </Box>
        </NavigationWrapper>
    )
}