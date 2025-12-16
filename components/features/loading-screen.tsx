import React from 'react';
import {View} from "../ui/view";
import {Spinner} from "@/components/ui/spinner";

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner variant="bars" size='default' color="#ef4444" label='Loading...' />
    </View>
  );
};

export default LoadingScreen;