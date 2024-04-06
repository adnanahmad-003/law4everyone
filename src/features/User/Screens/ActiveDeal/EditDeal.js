import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
//import { useDispatch, useSelector } from 'react-redux';
//import { updateQuery } from '../../../../Redux/action';
import { updateCaseAPI } from './Modal/Modal';
const EditDeal = ({ route, navigation }) => {
  const { queryId } = route.params;
  const {title}= route.params;
  const {description}= route.params;
 // const dispatch = useDispatch();

  // Access the query details from Redux store based on queryId
  /*const query = useSelector(state =>
    state.deals.queries.find(query => query.id === queryId)
  );*/

  // Initialize state with query details
  const [queryTitle, setQueryTitle] = useState(title);
  const [queryDetails, setQueryDetails] = useState(description);
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
      queryId :queryId,
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
        const response = await updateCaseAPI(postData);
    } catch (error) {
        console.error('Error adding string:', error);
    }

    //dispatch(updateQuery(queryId, queryTitle, queryDetails, lastDate.toISOString(), status));
    navigation.navigate("ActiveDealScreen");
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
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            setLastDate(selectedDate);
          }
        }}
      />
       {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Save Changes" onPress={handleSaveQuery} />
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default EditDeal;
