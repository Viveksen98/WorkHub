import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import data from "../../components/Data.json";
import { useNavigation } from "expo-router";
import { router } from "expo-router";

const Home = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProfessionals, setFilteredProfessionals] = useState(data.professionals);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterProfessionals(query, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProfessionals(searchQuery, category);
  };

  const filterProfessionals = (query, category) => {
    const filtered = data.professionals.filter((professional) => {
      const matchesQuery =
        professional.name.toLowerCase().includes(query.toLowerCase()) ||
        professional.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category ? professional.category === category : true;
      return matchesQuery && matchesCategory;
    });
    setFilteredProfessionals(filtered);
  };

  const categories = Array.from(new Set(data.professionals.map((p) => p.category)));

  return (
    <View style={styles.container}>
      <Header title="Home" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name or category"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Ionicons
          name="search"
          size={24}
          color="#007BFF"
          style={styles.searchIcon}
        />
      </View>
      <ScrollView
        horizontal
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        <TouchableOpacity
          style={[styles.categoryButton, !selectedCategory && styles.selectedCategory]}
          onPress={() => handleCategoryChange("")}
        >
          <Text style={styles.categoryButtonText}>All</Text>
        </TouchableOpacity>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => handleCategoryChange(category)}
          >
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {filteredProfessionals.map((item, index) => (
          <TouchableOpacity
            style={styles.box}
            key={index}
            onPress={() => navigation.navigate("(src)/Details", { item })}
          >
            <Image
              source={{
                uri: item.avatarUrl || "https://via.placeholder.com/150",
              }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.experience}>
                Experience: {item.experience}
              </Text>
              <Text style={styles.rating}>Rating: {item.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingRight: 40,
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 5,
    maxHeight: 40,
  },
  categoryContent: {
    alignItems: "center",
  },
  categoryButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: "#007BFF",
  },
  categoryButtonText: {
    color: "#333",
    fontSize: 12,
  },
  scrollView: {
    paddingVertical: 10,
    alignItems: "center",
  },
  box: {
    height: 120,
    flexDirection: "row",
    marginVertical: 5,
    width: "95%",
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: 120,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  category: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  experience: {
    fontSize: 13,
    color: "#777",
    marginTop: 5,
  },
  rating: {
    fontSize: 13,
    color: "green",
    marginTop: 5,
  },
});
