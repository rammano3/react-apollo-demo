import React from 'react';
import { Button, Flex, Text } from 'theme-ui';

export const SearchPagination = ({
  total,
  previousPage,
  loading,
  handlePrev,
  handleNext,
}) => (
  <Flex
    sx={{
      flexBasis: '50%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    }}
  >
    <Text mr={3}>Total : {total.toLocaleString()}</Text>
    <Button onClick={handlePrev} disabled={loading || previousPage < 1} mr={2}>
      Previous
    </Button>
    <Button onClick={handleNext} disabled={loading}>
      Next
    </Button>
  </Flex>
);

export default SearchPagination;
