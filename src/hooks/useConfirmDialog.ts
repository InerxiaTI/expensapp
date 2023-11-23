import { useState } from "react";


export const useConfirmDialog = ()=> {

	const [confirmationVisible, setConfirmationVisible] = useState(false);

  const showConfirmationDialog = () => {
    setConfirmationVisible(true);
  };

  const hideConfirmationDialog = () => {
    setConfirmationVisible(false);
  };

	return {
		confirmationVisible, setConfirmationVisible, 
		showConfirmationDialog, hideConfirmationDialog
	}

}