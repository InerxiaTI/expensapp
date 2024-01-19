import { useState } from "react";


export const useContextMenu = ()=> {

	const [isContextMenuVisible, setContextMenuVisible] = useState(false);
 
  const showContextMenu = () => {
    setContextMenuVisible(true);
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };


	return {
		isContextMenuVisible,
		setContextMenuVisible,showContextMenu, hideContextMenu
	}



}