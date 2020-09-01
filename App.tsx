/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import axios from 'axios';

import MapView, {Marker} from 'react-native-maps';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const App: React.FC = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchApi(): Promise<void> {
      try {
        const response = await axios.get(
          'https://api.github.com/users/Manfrin92/repos',
        );

        setCoordinates({
          latitude: Number(`-25.${response.data[0].id}`),
          longitude: Number(`-49.${response.data[0].id}`),
        });

        console.log({
          latitude: Number(`-25.${response.data[0].id}`),
          longitude: Number(`-49.${response.data[0].id}`),
        });
      } catch (err) {
        console.log(err);
      }
    }

    if (loading) {
      fetchApi();
    }
  }, []);

  useEffect(() => {
    if (coordinates) {
      setLoading(false);
    }
  }, [coordinates]);

  return (
    <>
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'red',
          }}>
          <Text style={{fontSize: 32}}>LOADING</Text>
        </View>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <View style={{paddingTop: 20, paddingBottom: 32}}>
            <MapView
              initialRegion={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                // latitude: 37.78825,
                // longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={{
                width: '100%',
                height: 270,
                alignSelf: 'center',
              }}
            />
            <Marker
              coordinate={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                // latitude: -25.4848,
                // longitude: -49.2948,
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default App;
