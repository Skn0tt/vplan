import * as React from "react";
import { Action } from "redux";
import { Text, ActivityIndicator, View } from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { getInfo, isLoading, AppState, fetchEntries } from "vplan-redux";

import styles from "./styles";
import { Dispatch } from "redux";

interface OwnProps {
  onClose(): void;
}

interface DispatchProps {
  loadInfo(): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  loadInfo: () => dispatch(fetchEntries())
});

interface StateProps {
  info: string;
  loading: boolean;
}
const mapStateToProps = (state: AppState) => ({
  info: getInfo(state),
  loading: isLoading(state)
});

type Props = OwnProps & DispatchProps & StateProps;

const InfoModal = connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends React.Component<Props> {
    componentDidMount() {
      this.props.loadInfo();
    }

    render() {
      const { loading, info } = this.props;

      return (
        <Modal isVisible onBackdropPress={() => this.props.onClose()}>
          <View style={styles.container}>
            <Text style={styles.text}>{info}</Text>
            {loading && <ActivityIndicator size="small" />}
          </View>
        </Modal>
      );
    }
  }
);

export default InfoModal;
