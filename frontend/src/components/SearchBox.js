import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Records...'
        className='mr-sm-2  ml-sm5'
      ></Form.Control>
      <Button type='submit' variant='light p-2' name='Search'></Button>
    </Form>
  );
};

export default SearchBox;
