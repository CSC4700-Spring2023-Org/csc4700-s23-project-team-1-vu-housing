import React from 'react';
import type {PropsWithChildren} from 'react';
import { useEffect, useState } from 'react';
import {
    Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


// export default function AddListing({navigation}) {
//     let [isLoading, setIsLoading] = useState(true);
//     let [error, setError] = useState();
//     let [response, setResponse] = useState();

//     useEffect(() => {
//       fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
//         .then(res => res.json())
//         .then(
//           (result) => {
//             setIsLoading(false);
//             setResponse(result);
//           },
//           (error) => {
//             setIsLoading(false);
//             setError(error);
//           }
//         )
//     }, []);

//     const getContent = () => {
//       if (isLoading) {
//         return <ActivityIndicator size="large" />;
//       }

//       if (error) {
//         return <Text>{error}</Text>
//       }
      
//       console.log(response);
//       return <Text>Bitcoin (USD): {response["bpi"]["USD"].rate}</Text>;
//     };

//     return (
//       <View style={styles.container}>
//         {getContent()}
//         <StatusBar style="auto" />
//       </View>
//     );
    
//   }

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
  // });

  export default function AddListing({navigation}) {

    return (
      <View>
          <Text>Add Listing</Text>
      </View>
    );
  }