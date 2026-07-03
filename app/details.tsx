import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";

export default function Details() {
  const {name} = useLocalSearchParams<{name:string}>();
  
  useEffect(() => {
    fetchPokemonByName(name);
  }, []);

  const fetchPokemonByName = async (name: string) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
      const data = await res.json();
      console.log(data.base_experience);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}

    >

    </ScrollView>
  );
}

const styles = StyleSheet.create({});
