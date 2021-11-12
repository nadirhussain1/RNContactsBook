import React from 'react';
import {StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';
import ContactListItem from '../components/ContactListItem';
import {fetchContacts} from '../utils/api';
import store from '../store';

export default class Contacts extends React.Component{
  state = {
    loading:store.getState().isFetchingContacts,
    error:store.getState().error,
    contacts:store.getState().contacts,
  };

  async componentDidMount(){
    this.unsubscribe = store.onChange(() =>
       this.setState({
          contacts:store.getState().contacts,
          loading:store.getState().isFetchingContacts,
          error:store.getState().error,
       })
     );

     const contacts = await fetchContacts();

     store.setState({contacts,isFetchingContacts:false});
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  renderContactItem = ({item}) => {
     const{id,name,avatar,phone} = item;
     const {navigation: {navigate} } = this.props;

     return(
       <ContactListItem
         name = {name}
         avatar = {avatar}
         phone = {phone}
         onPress={() => navigate('Profile', { ...item })}
       />
     );

  };

  render(){
     const{loading,error,contacts} = this.state;
     const contactsSorted = contacts.sort( (a,b) => {
          if(a.displayName > b.displayName){
               return 1;
           }
         if(a.displayName < b.displayName){
               return -1;
          }
        return 0;
     });

     return(
       <View style={styles.rootContainer}>

        {loading && <ActivityIndicator size='large' />}
        {error && <Text> Error loading contacts </Text>}
        {!loading && !error &&

          <FlatList
            data={contactsSorted}
            renderItem={this.renderContactItem}
          />

        }

      </View>
     );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
   },
});
