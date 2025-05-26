import {
  Dimensions,
  Image,
  Keyboard,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Gear from 'react-native-vector-icons/Octicons';
import {
  GetCurrentData,
  GetForecast,
  GetNews,
  GetNewsBasedOnCategory,
} from '../../Services/api';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {Context} from '../../Services/Context';

const Home = () => {
  const {width, height} = Dimensions.get('window');
  const [data, setData] = useState();
  const [foreCast, setForeCast] = useState();
  const [news, setNews] = useState();
  const FiveDaysTemp = list => {
    const grouped = {};
    for (const item of list) {
      const date = moment(item.dt_txt).format('YYYY-MM-DD');
      (grouped[date] ||= []).push(item);
    }
    return Object.entries(grouped).map(([date, data]) => ({date, data}));
  };
  const navigation = useNavigation();
  const {state, catergory} = useContext(Context);
  const getCCurrentData = async () => {
    const response = await GetCurrentData();
    setData(response.data);
    const getForecastData = await GetForecast();
    const date = FiveDaysTemp(getForecastData?.data?.list);
    setForeCast(date);
    const waetherData = getNewsKeyword(data?.weather?.[0]?.main);

    if (catergory == '') {
      const newsRes = await GetNews(waetherData);
      setNews(newsRes.data.articles);
    } else {
      const newsRes = await GetNewsBasedOnCategory(catergory);
      setNews(newsRes.data.articles);
    }
  };

  const convertTemp = temp => {
    if (state == 'C') {
      return (temp - 273.15).toFixed(1) + '°C';
    } else {
      return (((temp - 273.15) * 9) / 5 + 32).toFixed(1) + '°F';
    }
  };

  const getNewsKeyword = weatherType => {
    switch (weatherType) {
      case 'Snow' || 'Mist' || 'Fog' || 'Rain':
        return 'depression OR sadness';
      case 'Clear' || 'Sunny':
        return 'happiness OR success OR celebration';
      case 'Thunderstorm' || 'Tornado' || 'Dust' || 'Squall':
        return 'fear OR panic';
      case 'Clouds' || 'Haze':
        return 'general';
      default:
        return 'general';
    }
  };

  useEffect(() => {
    getCCurrentData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {news?.length ? (
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          <TouchableOpacity
            style={{height: 50, width: 50}}
            onPress={() => {
              navigation.popTo('settings');
            }}>
            <Gear
              name="gear"
              size={40}
              color={'#ff4500'}
              style={{marginStart: 10, marginTop: 10}}
            />
          </TouchableOpacity>

          <View style={{marginTop: 10, alignSelf: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, fontWeight: '500', marginEnd: 10}}>
                {data?.weather?.[0]?.main ?? 'Unknown'}
              </Text>
              <Fontisto
                name="day-cloudy"
                size={30}
                color="#000"
                style={{transform: [{translateY: -8}]}}
              />
            </View>

            <Text
              style={{fontSize: 50, fontWeight: '800', textAlign: 'center'}}>
              {convertTemp(data?.main?.temp) ?? '28°'}
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 16, marginTop: 20}}>
            {foreCast?.map((day, index) => {
              const temps = day.data.map(item => item.main.temp);
              const avgTemp = (
                temps.reduce((a, b) => a + b, 0) / temps.length
              ).toFixed(1);
              const dateStr = moment(day.date).format('ddd, MMM D');
              return (
                <View
                  key={index}
                  style={{
                    marginHorizontal: 10,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#ff4500',
                    width: 200,
                    height: 150,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: '500', marginBottom: 5}}>
                    {dateStr}
                  </Text>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{fontSize: 18, fontWeight: '500', marginRight: 8}}>
                      Avg Temp
                    </Text>
                    <Fontisto
                      name="day-cloudy"
                      size={24}
                      color="#000"
                      style={{transform: [{translateY: -2}]}}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 40,
                      fontWeight: '800',
                      textAlign: 'center',
                    }}>
                    {convertTemp(avgTemp) ?? '20°'}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {news?.map((item, index) => (
            <View style={{marginTop: 20}} key={index}>
              <Text style={{fontSize: 18, fontWeight: '700', marginStart: 5}}>
                {item.title}
              </Text>
              {item.urlToImage && (
                <Image
                  source={{uri: item.urlToImage}}
                  style={{width: width, height: 300}}
                  alt="Loading..."
                  onError={() => console.log('Image failed to load')}
                />
              )}
              {item.author && (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    marginStart: 5,
                    marginTop: 5,
                  }}>
                  Author : {item.author}
                </Text>
              )}
              <Text style={{fontSize: 16, fontWeight: '600', marginStart: 5}}>
                Description : {item.description}
              </Text>
              <Text style={{fontSize: 16, fontWeight: '600', marginStart: 5}}>
                If you have more info can you Refer{' '}
                <Text
                  style={{color: '#ff4500'}}
                  onPress={() => {
                    Linking.openURL(item.url);
                  }}>
                  Link
                </Text>
              </Text>
              <View
                style={{
                  width: width,
                  height: 1,
                  backgroundColor: '#ff4500',
                  marginTop: 10,
                }}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '700'}}>
            Loading data...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
