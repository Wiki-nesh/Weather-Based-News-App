import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import Back from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Context} from '../../Services/Context';

const Settings = () => {
  const navigation = useNavigation();
  const {state, setState, catergory, setCategory} = useContext(Context);

  const categories = [
    {key: '', label: 'All'},
    {key: 'business', label: 'Business'},
    {key: 'entertainment', label: 'Entertainment'},
    {key: 'general', label: 'General'},
    {key: 'health', label: 'Health'},
    {key: 'science', label: 'Science'},
    {key: 'sports', label: 'Sports'},
    {key: 'technology', label: 'Technology'},
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('home')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Back name="arrow-back" size={30} color="#000" />
          <Text style={{marginStart: 5, fontSize: 20, fontWeight: '600'}}>
            Back
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: '700'}}>Settings</Text>
      </View>

      <Text
        style={{
          marginTop: 20,
          fontSize: 20,
          fontWeight: '600',
          marginStart: 10,
          marginBottom: 10,
        }}>
        Change Tempature
      </Text>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            marginStart: 10,
            height: 50,
            width: 150,
            backgroundColor: state == 'C' ? '#ff4500' : '#000',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderLeftColor: '#000',
            borderEndWidth: 2,
          }}
          onPress={() => {
            setState('C');
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: state == 'C' ? '#fff' : '#ff4500',
            }}>
            Celsius
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 50,
            width: 150,
            backgroundColor: state == 'F' ? '#ff4500' : '#000',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setState('F');
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: state == 'F' ? '#fff' : '#ff4500',
            }}>
            Fahrenheit
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 20, marginStart: 10}}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>News Categorys</Text>
        {categories.map((item, indx) => (
          <View key={indx} style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                backgroundColor: catergory == item.key ? '#ff4500' : '#fff',
                borderWidth: 2,
                borderColor: '#000',
                marginEnd: 10,
                marginTop: 10,
                borderRadius: 20,
              }}
              onPress={() => {
                setCategory(item.key);
              }}
            />
            <Text style={{marginTop: 5, fontSize: 17, fontWeight: '400'}}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Settings;
