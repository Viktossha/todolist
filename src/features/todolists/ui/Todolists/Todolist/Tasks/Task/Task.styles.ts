import {SxProps} from "@mui/material";

export const getListItemSX = (isDone: boolean): SxProps => ({
    padding: 0,
    justifyContent: 'space-between',
    opacity: isDone ? 0.3 : 1
})