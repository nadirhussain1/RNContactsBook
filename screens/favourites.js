import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { fetchContacts } from '../utils/api';
import ContactThumbnail from '../components/ContactThumbnail';
import store from '../store';

export default class Favourites extends React.Component {
  state = {
    contacts:store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error,
   };

   async componentDidMount() {
     const {contacts} = this.state;

     this.unsubscribe = store.onChange(() =>
       this.setState({
          contacts: store.getState().contacts,
          loading: store.getState().isFetchingContacts,
          error:store.getState().error,
       })
      );

      if(contacts.length === 0){
         const fetchedContacts = await fetchContacts();

         store.setState({contacts:fetchedContacts, isFetchingContacts:false});
      }

  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  renderFavoriteThumbnail = ({ item }) => {
    const { navigation: { navigate } } = this.props;
    const { avatar } = item;

    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate('Profile', { ...item })}
      />
     );
  }


  render(){
    const { loading, contacts, error } = this.state;
    const favorites = contacts.filter(contact => contact.favorite);

    return(
      <View style={styles.container}>
          {loading && <ActivityIndicator size="large" />}
          {error && <Text>Error...</Text>}

          {!loading &&
            !error && (
            <FlatList
              data={favorites}
              numColumns={3}
              contentContainerStyle={styles.list}
              renderItem={this.renderFavoriteThumbnail}
             />
         )}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },

});
