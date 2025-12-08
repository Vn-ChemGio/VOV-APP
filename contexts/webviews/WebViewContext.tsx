import React, {createContext, useCallback, useContext, useRef, useState} from "react";
import {Animated, Dimensions, Easing, StyleSheet, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {WebView} from "react-native-webview";
import {BottomSheet} from "@/components/ui/bottom-sheet";
import {HEIGHT} from "@/theme/globals";
import {useColor} from "@/hooks/useColor";

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

interface WebViewContextValue {
    url: string | null;
    openWebView: (url: string) => void;
    closeWebView: () => void;
}

const WebViewContext = createContext<WebViewContextValue | undefined>(undefined);

export const WebViewProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const webViewRef = useRef<WebView>(null);
    const [url, setUrl] = useState<string>('');
    
    const openWebView = useCallback((webviewUrl: string) => {
        setUrl(webviewUrl);
    }, []);
    
    const closeWebView = useCallback(() => {
        setUrl('');
    }, []);
    
    // Loading progress animation
    const progress = useRef(new Animated.Value(0)).current;
    const [loading, setLoading] = useState(false);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    
    
    // Handle loading start
    const handleLoadStart = () => {
        setLoading(true);
        progress.setValue(0);
        
        Animated.timing(progress, {
            toValue: 0.7,
            duration: 700,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    };
    
    // Handle loading end
    const handleLoadEnd = () => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {
            setLoading(false);
            progress.setValue(0);
        });
    };
    
    // Progress bar width animation
    const progressBarWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });
    
    // Navigation handlers
    const handleGoBack = () => {
        webViewRef.current?.goBack();
    };
    
    const handleGoForward = () => {
        webViewRef.current?.goForward();
    };
    
    const handleReload = () => {
        webViewRef.current?.reload();
    };
    
    // Get theme colors
    const cardColor = useColor("card");
    const borderColor = useColor("border");
    const mutedColor = useColor("muted");
    
    
    return (
        <WebViewContext.Provider value={{url, openWebView, closeWebView}}>
            {children}
            
            <BottomSheet
                isVisible={!!url && /^https?:\/\//.test(url)}
                onClose={closeWebView}
                snapPoints={[0.9]}
                style={{borderTopLeftRadius: 32, borderTopRightRadius: 32}}
            >
                <View style={styles.webViewContainer}>
                    {/* Browser Header Controls - Facebook-like */}
                    <View style={[styles.browserHeader, {backgroundColor: cardColor, borderBottomColor: borderColor}]}>
                        <TouchableOpacity
                            onPress={closeWebView}
                            style={styles.headerButton}
                        >
                            <Ionicons name="close" size={24} color={mutedColor}/>
                        </TouchableOpacity>
                        
                        <View style={styles.navigationControls}>
                            <TouchableOpacity
                                onPress={handleGoBack}
                                disabled={!canGoBack}
                                style={[styles.navButton, !canGoBack && styles.navButtonDisabled]}
                            >
                                <Ionicons
                                    name="chevron-back"
                                    size={22}
                                    color={canGoBack ? mutedColor : borderColor}
                                />
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                onPress={handleGoForward}
                                disabled={!canGoForward}
                                style={[styles.navButton, !canGoForward && styles.navButtonDisabled]}
                            >
                                <Ionicons
                                    name="chevron-forward"
                                    size={22}
                                    color={canGoForward ? mutedColor : borderColor}
                                />
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                onPress={handleReload}
                                style={styles.navButton}
                            >
                                <Ionicons name="reload" size={20} color={mutedColor}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    {/* Loading Progress Bar */}
                    {loading && (
                        <Animated.View
                            style={[
                                styles.progressBar,
                                {width: progressBarWidth},
                            ]}
                        />
                    )}
                    
                    {/* WebView */}
                    {url && <WebView
                        ref={webViewRef}
                        source={{uri: url}}
                        onLoadStart={handleLoadStart}
                        onLoadEnd={handleLoadEnd}
                        onNavigationStateChange={(navState) => {
                            setCanGoBack(navState.canGoBack);
                            setCanGoForward(navState.canGoForward);
                        }}
                        style={styles.webView}
                        startInLoadingState={true}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />}
                </View>
            </BottomSheet>
        </WebViewContext.Provider>
    );
};

export const useWebView = (): WebViewContextValue => {
    const context = useContext(WebViewContext);
    if (!context) {
        throw new Error("useWebView must be used within a WebViewProvider.");
    }
    return context;
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    openButton: {
        minWidth: 200,
    },
    webViewContainer: {
        // Counteract BottomSheet's ScrollView padding to make WebView full width/height
        marginHorizontal: -16,
        marginTop: -16,
        marginBottom: -16,
        // Use calculated height: 90% of screen minus handle (~30px) and header (56px)
        height: SCREEN_HEIGHT * 0.9 - 30 - 56,
        overflow: "hidden",
    },
    browserHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        zIndex: 10,
        height: 56, // Fixed header height
    },
    headerButton: {
        padding: 8,
    },
    navigationControls: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 16,
        gap: 12,
    },
    navButton: {
        padding: 8,
    },
    navButtonDisabled: {
        opacity: 0.3,
    },
    progressBar: {
        height: 4,
        backgroundColor: "#1877F2",
        zIndex: 20,
    },
    webView: {
        flex: 1,
        backgroundColor: "#fff",
    },
});