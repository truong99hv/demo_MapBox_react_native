// import React, {useState} from 'react';
// import {StyleSheet, View, Text} from 'react-native';
// import Mapbox from '@rnmapbox/maps';
// import {CheckBox} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import CheckBox1 from './component/CheckBox';

// Mapbox.setAccessToken(
//   'pk.eyJ1IjoidHJ1b25naHYxMjAyIiwiYSI6ImNsa3FpdTA5cjBscTIzc212azhiZjI0YzUifQ.idQrNB2HLK2VcV0OMz2X-w',
// );
// {
//   /* tileUrlTemplates={[
//               'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
//             ]}> */
// }
// const tileUrl = {
//   mapServiceLayer:
//     'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
// };
// const App = () => {
//   const [checked, setChecked] = useState(false);
//   const toggleChecked = () => {
//     setChecked(!checked);
//   };
//   const geojsonData = {
//     type: 'FeatureCollection',
//     features: [
//       {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'Polygon',
//           coordinates: [
//             [
//               [50.51624857690422, 26.38487714510974],
//               [50.39148926876888, 26.236829559010076],
//               [50.311880948340246, 25.980763883869045],
//               [50.57803413902781, 25.724139303882822],
//               [50.81685910031359, 25.94978468974209],
//               [50.827552755295386, 26.20698415555796],
//               [50.772896249826715, 26.38594149536594],
//               [50.51624857690422, 26.38487714510974],
//             ],
//           ],
//         },
//         id: 0,
//       },
//     ],
//   };
//   return (
//     <View style={styles.page}>
//       <View style={styles.container}>
//         <CheckBox
//           title="Tile Map Service Layer"
//           checked={checked}
//           onPress={toggleChecked}
//           containerStyle={{
//             backgroundColor: 'grey',
//             borderRadius: 5,
//           }}
//         />
//         <Mapbox.MapView style={styles.map}>
//           {checked && (
//             <Mapbox.RasterSource
//               id={'mapServiceLayer'}
//               tileSize={256}
//               tileUrlTemplates={[tileUrl.mapServiceLayer]}>
//               <Mapbox.RasterLayer
//                 id={'mapServiceLayer'}
//                 sourceID={'mapServiceLayer'}
//                 style={{
//                   visibility: 'visible',
//                   rasterOpacity: 1,
//                 }}
//               />
//             </Mapbox.RasterSource>
//           )}

//           <Mapbox.Camera
//             zoomLevel={2}
//             centerCoordinate={[50.54773273743763, 26.040291823976162]}
//           />
//         </Mapbox.MapView>
//       </View>
//     </View>
//   );
// };
// export default App;

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     height: '100%',
//     width: '100%',
//   },
//   map: {
//     flex: 1,
//   },

//   menu: {
//     position: 'absolute',
//     top: '40%',
//     left: '40%',
//     color: 'red',
//     zIndex: 100,
//   },
// });
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWhvYW5nMTgwMTAxIiwiYSI6ImNsa3FqdGx1aDExMjgzbG9jcjJyMGt0djUifQ.AUh9k4V3AAJgHMq-xd4_Wg',
);

const App = () => {
  const geojsonData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [50.51624857690422, 26.38487714510974],
              [50.39148926876888, 26.236829559010076],
              [50.311880948340246, 25.980763883869045],
              [50.57803413902781, 25.724139303882822],
              [50.81685910031359, 25.94978468974209],
              [50.827552755295386, 26.20698415555796],
              [50.772896249826715, 26.38594149536594],
              [50.51624857690422, 26.38487714510974],
            ],
          ],
        },
        id: 0,
      },
    ],
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} scaleBarEnabled={false}>
          {/* Add Raster Tile Layer */}
          {/* <MapboxGL.RasterSource
            id="Test"
            tileSize={256}
            tileUrlTemplates={[layer1]}>
            <MapboxGL.RasterLayer id="Test-layer-id" sourceID="Test" />
          </MapboxGL.RasterSource> */}
          <MapboxGL.ShapeSource id="polygonSource" shape={geojsonData}>
            <MapboxGL.LineLayer id="polygonFill" style={styles.test} />
          </MapboxGL.ShapeSource>
          <MapboxGL.Camera
            zoomLevel={10}
            centerCoordinate={[50.54773273743763, 26.040291823976162]}
            // centerCoordinate={[76.92777084210525, 28.363002789473686]}
          />
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  test: {
    lineColor: 'red',
    lineWidth: 3,
  },
});
