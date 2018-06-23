import * as React from "react";
import { Short } from "vplan-types";
import { TextInput, Text, View } from "react-native";
import styles from "./styles";

/**
 * # Component Types
 */
interface OwnProps {
  short: Short;
  onChange(s: Short): void;
}
type Props = OwnProps;

interface State {
  short: string;
}

/**
 * # Component
 */
class ShortInput extends React.PureComponent<Props, State> {
  /**
   * ## Initialization
   */
  state: State = {
    short: this.props.short
  };

  /**
   * ## Lifecycle
   */
  componentWillUnmount() {
    this.props.onChange(this.state.short);
  }

  /**
   * ## Handlers
   */
  handleInput = (input: string) =>
    this.setState({ short: input.toUpperCase() });
  submitInput = () => this.props.onChange(this.state.short);

  /**
   * ## Render
   */
  render() {
    const { short } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Kürzel</Text>
        <TextInput
          style={styles.input}
          value={short}
          onChangeText={this.handleInput}
          onEndEditing={this.submitInput}
          placeholder="Hier eingeben"
        />
      </View>
    );
  }
}

export default ShortInput;
