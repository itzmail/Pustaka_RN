import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  useEffect(() => {
    console.log(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Picker
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        mode="dropdown"
        prompt={'seleceted value'}>
        <Picker.name label="Selected Language" value={null} />
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
