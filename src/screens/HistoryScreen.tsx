import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = () => {
    const [matchHistory, setMatchHistory] = useState([]);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const savedHistory = await AsyncStorage.getItem('matchHistory');
                if (savedHistory) {
                    setMatchHistory(JSON.parse(savedHistory));
                }
            } catch (error) {
                console.error('Failed to load match history:', error);
            }
        };
        loadHistory();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Match: {item.matchName}</Text>
            <Text style={styles.itemText}>Date: {item.date}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Match History</Text>
            <FlatList
                data={matchHistory}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
});

export default HistoryScreen;