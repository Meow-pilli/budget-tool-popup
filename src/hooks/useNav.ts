import { useEffect } from "react";

export function useNav() {
    useEffect(() => {
        const globalNavBar = document.querySelector(".nav-bar") as HTMLElement | null;
        const globalMenuContainer = document.querySelector(
          ".menu-container"
        ) as HTMLElement | null;
    
        if (globalNavBar) globalNavBar.style.display = "none";
        if (globalMenuContainer) globalMenuContainer.style.display = "none";
    
        return () => {
          if (globalNavBar) globalNavBar.style.display = "flex";
          if (globalMenuContainer) globalMenuContainer.style.display = "block";
        };
      }, []);  
}