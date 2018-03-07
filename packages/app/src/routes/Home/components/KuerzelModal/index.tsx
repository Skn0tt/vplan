import * as React from "react";
import { Text, ActivityIndicator, View } from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { actions } from "../../../../redux/store";
import selectors from "../../../../redux/selectors";

import styles from "./styles";

class InfoModal extends React.Component {
  componentDidMount() {
    this.props.loadTeacher();
  }

  render() {
    const { loading, kuerzel } = this.props;

    const lehrer = this.props.getLehrer(kuerzel);

    return (
      <Modal isVisible onBackdropPress={() => this.props.onClose()}>
        <View style={styles.container}>
          {lehrer && (
            <View>
              <Text style={styles.title}>
                {lehrer.firstName} {lehrer.lastName}
              </Text>
              <Text style={styles.shortcut}>{lehrer.shortcut}</Text>
              <Text style={styles.subjects}>{lehrer.subjects.join(", ")}</Text>
            </View>
          )}
          {loading && <ActivityIndicator size="small" />}
        </View>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadTeacher: () => dispatch({ type: actions.LOOKUP_KUERZEL })
});

const mapStateToProps = state => ({
  getLehrer: kuerzel => selectors.getLehrer(kuerzel)(state),
  loading: selectors.getLoading(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);
