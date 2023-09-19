import React, {memo, useMemo} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

const ModalTester = memo(props => {
  const {data, showModal, setShowModal} = props;

  const hideModal = () => {
    setShowModal(!showModal);
  };
  const headerTableList = [
    'Change Type',
    'Id',
    'Aoi Name',
    'Change Id',
    'Grid Id',
    'Change Between',
    'Cloud In Toi',
    'Area',
    'Building Permission',
    'Remarks',
  ];

  return (
    <View style={{flex: 1}}>
      <Modal isVisible={showModal}>
        {data === '' || data === null || data.length === 0 ? (
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              padding: 15,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>No Data !!!</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              backgroundColor: '#fff',
              padding: 10,
              paddingTop: 30,
            }}>
            <View style={styles.headerTable}>
              {headerTableList.map((item, id) => (
                <Text
                  key={id}
                  style={{borderWidth: 1, paddingLeft: 10, fontWeight: 'bold'}}>
                  {item}
                </Text>
              ))}
            </View>
            <View style={styles.itemTable}>
              {data.map((item, id) => (
                <Text
                  key={id}
                  style={{
                    borderWidth: 1,
                    paddingLeft: 10,
                    fontWeight: 'bold',
                    borderLeftWidth: 0,
                  }}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        )}
        <Button title="Hide Modal" onPress={hideModal} />
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  headerTable: {width: '40%'},
  itemTable: {
    width: '60%',
  },
});

export default ModalTester;
