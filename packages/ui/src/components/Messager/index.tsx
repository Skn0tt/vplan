import * as React from "react";
import { Snackbar, SnackbarContent } from "material-ui";
import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam
} from "react-redux";
import { AppState, removeError, getErrors } from "vplan-redux";
import { Dispatch, Action } from "redux";

/**
 * # Component Types
 */

interface StateProps {
  errors: string[];
}
const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  AppState
> = state => ({
  errors: getErrors(state)
});

interface DispatchProps {
  remove(i: number): void;
}
const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  OwnProps
> = dispatch => ({
  remove: i => dispatch(removeError(i))
});

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

/**
 * # Component
 */
const Messager: React.SFC<Props> = props => {
  const { errors, remove } = props;

  return (
    <React.Fragment>
      {errors.map((e, i) => (
        <Snackbar
          open
          autoHideDuration={6000}
          message={<p>{e}</p>}
          onClose={() => remove(i)}
        />
      ))}
    </React.Fragment>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(Messager);
