import * as React from "react";
import { Text, ActivityIndicator, View } from "react-native";
import { connect, Dispatch } from "react-redux";
import Modal from "react-native-modal";
import { getTeacher, fetchTeachers, AppState, isLoading } from "vplan-redux";

import styles from "./styles";
import { Action } from "redux";
import { Teacher } from "vplan-types";

interface OwnProps {
  short: string;
  onClose(): void;
}

interface DispatchProps {
  loadTeacher(): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  loadTeacher: () => dispatch(fetchTeachers())
});

interface StateProps {
  getTeacher(short: string): Teacher;
  loading: boolean;
}
const mapStateToProps = (state: AppState) => ({
  getTeacher: (short: string) => getTeacher(short)(state),
  loading: isLoading(state)
});

type Props = OwnProps & StateProps & DispatchProps;

const InfoModal = connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends React.Component<Props> {
    componentDidMount() {
      this.props.loadTeacher();
    }

    render() {
      const { loading, short } = this.props;

      const lehrer = this.props.getTeacher(short);

      return (
        <Modal isVisible onBackdropPress={() => this.props.onClose()}>
          <View style={styles.container}>
            {lehrer && (
              <View>
                <Text style={styles.title}>
                  {lehrer.firstName} {lehrer.lastName}
                </Text>
                <Text style={styles.shortcut}>{lehrer.shortcut}</Text>
                <Text style={styles.subjects}>
                  {lehrer.subjects.join(", ")}
                </Text>
              </View>
            )}
            {loading && <ActivityIndicator size="small" />}
          </View>
        </Modal>
      );
    }
  }
);

export default InfoModal;
