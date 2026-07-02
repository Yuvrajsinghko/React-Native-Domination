import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

interface Pokemon {
  name: string;
  url: string;
}

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
      setPokemons(data.results);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView>
      {pokemons.map((pokemon) => (
        <View key={pokemon.name}>
          <Text>{pokemon.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
