import * as React from "react";
import { View, Text } from "react-native";
import { RouteComponentProps } from "react-router";

/**
 * # Component Types
 */
type Props = RouteComponentProps<{}>;

/**
 * # Component
 */
const AppBar: React.SFC<Props> = props => {
  const { location } = props;

  return (
    <View>
      <Text>{location.pathname}</Text>
    </View>
  );
};

export default AppBar;
