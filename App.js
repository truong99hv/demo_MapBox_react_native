import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {ListItem} from 'react-native-elements';
import ModalTester from './src/component/ModalTester';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

Mapbox.setAccessToken(
  'pk.eyJ1IjoidHJ1b25naHYxMjAyIiwiYSI6ImNsa3FpdTA5cjBscTIzc212azhiZjI0YzUifQ.idQrNB2HLK2VcV0OMz2X-w',
);

const tileUrl = {
  mapFeaturesLayer:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  mapServiceLayer:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  WMS: 'http://45.249.108.79/geoserver/slrb/wms?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&tiled=true&STYLES=&LAYERS=slrb:detection_features&WIDTH=512&HEIGHT=512&srs=EPSG:3857&bbox={bbox-epsg-3857}',
};
const APIFeatureInfo = `http://45.249.108.79/api/detections/15/feature/by-latlng?lat=26.053484312712612&lng=50.49528620428978`;
const App = () => {
  const [layers, setLayers] = useState({
    mapServiceLayer: false,
    geojson: false,
    WMS: false,
  });
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listData, setlListData] = useState();
  let data = [];
  useEffect(() => {
    loadStoredLayers();
  }, []);
  const STORAGE_KEY = 'mapLayers';
  const loadStoredLayers = async () => {
    try {
      const storedLayers = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedLayers !== null) {
        setLayers(JSON.parse(storedLayers));
      }
    } catch (error) {
      console.error('Error loading layers from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    saveLayers();
  }, [layers]);

  const saveLayers = async () => {
    try {
      const jsonLayers = JSON.stringify(layers);
      await AsyncStorage.setItem(STORAGE_KEY, jsonLayers);
    } catch (error) {
      console.error('Error saving layers to AsyncStorage:', error);
    }
  };
  const getFeatureInfo = async (lat, lng) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://45.249.108.79/api/detections/15/feature/by-latlng?lat=${lat}&lng=${lng}`,
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error('Error fetching feature info:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Error fetching feature info: ${error}.`,
        visibilityTime: 2500,
        autoHide: true,
        topOffset: 30,
        position: 'top',
      });
      return null;
    }
  };

  const handleMapClick = async event => {
    const {geometry} = event;
    const lat = geometry.coordinates[1];
    const lng = geometry.coordinates[0];

    const featureInfo = await getFeatureInfo(lat, lng);
    if (featureInfo !== null) {
      setlListData(featureInfo.data);
      setShowModal(true);
    }
  };
  if (listData) {
    data = [
      listData.properties.change_type,
      listData.properties.id,
      listData.properties.aoi_name,
      listData.properties.change_id,
      listData.properties.grid_id,
      listData.properties.change_between,
      listData.properties.cloud_in_toi,
      listData.properties.area,
      listData.properties.building_permission,
      listData.properties.remarks,
    ];
  }
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
            <ListItem.Content>
              <ListItem.Title style={{fontWeight: 'bold'}}>
                Add Layer
              </ListItem.Title>
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
            checked={layers.mapServiceLayer}
            onPress={() => toggleLayer('mapServiceLayer')}
            checkedColor="#fff"
            containerStyle={{
              backgroundColor: 'grey',
            }}
            textStyle={{color: '#fff'}}
          />

          <ListItem.CheckBox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            title="Geojson"
            checked={layers.geojson}
            onPress={() => toggleLayer('geojson')}
            checkedColor="#fff"
            containerStyle={{
              backgroundColor: 'grey',
            }}
            textStyle={{color: '#fff'}}
          />
          <ListItem.CheckBox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            title="WMS"
            checked={layers.WMS}
            onPress={() => toggleLayer('WMS')}
            checkedColor="#fff"
            containerStyle={{
              backgroundColor: 'grey',
            }}
            textStyle={{color: '#fff'}}
          />
        </ListItem.Accordion>
      </View>
      <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
      <ModalTester
        showModal={showModal}
        setShowModal={setShowModal}
        data={data}
        loading={loading}
      />

      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          onPress={layers.WMS ? handleMapClick : ''}>
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
          {layers.WMS && (
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
          )}

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
      <Toast />
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
    opacity: 0.9,
  },

  map: {
    flex: 1,
  },

  polygonFill: {
    lineColor: 'red',
    lineWidth: 3,
  },

  spinnerTextStyle: {
    color: '#FFF',
  },
});
