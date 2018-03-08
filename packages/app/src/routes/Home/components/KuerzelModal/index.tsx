import * as React from "react";
import { Text, ActivityIndicator, View } from "react-native";
import { connect, Dispatch } from "react-redux";
import Modal from "react-native-modal";
import {
  fetchTeachers,
  AppState,
  isLoading,
  getTeacherInfo
} from "vplan-redux";

import styles from "./styles";
import { Action } from "redux";
import { Teacher, TeacherInfo } from "vplan-types";

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
  getTeacher(short: string): TeacherInfo;
  loading: boolean;
}
const mapStateToProps = (state: AppState) => ({
  getTeacher: (short: string) => getTeacherInfo(short)(state),
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
                <Text style={styles.title}>{lehrer.name}</Text>
                <Text style={styles.shortcut}>{lehrer.short}</Text>
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
