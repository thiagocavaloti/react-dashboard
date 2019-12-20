import React from 'react';
import Bar from '../components/bar';
import Messages from '../components/messages';


class MessagesPage extends React.Component {
  render() {
    return (
      <div>
        <Bar />
        <Messages />
      </div>
    );
  }
}

export default MessagesPage;
