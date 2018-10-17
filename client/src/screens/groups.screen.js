import R from 'ramda';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, StyleSheet, Text, TouchableHighlight, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  groupName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
});
// create fake data to populate our ListView
const fakeData = () => R.times(
  i => ({
    id: i,
    name: `Group ${i}`,
  }),
  100,
);
const Group = ({ group: { id, name }, goToMessages }) => (
  <TouchableHighlight key={id} onPress={goToMessages}>
    <View style={styles.groupContainer}>
      <Text style={styles.groupName}>{name}</Text>
    </View>
  </TouchableHighlight>
);
Group.propTypes = {
  goToMessages: PropTypes.func.isRequired,
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};
class Groups extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  keyExtractor = item => item.id.toString();

  goToMessages = group => () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Messages', { groupId: group.id, title: group.name });
  };

  renderItem = ({ item }) => <Group group={item} goToMessages={this.goToMessages(item)} />;

  render() {
    // render list of groups for user
    return (
      <View style={styles.container}>
        <FlatList data={fakeData()} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
      </View>
    );
  }
}

Groups.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default Groups;