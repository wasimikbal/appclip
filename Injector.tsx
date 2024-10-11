import React, { useRef, useEffect } from 'react';
import WebView from 'react-native-webview';

interface InjectorProps {
  htmlContent: string; // HTML content to load
  onMessage?: (event: any) => void; // Optional: custom message handler
  injectedJavaScript?: string; // Optional: script to inject into the WebView
}

export const Injector: React.FC<InjectorProps> = ({
  htmlContent,
  onMessage,
  injectedJavaScript,
}) => {
  const webViewRef = useRef<WebView>(null);

  // Function to send message to WebView
  const sendMessage = (message: string) => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(message); // Post message to WebView
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ html: htmlContent }}
      injectedJavaScript={injectedJavaScript} // Optional JS to inject on load
      onMessage={onMessage} // Optional onMessage handler
      style={{ flex: 1 }}
    />
  );
};
