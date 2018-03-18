import * as React from "react";
import {} from "react-native";
import { connect } from "react-redux";
import { AppState } from "vplan-redux";
import { Dispatch, Action } from "redux";

/**
 * # Helpers
 */

/**
 * # Component Types
 */
interface StateProps {}
const mapStateToProps = (state: AppState) => ({} as StateProps);

interface DispatchProps {}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({} as DispatchProps);

type Props = StateProps & DispatchProps;

/**
 * # Component
 */
const Settings = connect()(class extends React.Component<Props> {});

export default Settings;
