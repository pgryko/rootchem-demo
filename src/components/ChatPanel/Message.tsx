import React from 'react';
import { motion } from 'framer-motion';
import { Message as MessageType } from '../../types';

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isSystem && (
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              isUser
                ? 'bg-rootchem-purple-600 text-white ml-2'
                : 'bg-gradient-to-br from-rootchem-purple-500 to-rootchem-purple-700 text-white mr-2'
            }`}
          >
            {isUser ? 'U' : 'AI'}
          </div>
        )}

        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-blue-900/30 text-white border-l-4 border-blue-500'
              : isSystem
              ? 'bg-rootchem-dark-700/50 text-gray-300 text-sm italic border border-rootchem-dark-600'
              : 'bg-purple-900/20 text-white border-l-4 border-purple-500'
          }`}
        >
          <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
          {!isSystem && (
            <span className="text-xs opacity-60 mt-1 block">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
