import React from "react";
import { Text, View } from "react-native";
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import * as firebase from "firebase";
import db from "../config.js";

export default class ReadStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allStories: [],
      lastVisibleStory: null,
      textSearched: null,
    };
  }

  fetchMoreStories = async () => {
    if (this.state.textSearched === null) {
      const query = await db
        .collection("stoies")
        .startAfter(this.state.lastVisibleStory)
        .limit(10)
        .get();

      query.docs.map((item) => {
        this.setState({
          allTransaction: [...this.state.allStories, item.data()],
          lastVisibleStory: item,
        });
      });
    } else if (this.state.textSearched !== null) {
      var text = this.state.textSearched.toUpperCase();
      const query = await db
        .collection("stoies")
        .where("StoryName", "==", text)
        .startAfter(this.state.lastVisibleStory)
        .limit(10)
        .get();

      query.docs.map((item) => {
        this.setState({
          allTransaction: [...this.state.allStories, item.data()],
          lastVisibleStory: item,
        });
      });
    }
  };

  searchTransaction = async (textSearched) => {
    var text = textSearched.toUpperCase();

    const query = await db
      .collection("stories")
      .where("StoryName", "===", text)
      .get();

    query.docs.map((item) => {
      this.setState({
        allTransaction: [...this.state.allTransaction, item.data()],
        lastVisibleTransaction: item,
      });
    });
  };

  componentDidMount = async () => {
    const query = await db.collection("stories").limit(10).get();
    query.docs.map((item) => {
      this.setState({
        allTransaction: [...this.state.allTransaction, item.data()],
      });
    });
  };

  render() {
    return (
      <View>
        <View>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            onChangeText={(text) => {
              this.setState({
                textSearched: text,
              });
            }}
            value={this.state.textSearched}
          ></TextInput>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.searchTransaction(this.state.textSearched);
            }}
          ></TouchableOpacity>
        </View>
        <FlatList
          data={this.state.allTransaction}
          renderItem={(item) => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Story Name: {item.StoryName}</Text>
                <Text>Author: {item.Author}</Text>
                <Text>Story: {item.Story}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            index.toString();
          }}
          onEndReached={this.fetchMorestories()}
          onEndReachedThreshold={0.7}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  searchBar: {
    flexDirection: "row",
    height: 40,
    width: "auto",
    borderWidth: 0.5,
    alignItems: "center",
    backgroundColor: "grey",
  },
  bar: {
    borderWidth: 2,
    height: 30,
    width: 300,
    paddingLeft: 10,
  },
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
});
