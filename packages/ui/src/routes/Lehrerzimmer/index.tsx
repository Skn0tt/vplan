import * as React from "react";
import { AllEntriesMap, getTeacherEntries, fetchEntries } from "vplan-redux";
import { TeacherEntry, TeacherEntries } from "vplan-types";
import { connect, Dispatch } from "react-redux";
import { Action } from "redux";

interface StateProps {
  entries: TeacherEntries;
  state: AllEntriesMap;
}
const mapStateToProps = (state: AllEntriesMap) =>
  ({
    entries: getTeacherEntries(state),
    state
  } as StateProps);

interface DispatchProps {
  refresh(): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({
    refresh: () => dispatch(fetchEntries())
  } as DispatchProps);

type Props = StateProps & DispatchProps;

const Lehrerzimmer = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component<Props> {
    componentDidMount() {
      this.props.refresh();
    }
    render() {
      const { entries } = this.props;

      console.log("state: ", this.props.state.toJS());
      return <div>{JSON.stringify(entries)}</div>;
    }
  }
);

export default Lehrerzimmer;
