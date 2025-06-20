import { Box, Stack, Typography } from "@mui/material";
import { physicalLocations } from "../../config/static";
import { MarqueeDot } from "../../asset";

export const Location = () => {
    return (
        <Stack
            direction={{ mobile: "row" }}
            gap={"calc(var(--flex-gap)/8)"}
            alignItems={{ mobile: "center" }}
            padding={"calc(var(--basic-padding)/8) 0"}
        >
            <Box>
                <Typography
                    variant="subtitle1"
                    fontFamily={"Inter"}
                    fontWeight={400}
                    fontSize={12}
                    lineHeight={"normal"}
                    color={"var(--off-dark-color)"}
                >
                    Visit our physical Stores
                </Typography>
            </Box>
            <Box>
                <MarqueeDot style={{ display: "flex" }} />
            </Box>
            <Stack
                direction={{ mobile: "row" }}
                gap={"calc(var(--flex-gap)/8)"}
                alignItems={{ mobile: "center" }}
            >
                {physicalLocations?.map((store, index) => (
                    <Box
                        key={index}
                    >
                        <Typography
                            variant="subtitle1"
                            fontFamily={"Inter"}
                            fontWeight={400}
                            fontSize={12}
                            lineHeight={"normal"}
                            color={"var(--off-primary-color)"}
                        >
                            {store}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Stack>
    )
}