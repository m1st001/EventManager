import React, {useEffect, useState} from "react";
import {StyledLoginGroup} from "../styles.ts";
import {Avatar, Box, Button} from "@mui/material";
import {RootState} from "../../store/store.ts";
import ButtonGroup from "./ButtonGroup.tsx";
import {useSelector} from "react-redux";
import PopoverMenu from "./PopoverMenu.tsx";

const LoginGroup = () => {
    const session = useSelector((state: RootState) => state.auth);
    const [showContent, setShowContent] = useState<React.ReactNode | null>(null);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const openDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (!session.isLoading) {
            if (session.user) {
                const username = session.user.userName;
                setShowContent(
                    <Box display="flex" gap={2} justifyContent="space-between">
                        <Button onClick={openDropdown}>{username}</Button>
                        <PopoverMenu handleClose={handleClose} anchorEl={anchorEl!}/>
                        <Avatar>{username!.charAt(0)}</Avatar>
                    </Box>
                );
            } else {
                setShowContent(<ButtonGroup/>);
            }
        }
    }, [session, anchorEl]);

    return <StyledLoginGroup>{showContent}</StyledLoginGroup>;
};

export default LoginGroup;
