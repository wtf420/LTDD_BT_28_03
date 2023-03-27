import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const OpenSeaAPI = () => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch('https://testnets-api.opensea.io/api/v1/assets')
    .then(response => response.json())
    .then(data => {
      let array = [];

      for (let i = 0; i < data.assets.length; i++) {
        if ((data.assets[i].image_url != null) && (data.assets[i].name != null))
        array.push(data.assets[i]);
      }
      setAssets(array);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.image_url }} style={styles.image}/>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Load Data" onPress={fetchData} />
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={assets}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  item: {
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 5,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden'
  },

  image: {
    width: 200,
    height: 200,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OpenSeaAPI;