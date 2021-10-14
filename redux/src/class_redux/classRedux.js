import React from 'react';
import {View, Text, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {INCREMENT, DECREMENT} from './actions/types';
import {dispatch} from 'jest-circus/build/state';

class ClassRedux extends React.Component {
  render() {
    const {counter} = this.props.counter;
    return (
      <View>
        <Text>Berhitung : {counter}</Text>
        <Button title="+" onPress={this.props.increment} />
        <Button title="-" onPress={this.props.decrement} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  counter: state,
  token: state.token,
});

const mapDispatchToProps = dispatch => {
  return {
    increment: numb => dispatch({type: INCREMENT, payload: numb}),
    decrement: numb => dispatch({type: DECREMENT, payload: numb}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassRedux);

// export default ClassRedux;
