import React from 'react';
import {
  Box,
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  Slide,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useWindowSize from '../hooks/useWindowSize';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function Dialog({
  title, open, onClose, maxWidth, children, actions,
}) {
  const { isDesktop } = useWindowSize();

  return (
    <MUIDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullScreen={!isDesktop}
      TransitionComponent={Transition}
      style={{
        backgroundColor: '#0D0D0D',
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span>{ title }</span>
          <span style={{ cursor: 'pointer' }}>
            <CloseIcon onClick={onClose} color="primary" />
          </span>
        </Box>
      </DialogTitle>
      <DialogContent>
        { children }
      </DialogContent>
      <Box display="flex" justifyContent="space-between" px={3} pb={2} pt={1}>
        { actions }
      </Box>
    </MUIDialog>
  );
}
