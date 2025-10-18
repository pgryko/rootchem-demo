import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDemoStore } from '../../store/demoStore';
import { Message } from './Message';
import { QuickActions } from './QuickActions';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from '../shared/TypingIndicator';

export const ChatPanel: React.FC = () => {
  const { messages, isTyping, simulationPhase } = useDemoStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full bg-rootchem-dark-800 rounded-l-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-rootchem-dark-700">
        <h3 className="text-xl font-semibold text-white mb-2">Natural Language Interface</h3>
        <div className="flex items-center space-x-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <span className="text-sm text-gray-400">
            {simulationPhase === 'processing' ? 'Processing...' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Quick Actions - Hide during simulation */}
      {simulationPhase === 'idle' && <QuickActions />}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2">
        {messages
          .slice(simulationPhase === 'processing' ? -3 : 0)
          .map((message) => (
            <Message key={message.id} message={message} />
          ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
};
