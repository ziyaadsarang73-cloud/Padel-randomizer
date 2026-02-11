import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, FlatList, } from 'react-native';
import { randomizeTeams } from '../utils/teamRandomizer';

const HomeScreen = ({ navigation }) => {
    const [playerName, setPlayerName] = useState('');
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState(null);

    const addPlayer = () => {
        if (playerName.trim() === '') {
            Alert.alert('Error', 'Please enter a player name');
            return;
        }
        setPlayers([...players, { id: Date.now().toString(), name: playerName.trim() }]);
        setPlayerName('');
    };

    const removePlayer = (id) => {
        setPlayers(players.filter(p => p.id !== id));
    };

    const handleRandomize = () => {
        if (players.length < 4) {
            Alert.alert('Error', 'Need at least 4 players to create teams');
            return;
        }
        const randomizedTeams = randomizeTeams(players.map(p => p.name));
        setTeams(randomizedTeams);
    };

    const handleStartGame = () => {
        if (!teams) return;
        navigation.navigate('Score', { teams, players });
    };

    const clearAll = () => {
        setPlayers([]);
        setTeams(null);
        setPlayerName('');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>Add Players</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Enter player name" value={playerName} onChangeText={setPlayerName} onSubmitEditing={addPlayer} />
                    <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.playerList}>
                    {players.map(player => (
                        <View key={player.id} style={styles.playerItem}>
                            <Text style={styles.playerName}>{player.name}</Text>
                            <TouchableOpacity onPress={() => removePlayer(player.id)} style={styles.deleteButton} >
                                <Text style={styles.deleteButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <Text style={styles.playerCount}>Total Players: {players.length}</Text>
            </View>
            {players.length >= 4 && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.randomizeButton} onPress={handleRandomize}>
                        <Text style={styles.buttonText}>🎲 Randomize Teams</Text>
                    </TouchableOpacity>
                </View>
            )}
            {teams && (
                <View style={styles.teamsSection}>
                    <Text style={styles.sectionTitle}>Generated Teams</Text>
                    {teams.map((team, idx) => (
                        <View key={idx} style={styles.teamCard}>
                            <Text style={styles.teamTitle}>Team {idx + 1}</Text>
                            {team.map((player, playerIdx) => (
                                <Text key={playerIdx} style={styles.teamPlayer}> • {player} </Text>
                            ))}
                        </View>
                    ))}
                    <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
                        <Text style={styles.buttonText}>▶ Start Game</Text>
                    </TouchableOpacity>
                </View>
            )}
            {(players.length > 0 || teams) && (
                <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
                    <Text style={styles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16, },
    inputSection: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5, },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333', },
    inputContainer: { flexDirection: 'row', marginBottom: 12, gap: 8, },
    input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, },
    addButton: { backgroundColor: '#4CAF50', paddingHorizontal: 16, borderRadius: 6, justifyContent: 'center', alignItems: 'center', },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, },
    playerList: { marginBottom: 12, },
    playerItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 8, backgroundColor: '#f0f0f0', borderRadius: 4, marginBottom: 6, },
    playerName: { fontSize: 14, color: '#333', },
    deleteButton: { padding: 4, },
    deleteButtonText: { fontSize: 18, color: '#ff6b6b', },
    playerCount: { fontSize: 12, color: '#999', textAlign: 'center', },
    buttonContainer: { marginBottom: 16, },
    randomizeButton: { backgroundColor: '#2196F3', paddingVertical: 14, borderRadius: 8, alignItems: 'center', },
    teamsSection: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5, },
    teamCard: { backgroundColor: '#f9f9f9', borderLeftWidth: 4, borderLeftColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 12, marginBottom: 12, borderRadius: 4, },
    teamTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#4CAF50', },
    teamPlayer: { fontSize: 14, color: '#555', paddingVertical: 2, },
    startButton: { backgroundColor: '#4CAF50', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 12, },
    clearButton: { backgroundColor: '#ff6b6b', paddingVertical: 12, borderRadius: 8, alignItems: 'center', },
    clearButtonText: { color: '#fff', fontWeight: 'bold', },
});

export default HomeScreen;