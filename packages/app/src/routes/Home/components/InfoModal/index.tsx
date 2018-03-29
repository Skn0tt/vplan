import * as React from "react";
import { View, Text, FlatList } from "react-native";
import {
  getInfos,
  AppState,
  isLoading,
  fetchInfo,
  getInfoTeacher,
  getInfoStudent,
  getOwnInfos
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
  infos: string[];
  loading: boolean;
}
const mapStateToProps = (state: AppState): StateProps => ({
  infos: getOwnInfos(state),
  loading: isLoading(state)
});

interface DispatchProps {
  refresh();
}
const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  refresh: () => dispatch(fetchInfo())
});

type Props = OwnProps & StateProps & DispatchProps;

/**
 * # Component
 */
const InfoModal: React.SFC<Props> = props => {
  const { show, onClose, infos, loading, refresh } = props;

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
          data={infos}
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
