import * as React from "react";
import { View, Text, FlatList } from "react-native";
import {
  getAllMessages,
  AppState,
  isLoading,
  getOwnMessages,
  fetchMessages
} from "vplan-redux";
import { Action, Dispatch } from "redux";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import styles from "./styles";

/**
 * # Component Type
 */
interface OwnProps {
  show: boolean;
  onClose(): void;
}

interface StateProps {
  messages: string[];
  loading: boolean;
}
const mapStateToProps = (state: AppState): StateProps => ({
  messages: getOwnMessages(state),
  loading: isLoading(state)
});

interface DispatchProps {
  refresh(): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  refresh: () => dispatch(fetchMessages())
});

type Props = OwnProps & StateProps & DispatchProps;

/**
 * # Component
 */
const InfoModal: React.SFC<Props> = props => {
  const { show, onClose, messages, loading, refresh } = props;

  return (
    <Modal
      isVisible={show}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropColor="black"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Informationen</Text>
        <FlatList
          data={messages}
          refreshing={loading}
          onRefresh={refresh}
          renderItem={({ item, index }) => (
            <Text style={styles.item}>{item}</Text>
          )}
          keyExtractor={(_, i) => "" + i}
        />
      </View>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);
