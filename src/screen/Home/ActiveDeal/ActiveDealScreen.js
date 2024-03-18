import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const ActiveDealScreen = ({ navigation }) => {
    const queries = useSelector(state => state.deals.queries);

    const handleEditDeal = (queryId) => {
        navigation.navigate('EditDeal', { queryId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Active Deals</Text>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddDeal')}>
                <Text style={styles.addButtonText}>Add Deal</Text>
            </TouchableOpacity>
            {queries.map(query => (
                <TouchableOpacity
                    key={query.id}
                    style={styles.queryContainer}
                    onPress={() => handleEditDeal(query.id)}>
                    <Text style={styles.queryTitle}>{query.title}</Text>
                    <Text style={styles.queryDetails}>{query.description}</Text>
                    <Text style={styles.queryLastDate}>Last Date: {new Date(query.endDate).toDateString()}</Text>
                    <Text style={styles.queryStatus}>Status: {query.status}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    queryContainer: {
        margin:5,
        backgroundColor: '#fefefe',
        padding:20,
        borderRadius:10
    },
    queryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    queryDetails: {
        fontSize: 16,
        marginTop: 5,
    },
    queryLastDate: {
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 5,
    },
    queryStatus: {
        fontSize: 14,
        marginTop: 5,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
        marginTop: 20,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ActiveDealScreen;
