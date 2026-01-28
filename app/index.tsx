import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { evaluate } from 'mathjs';

export default function Calcolatrice() { // Ho rinominato la funzione per chiarezza
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value: string) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearInput();
    } else if (value === 'DEL') {
      HandleBackaspace();
    } else {
      setInput(input + value);
    }
  };

  const calculateResult = () => {
    try {
      // Sostituisce 'x' con '*' per la matematica
      const formattedInput = input.replace('x', '*');
      const finalResult = evaluate(formattedInput); 
      setResult(String(finalResult));
    } catch (error) {
      setResult('Errore');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const HandleBackaspace = () => {
    // Toglie l'ultimo carattere dalla stringa
    setInput(input.slice(0, -1));
  }

  // Definizione dei tasti
  const buttons = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', 'DEL'] 
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.inputText}>{input}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.button,
                  item === '=' ? styles.equalButton : null,
                  item === 'C' ? styles.clearButton : null
                ]}
                // Controllo se item non è vuoto prima di assegnare l'azione
                onPress={() => item !== '' && handlePress(item)}
              >
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    paddingBottom: 30,
  },
  inputText: {
    color: '#fff',
    fontSize: 40,
  },
  resultText: {
    color: '#aaa',
    fontSize: 30,
    marginTop: 10,
  },
  buttonsContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3e4149',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  equalButton: {
    backgroundColor: '#ff9f0a', 
  },
  clearButton: {
    backgroundColor: '#a5a5a5', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});