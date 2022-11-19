import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

import { themes } from '../../constants/colors';
import { dateStringFromNowShort } from '../../utils/datetime';
import images from '../../assets/images';
import {
  POST_TYPE_PHOTO,
  POST_TYPE_TEXT,
  POST_TYPE_VIDEO,
} from '../../constants/app';
import { VectorIcon } from '../../containers/VectorIcon';
import PopupMenu from '../../containers/PopupMenu';
import { getUserRepresentString } from '../../utils/const';

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 40,
    overflow: 'hidden',
  },
  owner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 22,
    marginTop: 13,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'white',
  },
  profileInfo: {
    marginLeft: 12,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 17,
    fontWeight: '700',
  },
  captionText: {
    marginTop: 4,
    fontSize: 12,
  },
  more: {
    width: 8,
    height: 24,
    padding: 8,
    resizeMode: 'contain',
  },
  content: {
    position: 'relative',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 18,
  },
  photoImage: {
    width: '100%',
    height: 300,
  },
  likingImage: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    width: 48,
    height: 48,
  },
  video: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  thumbnailContainer: {
    position: 'relative',
    backgroundColor: 'black',
  },
  thumbnail: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  playIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 300,
  },
  footer: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  underlineDivider: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLikImage: {
    width: 20,
    height: 20,
  },
  actionText: {
    color: 'grey',
    marginLeft: 8,
  },
  actionCommentImage: {
    width: 20,
    height: 20,
  },
  actionShareImage: {
    width: 18,
    height: 18,
  },
  toolIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  count: {
    fontSize: 17,
    fontWeight: '600',
    marginRight: 12,
    color: 'white',
  },
  avatarWrap: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrap: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 11,
    marginTop: 16,
  },
  mediaWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 41,
    paddingHorizontal: 22,
    backgroundColor: '#00000090',
  },
});

const Post = ({
  key,
  item,
  isLiking,
  onPressUser,
  onPress,
  onPressShare,
  onActions,
  onLike,
  theme,
  style,
}) => {
  const [playing, setPlaying] = useState(false);

  return (
    <View
      key={key}
      style={[
        styles.container,
        { ...style, backgroundColor: themes[theme].postBackground },
      ]}
      onPress={onPress}>
      <View style={styles.owner}>
        <TouchableOpacity style={styles.avatarWrap} onPress={onPressUser}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                item?.owner?.avatar
                  ? { uri: item?.owner?.avatar }
                  : images.default_avatar
              }
              style={styles.avatar}
            />
          </View>
          <View style={styles.profileInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[
                  styles.profileName,
                  { color: themes[theme].activeTintColor },
                ]}>
                {item?.owner?.displayName}
              </Text>
              <Text
                style={[
                  styles.captionText,
                  {
                    color: themes[theme].infoText,
                    marginLeft: 10,
                  },
                ]}>
                {item?.date ? dateStringFromNowShort(item?.date) : null}
              </Text>
            </View>
            <Text style={[styles.captionText, { color: themes[theme].infoText }]}>
              {getUserRepresentString(item?.owner)}
            </Text>
          </View>
        </TouchableOpacity>
        <PopupMenu
          theme={theme}
          options={onActions.options}
          renderTrigger={() => (
            <Image
              source={images.more}
              style={[styles.more, { tintColor: themes[theme].moreIcon }]}
            />
          )}
        />
      </View>
      {item.type === POST_TYPE_TEXT && (
        <>
          <TouchableOpacity
            onPress={onPress}
            style={[styles.content, { paddingHorizontal: 20, marginBottom: 16 }]}>
            <Text style={[styles.titleText, { fontWeight: 'normal', fontSize: 14, lineHeight: 20, color: themes[theme].titleText }]}>
              {item?.text}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 41,
              paddingHorizontal: 22,
              backgroundColor: themes[theme].postTool,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => onLike(isLiking)}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={isLiking ? images.heart_red : images.heart}
                  style={styles.toolIcon}
                />
                <Text style={styles.count}>{item.likes?.length ?? 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPress}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={images.chat} style={styles.toolIcon} />
                <Text style={styles.count}>{item.comments?.length ?? 0}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onPressShare}>
              <Image source={images.share} style={styles.toolIcon} />
            </TouchableOpacity>
          </View>
        </>
      )}
      {item.type === POST_TYPE_PHOTO && (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.content, { paddingHorizontal: 11 }]}>
          {item.text && (
            <Text
              style={[
                styles.titleText,
                {
                  color: themes[theme].titleText,
                  paddingHorizontal: 10,
                  fontWeight: 'normal',
                  fontSize: 14, lineHeight: 20,
                },
              ]}>
              {item?.text}
            </Text>
          )}
          <View style={styles.imageWrap}>
            <Image source={{ uri: item?.photo }} style={styles.photoImage} />
            <View style={styles.mediaWrap}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => onLike(isLiking)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={isLiking ? images.heart_red : images.heart}
                    style={styles.toolIcon}
                  />
                  <Text style={styles.count}>{item.likes?.length ?? 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPress}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={images.chat} style={styles.toolIcon} />
                  <Text style={styles.count}>{item.comments?.length ?? 0}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={onPressShare}>
                <Image source={images.share} style={styles.toolIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
      {item.type === POST_TYPE_VIDEO && (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.content, { paddingHorizontal: 11 }]}>
          {item.text && (
            <Text
              style={[
                styles.titleText,
                {
                  color: themes[theme].titleText,
                  paddingHorizontal: 10,
                  fontWeight: 'normal',
                  fontSize: 14, lineHeight: 20,
                },
              ]}>
              {item.text}
            </Text>
          )}
          <View style={styles.imageWrap}>
            {playing ? (
              <Video
                source={{ uri: item.video }}
                style={styles.video}
                controls
                onEnd={() => setPlaying(false)}
                resizeMode={'contain'}
              />
            ) : (
              <View style={styles.thumbnailContainer}>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.thumbnail}
                  resizeMode={'contain'}
                />
                <TouchableOpacity
                  onPress={() => {
                    if (playing) {
                      onPress();
                    } else {
                      setPlaying(true);
                    }
                  }}
                  style={[styles.playIcon, { position: 'absolute' }]}>
                  <VectorIcon
                    name="playcircleo"
                    type={'AntDesign'}
                    size={72}
                    color={'white'}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.mediaWrap}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => onLike(isLiking)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={isLiking ? images.heart_red : images.heart}
                    style={styles.toolIcon}
                  />
                  <Text style={styles.count}>{item.likes?.length ?? 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPress}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={images.chat} style={styles.toolIcon} />
                  <Text style={styles.count}>{item.comments?.length ?? 0}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={onPressShare}>
                <Image source={images.share} style={styles.toolIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Post;
