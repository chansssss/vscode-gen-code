import React, { useEffect, useState, useCallback } from 'react';
import { MemoryRouter as Router, Link, Switch } from 'react-router-dom';
import { routes } from '../routes/config';
import { RouteWithSubRoutes } from '../routes/RouteWithSubRoutes';
import { MessagesContext } from '../context/MessageContext';
import { CommonMessage, Message, ReloadMessage } from '../../src/view/messages/messageTypes';

export const App = () => {
  const [messagesFromExtension, setMessagesFromExtension] = useState<string[]>([]);

  const handleMessagesFromExtension = useCallback(
    (event: MessageEvent<Message>) => {
      if (event.data.type === 'COMMON') {
        const message = event.data as CommonMessage;
        setMessagesFromExtension([...messagesFromExtension, message.payload]);
      }
    },
    [messagesFromExtension]
  );

  useEffect(() => {
    window.addEventListener('message', (event: MessageEvent<Message>) => {
      handleMessagesFromExtension(event);
    });

    return () => {
      window.removeEventListener('message', handleMessagesFromExtension);
    };
  }, [handleMessagesFromExtension]);


  const handleReloadWebview = () => {
    vscode.postMessage<ReloadMessage>({
      type: 'RELOAD',
    });
  };

  return (
    <div className="home">
      <Router
        initialEntries={['/', '/gencode', '/message', '/message/received', '/message/send']}
      >
        <button className="reload" onClick={handleReloadWebview}>Reload Webview</button>
        <MessagesContext.Provider value={messagesFromExtension}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </MessagesContext.Provider>
      </Router>
    </div>
  );
};
