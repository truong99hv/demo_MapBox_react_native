import {View, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CheckBox1 = () => {
  return (
    <View>
      <CheckBox title="aaaaa" checked />
      <Icon name="done" color="red" size={30} />
    </View>
  );
};

export default CheckBox1;
