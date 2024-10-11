import React, { useEffect, useRef } from 'react';
import { View, Button, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

// Assuming your index.html is bundled locally, using require
const IndexHTML = require('./index.html');

export const AppClip = () => {
    const webviewRef = useRef(null);

    useEffect(()=>{
        if(webviewRef){
            const message = JSON.stringify({ hello: 'world' });
            webviewRef.current.injectJavaScript(`window.postMessage(${message}, '*');`);
        }
    }, [webviewRef])

    const runFirst = `
      document.body.style.backgroundColor = 'red';
      if(window.atoms){
        setTimeout(function() { window.alert('[103.9899, 1.3586]') }, 2000);
        true; // note: this is required, or you'll sometimes get silent failures
      }else{
      setTimeout(function() { window.alert('[103.9899, 1.3586]') }, 2000);
        true; // note: this is required, or you'll sometimes get silent failures
      }
    `;
    return (

        <SafeAreaView style={{ flex: 1 }}>
            {/* SafeAreaView ensures content avoids notches, status bar, etc. */}
            <View style={{ flex: 1 }}>
                <View style={{ height: 400 }}>
                    <WebView
                        ref={webviewRef}
                        source={IndexHTML}
                        onMessage={(event) => {
                            const receivedData = JSON.parse(event.nativeEvent.data); // Data from WebView
                            webviewRef.current.injectJavaScript(`
                                ....
                            //   document.getElementsByClassName('title').innerText = ${'Success...'}
                            `);
                        }} // Placeholder for handling messages from WebView
                        injectedJavaScriptObject={{ coordinates: [1234, 5678] }} // Example hardcoded coordinates
                        //         injectedJavaScript={`
                        //   // JavaScript code injected into the web page
                        //   const injectedObjectJson = window.ReactNativeWebView.injectedObjectJson();
            
                        //   if (injectedObjectJson) {
                        //     const injectedObject = JSON.parse(injectedObjectJson);
                        //     console.log("injectedJavaScriptObject: ", injectedObject);
            
                        //     var injectedJavaScriptObjectEle = window.self.document.getElementByClassName('titleCoords');
                        //     injectedJavaScriptObjectEle.innerText = '......'//injectedObjectJson;
                        //     injectedJavaScriptObjectEle.id = "injectedJavaScriptObjectEle";
                        //     document.body.appendChild(injectedJavaScriptObjectEle);
                        //   }
                        // `}
                        injectedJavaScript={runFirst}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}



