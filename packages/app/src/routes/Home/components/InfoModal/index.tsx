import * as React from "react";
import { Text, ActivityIndicator, View } from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { actions } from "../../../../redux/store";
import selectors from "../../../../redux/selectors";

import styles from "./styles";

class InfoModal extends React.Component {
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

const mapDispatchToProps = dispatch => ({
  loadInfo: () => dispatch({ type: actions.LOOKUP_INFO })
});

const mapStateToProps = state => ({
  info: selectors.getInfo(state),
  loading: selectors.getLoading(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);
