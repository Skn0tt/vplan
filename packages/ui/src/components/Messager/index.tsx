import * as React from "react";
import { Snackbar, SnackbarContent } from "material-ui";
import { connect } from "react-redux";
import { AppState, removeError, getErrors } from "vplan-redux";
import { Dispatch, Action } from "redux";

/**
 * # Component Types
 */

interface StateProps {
  errors: Error[];
}
const mapStateToProps = (state: AppState) => ({
  errors: getErrors(state)
});

interface DispatchProps {
  remove(i: number): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  remove: i => dispatch(removeError(i))
});

type Props = StateProps & DispatchProps;

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
          message={<p>{e.message}</p>}
          onClose={() => remove(i)}
        />
      ))}
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Messager);
