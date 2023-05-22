import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=cc1b6989786247ae88c317e6814c79a5"
      );
      const data = await response.json();
      // const parseData = JSON.parse(data);
      console.log(data);
      setNewsData(data?.articles);
    } catch (err) {
      console.log(err);
    }
  };

  const renderNews = (items, index) => {
    console.log("renderItems----->", items);
    return (
      <>
        <View key={items?.index} style={{ width: 200, marginHorizontal: 20 }}>
          <TouchableOpacity>
            <Image
              source={{
                uri: null ? (
                  <Text>No data found</Text>
                ) : (
                  items?.item?.urlToImage
                ),
              }}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              style={{
                width: 200,
                height: 200,
                backgroundColor: "#b0c4de",
                resizeMode: "contain",
              }}
            />
            {loading ? (
              <ActivityIndicator color="green" size="large" />
            ) : (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    padding: 6,
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {items?.item?.title}
                </Text>

                <Text style={{ textAlign: "right", fontSize: 12 }}>
                  {items?.item?.author}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#fff" }}>
        <View style={{ paddingVertical: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 16, color: "#6495ed" }}>Latest News</Text>
        </View>
        <FlatList
          data={newsData}
          renderItem={renderNews}
          keyExtractor={(items) => items.articles?.publishedAt}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
