import {View, Text} from 'react-native';
import {memo} from 'react';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CheckBox1 = () => {
  console.log('render');
  return (
    <View>
      <CheckBox title="aaaaa" checked />
      <Icon name="done" color="red" size={30} />
      <Text>Test</Text>
    </View>
  );
};

export default memo(CheckBox1);
