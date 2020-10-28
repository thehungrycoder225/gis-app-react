import React from 'react';
import { Alert } from '@material-ui/lab';
const Message = ({ variant, children, severity }) => {
  return (
    <Alert variant={variant} severity={severity}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};
export default Message;
