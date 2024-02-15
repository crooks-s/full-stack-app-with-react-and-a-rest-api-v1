const ErrorsDisplay = ({ errors }) => {
  let errorsDisplay = null;

  if (errors) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation Errors</h3> 
        <div>
          <ul>
            <li>{errors}</li>
          </ul>
        </div>
      </div>
    );
  }
  return errorsDisplay;
}

export default ErrorsDisplay;