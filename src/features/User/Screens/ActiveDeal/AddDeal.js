import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import DropDownPicker from 'react-native-dropdown-picker';

//redux
import { addCaseAPI } from './Modal/Modal';
import { useDispatch } from 'react-redux'; 
import { addQuery } from '../../../../../Redux/action';

const AddDeal = ({navigation}) => {
    const dispatch = useDispatch();
    const [queryTitle, setQueryTitle] = useState('');
    const [queryDetails, setQueryDetails] = useState('');
    const [lastDate, setLastDate] = useState(new Date());
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    const [open, setOpen] = useState(false);
    //const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Open', value: 'Open' },
      { label: 'Closed', value: 'Closed' },
      { label: 'Withdraw', value: 'Withdraw' }])
  
      const postData = {
        queryTitle: queryTitle,
        queryDetails: queryDetails,
        endDate: lastDate.toISOString(),
        status: status
      };

    const handleSaveQuery = async() => {
      if (!queryTitle || !queryDetails || !status) {
        setError('All fields are required');
        return;
      }
      try {
        const response = await addCaseAPI(postData);
    } catch (error) {
        console.error('Error adding string:', error);
    }
      dispatch(addQuery(queryTitle, queryDetails,lastDate.toISOString(),status));
      navigation.navigate('ActiveDealScreen');
      };
    
  
    return (
      <View style={styles.container}>
          <DropDownPicker
                        open={open}
                        value={status}
                        items={items}
                        setOpen={setOpen}
                        setValue={setStatus}
                        setItems={setItems}
                        placeholder="Deal Status"
                        style={{ width: "60%" }}
                        dropDownContainerStyle={{ width: '60%', }}
                    />
        <TextInput
          style={styles.input}
          placeholder="Query Title"
          value={queryTitle}
          onChangeText={setQueryTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Query Details"
          multiline
          numberOfLines={4}
          value={queryDetails}
          onChangeText={setQueryDetails}
        />
  
          <DateTimePicker
            value={lastDate}
            mode="date"
            display="default"
            onChange={(event,selectedDate) => {
              
              if (selectedDate) {
                setLastDate(selectedDate);
              }
            }}
          />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Save Query" onPress={handleSaveQuery} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    datePicker: {
      width: '100%',
      marginBottom: 20,
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
  });
export default AddDeal

