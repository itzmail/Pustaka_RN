import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Example = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date())

  useEffect(() => {
  const formattedDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    console.log(`buat sendiri ${formattedDate}`)
  }, [date])

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    console.log("A date has been picked: ", date);
    hideDatePicker();
  };
  const handleConfirmTime = (time) => {
    console.log("A time has been picked: ", time);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Button title="Show Date Picker" onPress={showDatePicker}/>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={input => setDate(input)}
        onCancel={hideDatePicker}
        dateFormat= {'dayofweek day month'}
      />
      <Button title="Show Time Picker" onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

export default Example;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  }
})