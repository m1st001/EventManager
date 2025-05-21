import React from 'react';
import {Box, Button, Popover} from "@mui/material";
import {AppDispatch} from "../../store/store.ts";
import {useDispatch} from "react-redux";
import {logout} from "../../store/thunks/authThunk.ts";

export interface IPopoverProps {
    anchorEl: HTMLButtonElement;
    handleClose: () => void;
}

const PopoverMenu = (props: IPopoverProps) => {
    const dispatch: AppDispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const open = Boolean(props.anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Popover id={id} open={open} anchorEl={props.anchorEl} onClose={props.handleClose} anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
        }}>
            <Box display="flex" flexDirection="column" justifyContent="space-between">
                <Button>Profile</Button>
                <Button onClick={handleLogout}>Logout</Button>
            </Box>
        </Popover>
    );
};

export default PopoverMenu;