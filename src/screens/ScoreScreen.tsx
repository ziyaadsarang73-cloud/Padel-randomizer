import React, { useState } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';

const ScoreScreen = () => {
    const [team1Score, setTeam1Score] = useState(0);
    const [team2Score, setTeam2Score] = useState(0);
    const [history, setHistory] = useState([]);

    const updateScore = (team, change) => {
        const newHistory = [...history, { team1Score, team2Score }];
        setHistory(newHistory);

        if (team === 1) {
            setTeam1Score(prev => prev + change);
        } else {
            setTeam2Score(prev => prev + change);
        }
    };

    const undoLastAction = () => {
        if (history.length > 0) {
            const lastScores = history.pop();
            setTeam1Score(lastScores.team1Score);
            setTeam2Score(lastScores.team2Score);
            setHistory(history);
        }
    };

    const saveMatch = async () => {
        try {
            const matchData = { team1Score, team2Score };
            await AsyncStorage.setItem('matchData', JSON.stringify(matchData));
            alert('Match saved!');
        } catch (error) {
            console.error('Error saving match:', error);
        }
    };

    return (
        <View>
            <Text>Team 1 Score: {team1Score}</Text>
            <Text>Team 2 Score: {team2Score}</Text>
            <Button title='Increase Team 1' onPress={() => updateScore(1, 1)} />
            <Button title='Decrease Team 1' onPress={() => updateScore(1, -1)} />
            <Button title='Increase Team 2' onPress={() => updateScore(2, 1)} />
            <Button title='Decrease Team 2' onPress={() => updateScore(2, -1)} />
            <Button title='Undo' onPress={undoLastAction} />
            <Button title='Save Match' onPress={saveMatch} />
        </View>
    );
};

export default ScoreScreen;