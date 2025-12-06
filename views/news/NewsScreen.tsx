import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheet, useBottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { useColor } from "@/hooks/useColor";
import {HEIGHT} from "@/theme/globals";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export function NewsScreen() {
    const webViewRef = useRef<WebView>(null);
    const { isVisible, open, close } = useBottomSheet();
    
    // Loading progress animation
    const progress = useRef(new Animated.Value(0)).current;
    const [loading, setLoading] = useState(false);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    
    // URL to load in WebView (similar to Facebook's in-app browser)
    const webViewUrl = "https://vov.vn/xa-hoi/vov-va-don-vi-dong-hanh-gui-gam-nghia-tinh-toi-ba-con-vung-lu-gia-lai-post1251552.vov";
    
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
        <View style={styles.container}>
            {/* Button to open bottom sheet */}
            <Button onPress={open} style={styles.openButton}>
                Open WebView
            </Button>
            
            {/* Bottom Sheet with WebView */}
            <BottomSheet
                isVisible={isVisible}
                onClose={close}
                snapPoints={[0.9]}
                style={{borderTopLeftRadius: 32, borderTopRightRadius: 32}}
            >
                <View style={styles.webViewContainer}>
                    {/* Browser Header Controls - Facebook-like */}
                    <View style={[styles.browserHeader, { backgroundColor: cardColor, borderBottomColor: borderColor }]}>
                        <TouchableOpacity
                            onPress={close}
                            style={styles.headerButton}
                        >
                            <Ionicons name="close" size={24} color={mutedColor} />
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
                                <Ionicons name="reload" size={20} color={mutedColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    {/* Loading Progress Bar */}
                    {loading && (
                        <Animated.View
                            style={[
                                styles.progressBar,
                                { width: progressBarWidth },
                            ]}
                        />
                    )}
                    
                    {/* WebView */}
                    <WebView
                        ref={webViewRef}
                        source={{ uri: webViewUrl }}
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
                    />
                </View>
            </BottomSheet>
        </View>
    );
}

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
        height: HEIGHT,
        backgroundColor: "#1877F2",
        zIndex: 20,
    },
    webView: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
