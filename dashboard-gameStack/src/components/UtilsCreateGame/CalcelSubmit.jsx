import showAlert from "../Helpers/SwetAlert/SwetAlert2Confirmation";



showAlert
const CancelSubmit = () => {

  const handleConfirm = () => {
    window.location.reload();
  };
  
   
  showAlert(
    "Do you want to cancel the operation?",
    "You will lose all changes",
    "routeIcons.confirm",
    "Yes",
    handleConfirm,
    ""

  )

}
  export default CancelSubmit;
 
  
  
  
  