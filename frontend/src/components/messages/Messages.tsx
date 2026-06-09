import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages.ts';

const Messages = () => {
  const { messages } = useGetMessages();
  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
export default Messages;
