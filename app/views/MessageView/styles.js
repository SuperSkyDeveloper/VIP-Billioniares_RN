import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  avatarContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  itemContent: {
    flexGrow: 1,
    flex: 1,
    marginLeft: 8,
  },
  itemHeader: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  unreadContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
    minWidth: 16,
    minHeight: 16,
  },
  unread: {
    color: 'white',
    fontSize: 12,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemMessage: {},
  itemTime: {
    fontSize: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  postUser: {
    width: 70,
    marginRight: 20,
  },
  postUserAvatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
  },
  postUserName: {
    fontWeight: '600',
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
  },
});
