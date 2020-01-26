import React from 'react';
import { Button, Flex, Input } from 'theme-ui';

export const SearchInput = ({ label, onChange, value, onSearch, loading }) => (
  <Flex sx={{ flexBasis: '50%', justifyContent: 'flex-start' }}>
    <Input
      aria-label={label}
      type="text"
      onChange={e => onChange(e.target.value)}
      value={value}
    />
    <Button onClick={onSearch} disabled={loading} ml={2}>
      Search
    </Button>
  </Flex>
);

export default SearchInput;
