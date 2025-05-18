import { FlatList } from "react-native";
import { StyleSheet, View, Text, TouchableOpacity, Item } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const FiltroEpsCard = () => {
    const {eps, redEps }= useContext(AuthContext); 

    return(
        
        <View>
            <FlatList
        data={eps}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAFAFA",
  },
});

export default FiltroEpsCard;