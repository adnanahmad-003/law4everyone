import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

//redux
import { addCaseAPI } from './Modal/Modal';
import { useDispatch } from 'react-redux';
import { addQuery } from '../../../../../Redux/action';
import COLORS from '../../../../constants/Color';

const AddDeal = ({ navigation }) => {
    const dispatch = useDispatch();
    const [queryTitle, setQueryTitle] = useState('');
    const [queryDetails, setQueryDetails] = useState('');
    const [lastDate, setLastDate] = useState(new Date());
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false); // State to control visibility of DatePicker

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Open', value: 'Open' },
        { label: 'Closed', value: 'Closed' },
        { label: 'Withdraw', value: 'Withdraw' }
    ]);

    const postData = {
        queryTitle: queryTitle,
        queryDetails: queryDetails,
        endDate: lastDate.toISOString(),
        status: status
    };

    const handleSaveQuery = async () => {
        if (!queryTitle || !queryDetails || !status) {
            setError('All fields are required');
            return;
        }
        try {
            const response = await addCaseAPI(postData);
        } catch (error) {
            console.error('Error adding string:', error);
        }
        dispatch(addQuery(queryTitle, queryDetails, lastDate.toISOString(), status));
        navigation.navigate('ActiveDealScreen');
    };

    const handleDatePicker = () => {
        setShowDatePicker(!showDatePicker); // Toggle the visibility of DatePicker
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false); // Close the DatePicker when a date is selected
        if (selectedDate) {
            setLastDate(selectedDate);
        }
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
                placeholderStyle={{ color: 'white' }} 
                style={{ width: "80%" , alignSelf: 'center',margin:20,backgroundColor:COLORS.brown2}}
                dropDownContainerStyle={{ width: '60%',color:'#fff'}}
            />
            <TextInput
                style={styles.input}
                placeholder="Query Title"
                placeholderTextColor={COLORS.brown1}
                value={queryTitle}
                onChangeText={setQueryTitle}
                
            />
            <TextInput
                style={styles.input}
                placeholder="Query Details"
                multiline
                numberOfLines={4}
                value={queryDetails}
                placeholderTextColor={COLORS.brown1}
                onChangeText={setQueryDetails}
            />

            {Platform.OS === 'ios' || showDatePicker ? (
                <DateTimePicker
                    value={lastDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            ) : (
                <View style={styles.datePickerContainer}>
                <View style={styles.selectButton}>
                    <Button
                        title="Select Date"
                        onPress={handleDatePicker}
                        color={COLORS.brown4} // Set button text color to black
                    />
                </View>
                <Text>Date: {lastDate.toDateString()}</Text>
               </View>       
            )}

            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View  style={[styles.saveButton, { height: 60 }]}>
                    <Button
                        title="Save Query"
                        onPress={handleSaveQuery}
                        // Set button text color to black
                        color='#ddb982'
                    />
                </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        width: '95%',
        height: 50,
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: COLORS.brown5, 
        borderRadius:10,
      
    },
    
    selectButton: {
        height: 50, // Set the height of the button
        width: 100, // Set the width of the button
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.brown4, // Set button background color
        borderRadius: 0, // Set border radius
    },
    buttonText: {
        color: '#FFFFFF', // Set text color to white
    },
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderColor:COLORS.brown4,
        borderWidth: 1,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 0, // Set border radius
        height: 50,
    },
    savebutton:{
            height:70,
            marginTop: 20,
            color:COLORS.brown1,
            
    },
    error: {
            color: '#3E3232',
            marginBottom: 10,
        },
    
      
  
  
});

export default AddDeal;


