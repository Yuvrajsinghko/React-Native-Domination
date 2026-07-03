import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorsByType: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    //fetch pokemon
    fetchPokemons();
  }, []);
  const fetchPokemons = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
      const data = await res.json();
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const response = await fetch(pokemon.url);
          const details = await response.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        }),
      );

      setPokemons(detailedPokemons);
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
      {pokemons.map((pokemon) => (
        <Link
          key={pokemon.name}
          href={{pathname:"/details",params:{name:pokemon.name}}}
          style={{
            //@ts-ignore
            backgroundColor: colorsByType[pokemon.types[0].type.name] + 60,
            padding: 20,
            borderRadius: 20,
          }}
        >
          <View>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>

            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 150, height: 150 }}
              ></Image>
              <Image
                source={{ uri: pokemon.imageBack }}
                style={{ width: 150, height: 150 }}
              ></Image>
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: 28,
    color: "black",
    textAlign: "center",
  },
  type: {
    fontWeight: "bold",
    fontSize: 20,
    color: "grey",
    textAlign: "center",
  },
});
