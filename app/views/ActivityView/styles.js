import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  itemContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    flex: 1,
    paddingRight: 20,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  itemTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  itemText: {
    flex: 1,
    marginVertical: 4,
    fontSize: 16,
    color: 'black',
  },
  postImageContainer: {
    position: 'relative',
  },
  postImages: {
    width: 52,
    height: 52,
    borderRadius: 4,
  },
  playIcon: {
    top: 10,
    left: 10,
    position: 'absolute',
  },
  emptyText: {
    marginTop: 40,
    fontSize: 16,
    alignSelf: 'center',
  },
  captionText: {
    fontSize: 12,
  },
});
