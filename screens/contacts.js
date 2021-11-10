import React from 'react';
import {StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';
import ContactListItem from '../components/ContactListItem';
import {fetchContacts} from '../utils/api';

export default class Contacts extends React.Component{
  state = {
    loading:true,
    error:false,
    contactsList:[],
  };

  async componentDidMount(){
      try{
           const contactsList = await fetchContacts();
           this.setState({loading:false, error:false,contactsList});

      }catch(e){
        this.setState({loading:false, error:true});

      }
  }

  renderContactItem = ({item}) => {
     const{name,avatar,phone} = item;

     return(
       <ContactListItem
         name = {name}
         avatar = {avatar}
         phone = {phone}
       />
     );

  };

  render(){
     const{loading,error,contactsList} = this.state;
     const contactsSorted = contactsList.sort( (a,b) => {
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
