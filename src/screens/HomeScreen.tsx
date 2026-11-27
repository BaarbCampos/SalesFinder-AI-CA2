import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { products } from "../data/products";
import { ProductCategory } from "../types/Product";

interface HomeScreenProps {
  onOpenAssistant: () => void;
}

export default function HomeScreen({ onOpenAssistant }: HomeScreenProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      `${product.name} ${product.brand}`.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>SalesFinder AI ✦</Text>
      <Text style={styles.subtitle}>Your beauty shopping assistant</Text>

      <Text style={styles.heading}>Discover your beauty essentials</Text>
      <Text style={styles.description}>
        Find products that match your style, needs and budget.
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search beauty products..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.section}>Categories</Text>

      <View style={styles.categories}>
        {(["All", "Skincare", "Makeup", "Perfume"] as const).map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.category, category === item && styles.selected]}
            onPress={() => setCategory(item)}
          >
            <Text style={category === item ? styles.selectedText : styles.categoryText}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.aiCard} onPress={onOpenAssistant}>
        <Text style={styles.aiTitle}>Meet your AI Beauty Assistant ✨</Text>
        <Text style={styles.description}>Get personalised beauty recommendations.</Text>
        <Text style={styles.aiLink}>Discover more →</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Featured Products</Text>

      {filteredProducts.length === 0 ? (
        <Text style={styles.empty}>No products found.</Text>
      ) : (
        filteredProducts.map((product) => (
          <View key={product.id} style={styles.product}>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.description}>{product.category}</Text>
            <Text style={styles.price}>€{product.price.toFixed(2)}</Text>
            <Text style={styles.rating}>★ {product.rating}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF8F5", padding: 22 },
  logo: { fontSize: 25, fontWeight: "bold", color: "#65483F", marginTop: 35 },
  subtitle: { color: "#8D817A", marginTop: 4 },
  heading: { fontSize: 27, fontWeight: "bold", color: "#493B36", marginTop: 35 },
  description: { color: "#837873", marginTop: 7 },
  search: { backgroundColor: "white", borderRadius: 14, padding: 16, marginTop: 22, borderWidth: 1, borderColor: "#EEE5DE" },
  section: { fontSize: 20, fontWeight: "bold", color: "#493B36", marginTop: 28, marginBottom: 15 },
  categories: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  category: { backgroundColor: "#EDE2DC", padding: 13, borderRadius: 12 },
  selected: { backgroundColor: "#65483F" },
  categoryText: { color: "#65483F" },
  selectedText: { color: "white", fontWeight: "bold" },
  aiCard: { backgroundColor: "#E8D7D2", padding: 22, borderRadius: 18, marginTop: 28 },
  aiTitle: { fontSize: 19, fontWeight: "bold", color: "#65483F" },
  aiLink: { color: "#65483F", fontWeight: "bold", marginTop: 15 },
  product: { backgroundColor: "white", padding: 18, borderRadius: 15, marginBottom: 14, borderWidth: 1, borderColor: "#EEE5DE" },
  brand: { color: "#A17C70", fontWeight: "bold", fontSize: 12 },
  productName: { color: "#493B36", fontWeight: "bold", fontSize: 17, marginTop: 5 },
  price: { color: "#65483F", fontWeight: "bold", marginTop: 8 },
  rating: { color: "#B18155", marginTop: 5 },
  empty: { color: "#837873", padding: 15 }
});
