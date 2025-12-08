import React from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "@/components/ui/button";
import {useWebView} from "@/contexts/webviews";

export function NewsScreen() {
    const {openWebView} = useWebView()
    
    return (
        <View style={styles.container}>
            {/* Button to open bottom sheet */}
            <Button onPress={() => openWebView('https://google.com')} style={styles.openButton}>
                Open WebView
            </Button>
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
});
