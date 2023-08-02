import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {ListItem} from 'react-native-elements';

Mapbox.setAccessToken(
  'pk.eyJ1IjoidHJ1b25naHYxMjAyIiwiYSI6ImNsa3FpdTA5cjBscTIzc212azhiZjI0YzUifQ.idQrNB2HLK2VcV0OMz2X-w',
);

const tileUrl = {
  mapFeaturesLayer:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  mapServiceLayer:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  WMS: 'http://45.249.108.79/geoserver/slrb/wms?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&tiled=true&STYLES=&LAYERS=slrb:detection_features&WIDTH=512&HEIGHT=512&srs=EPSG:3857&bbox={bbox-epsg-3857}',
  // https://45.249.108.79/geoserver/slrb/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&tiled=true&STYLES&LAYERS=detection_features&exceptions=application%2Fvnd.ogc.se_inimage&tilesOrigin=50.42241163251137%2C25.800322768664113&WIDTH=256&HEIGHT=256&SRS=EPSG%3A4326&BBOX=50.49773273743763%2C25.990291823976162%2C50.59773273743763%2C26.090291823976162
  // https://182.79.97.55/geoserver/wms?service=WMS&request=GetMap&layers=tcp:detection_features&styles=&format=image/png&transparent=true&version=1.1.0&url=/geoserver/wms&tiled=true&info_format=application/json&attributes=&wmsInfoUrl=/api/detections/10/feature/by-latlng&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}
  // https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015
  // https://45.249.108.79/geoserver/slrb/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&tiled=true&STYLES&LAYERS=slrb%3Adetection_features&exceptions=application%2Fvnd.ogc.se_inimage&tilesOrigin=50.42241163251137%2C25.800322768664113&WIDTH=256&HEIGHT=256&SRS=EPSG%3A4326&BBOX=50.49773273743763%2C25.990291823976162%2C50.59773273743763%2C26.090291823976162
};
const App = () => {
  const [layers, setLayers] = useState({
    mapServiceLayer: false,
    geojson: false,
  });
  const [expanded, setExpanded] = useState(false);

  const toggleLayer = layerName => {
    setLayers(prevLayers => ({
      ...prevLayers,
      [layerName]: !prevLayers[layerName],
    }));
  };
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
      <View style={styles.menuLayer}>
        <ListItem.Accordion
          content={
            <ListItem.Content style={styles.addLayer}>
              <ListItem.Title>Add Layer</ListItem.Title>
            </ListItem.Content>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}>
          <ListItem.CheckBox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            title="Tile Map Service Layer"
            onPress={() => toggleLayer('mapServiceLayer')}
            containerStyle={{
              backgroundColor: 'grey',
            }}
          />
          <ListItem.CheckBox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            title="Geojson"
            onPress={() => toggleLayer('geojson')}
            containerStyle={{
              backgroundColor: 'grey',
            }}
          />
        </ListItem.Accordion>
      </View>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map}>
          {/* <Mapbox.RasterSource
            id={'mapFeaturesLayer'}
            tileSize={256}
            tileUrlTemplates={[tileUrl.mapFeaturesLayer]}>
            <Mapbox.RasterLayer
              id={'mapFeaturesLayer'}
              sourceID={'mapFeaturesLayer'}
              style={{
                visibility: 'visible',
                rasterOpacity: 1,
              }}
            />
          </Mapbox.RasterSource> */}
          {layers.mapServiceLayer && (
            <Mapbox.RasterSource
              id={'mapServiceLayer'}
              tileSize={256}
              tileUrlTemplates={[tileUrl.mapServiceLayer]}>
              <Mapbox.RasterLayer
                id={'mapServiceLayer'}
                sourceID={'mapServiceLayer'}
                style={{
                  visibility: 'visible',
                  rasterOpacity: 1,
                }}
              />
            </Mapbox.RasterSource>
          )}

          <Mapbox.RasterSource
            id={'WMSLayer'}
            tileSize={256}
            tileUrlTemplates={[tileUrl.WMS]}>
            <Mapbox.RasterLayer
              id={'WMSLayer'}
              sourceID={'WMSLayer'}
              style={{
                visibility: 'visible',
                rasterOpacity: 1,
              }}
            />
          </Mapbox.RasterSource>

          {layers.geojson && (
            <Mapbox.ShapeSource id="polygonSource" shape={geojsonData}>
              <Mapbox.LineLayer id="polygonFill" style={styles.polygonFill} />
            </Mapbox.ShapeSource>
          )}

          <Mapbox.Camera
            zoomLevel={9}
            centerCoordinate={[50.54773273743763, 26.040291823976162]}
            // centerCoordinate={[-74.5447, 40.6892]}
          />
        </Mapbox.MapView>
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
    position: 'relative',
  },
  container: {
    height: '100%',
    width: '100%',
  },

  menuLayer: {
    width: '50%',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    opacity: 0.8,
  },

  map: {
    flex: 1,
  },

  polygonFill: {
    lineColor: 'red',
    lineWidth: 3,
  },
});
