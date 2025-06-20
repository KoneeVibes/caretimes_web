import { Stack, styled } from "@mui/material";
import { useContext, useEffect } from "react";
import { Context } from "../../context";

export const NavigationWrapper = styled(Stack)(({ theme }) => {
    const { openMenu, setOpenMenu } = useContext(Context);

    useEffect(() => {
        const handleResize = () => {
            setOpenMenu(false);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setOpenMenu]);

    return {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "calc(var(--basic-padding)/3) calc(var(--basic-padding)/2)",
        gap: "calc(var(--flex-gap)/2)",
        background: "var(--primary-color)",
        "& .favicon-box": {
            overflow: "hidden",
            "& img": {
                width: "100%",
                height: "auto",
                cursor: "pointer",
            }
        },
        "& .nav-items": {
            display: openMenu ? "flex" : "none",
            position: openMenu ? "fixed" : "static",
            top: "8.191625rem",
            left: 0,
            right: 0,
            background: "inherit",
            height: "-webkit-fill-available",
            zIndex: 10,
            overflow: "auto",
            "& .nav-links": {
                gap: "calc(var(--flex-gap)/2)",
                padding: "calc(var(--basic-padding)/2)",
            },
            "& .nav-search-field-box": {
                padding: "calc(var(--basic-padding)/2)",
                "& form": {
                    overflow: "hidden",
                }
            },
            "& .mobile-nav-call-to-actions": {
                display: "flex",
                flexDirection: "row",
                gap: "calc(var(--flex-gap)/16)",
                padding: "0 calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
            }
        },
        "& a": {
            textDecoration: "none",
        },
        "& .desktop-nav-call-to-actions": {
            display: "none",
        },
        "& .menu-button-box": {
            border: "2px solid var(--light-color)",
            borderRadius: "8px",
            padding: "calc(var(--basic-padding)/8)",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
        },
        [theme.breakpoints.up("tablet")]: {
            padding: "calc(var(--basic-padding)/3) calc(var(--basic-padding))",
            "& .nav-items": {
                "& .nav-links": {
                    gap: "calc(var(--flex-gap)/2)",
                    padding: "var(--basic-padding)",
                },
                "& .nav-search-field-box": {
                    padding: "var(--basic-padding)",
                },
                "& .mobile-nav-call-to-actions": {
                    padding: "0 var(--basic-padding) var(--basic-padding)",
                }
            },
        },
        [theme.breakpoints.up("desktop")]: {
            gap: "calc(var(--flex-gap)/2)",
            "& .favicon-box": {
                padding: "0",
            },
            "& .nav-items": {
                flex: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "calc(var(--flex-gap)/2)",
                justifyContent: "space-around",
                "& .nav-links": {
                    display: "flex",
                    flexDirection: "row",
                    position: "static",
                    padding: 0,
                    height: "auto",
                    background: "revert",
                    gap: "calc(var(--flex-gap)/3)",
                },
                "& .nav-search-field-box": {
                    padding: 0,
                },
                "& .mobile-nav-call-to-actions": {
                    padding: 0,
                    display: "none",
                },
            },
            "& .desktop-nav-call-to-actions": {
                display: "flex",
                flexDirection: "row",
                gap: "calc(var(--flex-gap)/16)",
            },
            "& .menu-button-box": {
                display: "none",
            },
        }
    }
})