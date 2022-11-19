import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { themes } from '../../constants/colors';
import StatusBar from '../../containers/StatusBar';
import { withTheme } from '../../theme';
import images from '../../assets/images';
import styles from './styles';
import firebaseSdk from '../../lib/firebaseSdk';
import { dateStringFromNow } from '../../utils/datetime';
import ActivityIndicator from '../../containers/ActivityIndicator';
import I18n from '../../i18n';
import MainScreen from '../../containers/MainScreen';
import * as HeaderButton from '../../containers/HeaderButton';
import debounce from '../../utils/debounce';
import { navigateToProfile } from '../../utils/const';
import { fetchUnread as fetchUnreadAction } from '../../actions/chat';

const MessageView = props => {
  const tabbarHeight = useBottomTabBarHeight();
  const [state, setState] = useState({
    text: '',
    data: [],
    searchData: [],
    refreshing: false,
    loading: true,
    unReads: 0,
    users: [],
  });
  const { theme, navigation, user } = props;
  const { searchData, data, refreshing, loading, users } = state;

  const unSubscribeRoom = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={navigation.toggleDrawer}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 25,
          }}>
          <Feather
            name="menu"
            size={22}
            color={themes[theme].activeTintColor}
          />
        </TouchableOpacity>
      ),
      title: I18n.t('Messages'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('FindFriend')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 25,
          }}>
          <Feather
            name="search"
            size={22}
            color={themes[theme].activeTintColor}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: themes[theme].messageHeader,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: themes[theme].activeTintColor,
        alignSelf: 'flex-start',
      },
    });
  }, [theme]);

  useEffect(() => {
    init();

    return () => {
      if (unSubscribeRoom.current) {
        unSubscribeRoom.current();
        unSubscribeRoom.current = null;
      }
    };
  }, []);

  // useEffect(() => {
  //   onSearch();
  // }, [state.text, state.data]);

  const init = async () => {
    const messageUsers = [];
    if (global.unSubscribeRoom) {
      global.unSubscribeRoom();
      global.unSubscribeRoom = undefined;
    }
    if (unSubscribeRoom.current) {
      unSubscribeRoom.current();
      unSubscribeRoom.current = null;
    }
    const roomSubscribe = await firestore().collection(firebaseSdk.TBL_ROOM);
    unSubscribeRoom.current = roomSubscribe.onSnapshot(async querySnapShot => {
      const userSnaps = await firestore()
        .collection(firebaseSdk.TBL_USER)
        .get();
      const users = [];
      userSnaps.forEach(s => users.push(s.data()));

      let allUnReads = 0;
      let list = [];
      querySnapShot.forEach(doc => {
        const room = doc.data();
        if (room.sender === user.userId || room.receiver === user.userId) {
          const receiver = users.find(
            u =>
              u.userId ===
              (room.sender === user.userId ? room.receiver : room.sender),
          );
          let unReads = 0;
          if (room.confirmUser === user.userId) {
            unReads = room.unReads;
          }
          if (!messageUsers.find(messageUser => messageUser.userId === receiver.userId)) {
            messageUsers.push(receiver);
          }
          allUnReads += unReads;
          list.push({
            id: doc.id,
            ...room,
            account: receiver,
            unReads,
          });
        }
      });
      list.sort((a, b) => b.date.seconds - a.date.seconds);
      setState({
        ...state,
        data: list,
        refreshing: false,
        loading: false,
        unReads: allUnReads,
        users: messageUsers,
      });
      props.fetchUnread();
    });
  };

  const onRefresh = () => {
    setState({ ...state, refreshing: true });
    init();
  };

  const onSearchChangeText = text => {
    // console.log(text);
    // setState({
    //   ...state,
    //   text: text.trim(),
    //   loading: false,
    // });
  };

  const onSearch = () => {
    // const {text, data} = state;
    // // Search
    // if (text.length > 0) {
    //   let searchData = data.filter(d => {
    //     const key = d.account.displayName;
    //     return key.toLowerCase().indexOf(text.toLowerCase()) >= 0;
    //   });
    //   setState({
    //     ...state,
    //     searchData,
    //     loading: false,
    //     refreshing: false,
    //   });
    // } else {
    //   setState({
    //     ...state,
    //     searchData: data,
    //     loading: false,
    //     refreshing: false,
    //   });
    // }
  };

  const onPressItem = item => {
    navigation.navigate('Chat', { room: item });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => onPressItem(item)}
      style={[styles.itemContainer, { marginBottom: index === data.length - 1 ? tabbarHeight : undefined }]}>
      <View style={styles.avatarContainer}>
        <Image
          source={
            item.account?.avatar
              ? { uri: item.account?.avatar }
              : images.default_avatar
          }
          style={styles.itemImage}
        />
        {item.unReads > 0 && (
          <View style={styles.unreadContainer}>
            <Text style={styles.unread}>{item.unReads}</Text>
          </View>
        )}
      </View>
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text
            style={[styles.itemTitle, { color: themes[theme].activeTintColor }]}>
            {item.account?.displayName}
          </Text>
          <Text style={[styles.itemTime, { color: themes[theme].message }]}>
            {dateStringFromNow(item.date)}
          </Text>
        </View>
        <View style={styles.itemFooter}>
          <Text
            style={[styles.itemMessage, { color: themes[theme].message }]}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {item.lastMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <MainScreen
      navigation={navigation}
      // hasSearch
      onSearchChangeText={onSearchChangeText}
      onSearch={onSearch}>
      <StatusBar />

      <View style={{ backgroundColor: themes[theme].messageHeader }}>
        {users.length > 0 || !loading ? (
          <ScrollView
            horizontal
            contentContainerStyle={{
              paddingVertical: 20,
              paddingLeft: 15,
            }}>
            {users.map(user => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigateToProfile(navigation, props.user, user)
                  }
                  style={styles.postUser}>
                  <Image
                    source={
                      user?.avatar ? { uri: user.avatar } : images.default_avatar
                    }
                    style={styles.postUserAvatar}
                  />
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.postUserName,
                      { color: themes[theme].activeTintColor },
                    ]}>
                    {user?.displayName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null}
      </View>
      <View style={{ flex: 1, backgroundColor: themes[theme].messageHeader }}>
        <View
          style={{
            flex: 1,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            backgroundColor: themes[theme].messageList,
          }}>
          {loading && (
            <ActivityIndicator absolute theme={theme} size={'large'} />
          )}
          {data.length > 0 ? (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={themes[theme].actionColor}
                />
              }
              contentContainerStyle={{ paddingVertical: 30 }}
            />
          ) : null}
        </View>
      </View>
    </MainScreen>
  );
};

MessageView.PropTypes = {
  user: PropTypes.object,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUnread: params => dispatch(fetchUnreadAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MessageView));
