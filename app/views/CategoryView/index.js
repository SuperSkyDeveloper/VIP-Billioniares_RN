import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { setUser as setUserAction } from '../../actions/login';
import MainScreen from '../../containers/MainScreen';
import * as HeaderButton from '../../containers/HeaderButton';
import Product from './Product';
import { GradientHeader } from '../../containers/GradientHeader';
import StatusBar from '../../containers/StatusBar';
import { withTheme } from '../../theme';

const CategoryView = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    text: '',
    data: [],
    refreshing: false,
    loading: true,
    updating: false,
    currentIndex: 0,
    category: {
      id: 1,
      name_kana: '太田貴之太田貴之太田貴之',
      name: 'Belts',
      image_url:
        'https://static.wixstatic.com/media/c07800_79951b3b380448eda84318a06e888886~mv2.png/v1/fill/w_348,h_328,al_c,q_85,usm_0.66_1.00_0.01/IMG_20210226_143902_31fdb4ad-44a3-4866-9.webp',
      images: [
        'https://static.wixstatic.com/media/c07800_79951b3b380448eda84318a06e888886~mv2.png/v1/fill/w_348,h_328,al_c,q_85,usm_0.66_1.00_0.01/IMG_20210226_143902_31fdb4ad-44a3-4866-9.webp',
        'https://static.wixstatic.com/media/c07800_79951b3b380448eda84318a06e888886~mv2.png/v1/fill/w_348,h_328,al_c,q_85,usm_0.66_1.00_0.01/IMG_20210226_143902_31fdb4ad-44a3-4866-9.webp',
        'https://static.wixstatic.com/media/c07800_79951b3b380448eda84318a06e888886~mv2.png/v1/fill/w_348,h_328,al_c,q_85,usm_0.66_1.00_0.01/IMG_20210226_143902_31fdb4ad-44a3-4866-9.webp',
        'https://static.wixstatic.com/media/c07800_79951b3b380448eda84318a06e888886~mv2.png/v1/fill/w_348,h_328,al_c,q_85,usm_0.66_1.00_0.01/IMG_20210226_143902_31fdb4ad-44a3-4866-9.webp',
      ],
    },
    products: [
      {
        id: 1,
        name_kana: '太田貴之',
        name: 'Belts',
        image_url:
          'https://static.wixstatic.com/media/c07800_79951b3b380448eda84318a06e888886~mv2.png/v1/fill/w_348,h_328,al_c,q_85,usm_0.66_1.00_0.01/IMG_20210226_143902_31fdb4ad-44a3-4866-9.webp',
        price: 190,
      },
      {
        id: 1,
        name_kana: '太田貴之',
        name: 'Belts',
        image_url:
          'https://static.wixstatic.com/media/c07800_79951b3b380448eda84318a06e888886~mv2.png/v1/fill/w_348,h_328,al_c,q_85,usm_0.66_1.00_0.01/IMG_20210226_143902_31fdb4ad-44a3-4866-9.webp',
        price: 190,
      },
      {
        id: 1,
        name_kana: '太田貴之',
        name: 'Belts',
        image_url:
          'https://static.wixstatic.com/media/c07800_79951b3b380448eda84318a06e888886~mv2.png/v1/fill/w_348,h_328,al_c,q_85,usm_0.66_1.00_0.01/IMG_20210226_143902_31fdb4ad-44a3-4866-9.webp',
        price: 190,
      },
      {
        id: 1,
        name_kana: '太田貴之',
        name: 'Belts',
        image_url:
          'https://static.wixstatic.com/media/c07800_79951b3b380448eda84318a06e888886~mv2.png/v1/fill/w_348,h_328,al_c,q_85,usm_0.66_1.00_0.01/IMG_20210226_143902_31fdb4ad-44a3-4866-9.webp',
        price: 190,
      },
      {
        id: 1,
        name_kana: '太田貴之',
        name: 'Belts',
        image_url:
          'https://static.wixstatic.com/media/c07800_79951b3b380448eda84318a06e888886~mv2.png/v1/fill/w_348,h_328,al_c,q_85,usm_0.66_1.00_0.01/IMG_20210226_143902_31fdb4ad-44a3-4866-9.webp',
        price: 190,
      },
      {
        id: 1,
        name_kana: '太田貴之',
        name: 'Belts',
        image_url:
          'https://static.wixstatic.com/media/c07800_79951b3b380448eda84318a06e888886~mv2.png/v1/fill/w_348,h_328,al_c,q_85,usm_0.66_1.00_0.01/IMG_20210226_143902_31fdb4ad-44a3-4866-9.webp',
        price: 190,
      },
    ],
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButton.Drawer
          navigation={navigation}
          testID="rooms-list-view-sidebar"
        />
      ),
      title: 'VIP Billionaires Shop',
      headerRight: () => (
        <HeaderButton.Search
          title="menu"
          navigation={navigation}
          testID="rooms-list-view-create-channel"
        />
      ),
      headerBackground: () => <GradientHeader />,
    });
  }, []);

  const onPressProduct = product => {
    navigation.replace('ProductDetail', { product });
  };

  const renderSlides = () => {
    let sides = [];
    const { category } = state;
    category.images.forEach(c => {
      sides.push(
        <ImageBackground source={{ uri: c }} style={styles.slides} key={c.id} />,
      );
    });
    return sides;
  };

  const { category, products } = state;

  return (
    <MainScreen navigation={navigation}>
      <StatusBar />
      <View style={styles.header}>
        <Swiper
          loop={false}
          ref={ref => (swipe = ref)}
          activeDotStyle={styles.activeDot}
          containerStyle={styles.swiperContainer}
          dotStyle={styles.dot}
          paginationStyle={{ position: 'absolute', bottom: 10 }}>
          {renderSlides()}
        </Swiper>
        <Text style={styles.topCategoryTitle}>{category.name_kana}</Text>
      </View>
      <ScrollView style={{ flexGrow: 1, marginBottom: 60, marginTop: 4 }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {products.map(p => (
            <Product
              key={p.id}
              item={p}
              onPressItem={() => onPressProduct(p)}
            />
          ))}
        </View>
      </ScrollView>
    </MainScreen>
  );
};

CategoryView.propTypes = {
  user: PropTypes.object,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(CategoryView));
