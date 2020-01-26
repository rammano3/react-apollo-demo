import React from 'react';
import { Box, Spinner } from 'theme-ui';

export const LoadingSpinner = () => (
  <Box sx={{ mt: 6, textAlign: 'center' }}>
    <Spinner role="progressbar" aria-valuetext="Loading..." aria-busy="true" />
  </Box>
);

export default LoadingSpinner;
