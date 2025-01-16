import { ActivityIndicator, Text, View } from "react-native";
import {ThemeContextProvider } from '../src/theme/themeContext'

export default function Index() {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}
