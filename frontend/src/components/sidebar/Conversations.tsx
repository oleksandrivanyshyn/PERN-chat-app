import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations.ts';
import { getRandomEmoji } from '../../utils/emojis.ts';
import { useMemo } from 'react';

const Conversations = () => {
  const { conversations, loading } = useGetConversations();
  const assignedEmojis = useMemo(() => {
    return conversations.map(() => getRandomEmoji());
  }, [conversations]);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => (
        <Conversation
          key={conversation.id}
          conversation={conversation}
          emoji={assignedEmojis[index]}
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};
export default Conversations;
