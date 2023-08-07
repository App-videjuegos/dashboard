const CancelSubmit = () => {

      window.alert('You are about to cancel your publication');
  
      const userResponse = window.confirm('Are you sure you want to return to Home?');
      if (userResponse) {
        // Aquí puedes realizar la navegación a la pantalla de inicio o realizar cualquier acción que desees.
        // Por ejemplo, puedes utilizar react-router-dom para la navegación si lo necesitas.
        console.log('Returning to Home...');
      } else {
        console.log('No pressed');
      }
    };
    
  export default CancelSubmit;
 
  
  
  
  