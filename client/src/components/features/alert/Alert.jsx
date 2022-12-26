import Alert from 'react-bootstrap/Alert';

function DeleteAlert() {
  return (
    <>
      {[
        'success',
    
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
deleted successfully
        </Alert>
      ))}
    </>
  );
}

export default DeleteAlert;