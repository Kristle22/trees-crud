import { useContext } from 'react';
import TreeContext from './TreeContext';

function Message() {
  const { message } = useContext(TreeContext);

  if (null === message) return null;

  return (
    <div className='show-message'>
      <div className={'alert alert-' + message.type} role='alert'>
        {message.text}
      </div>
    </div>
  );
}

export default Message;
