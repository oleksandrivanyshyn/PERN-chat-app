import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages.ts';
import useListenMessages from '../../hooks/useListenMessages.ts';
import useChatScroll from '../../hooks/useChatScroll.ts';

const Messages = () => {
  const { messages } = useGetMessages();
  useListenMessages();
  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;
  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
export default Messages;
