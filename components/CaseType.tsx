import styles from "../styles/CaseType.module.css";
import { useEffect, useState, useRef } from "react";


interface props {
  toggleButtonRef: any;
  setShowComponent: any;
  data: string[];
  setCaseType: any;
}

export default function CaseType(props: props) {
  const { data, setShowComponent, toggleButtonRef, setCaseType } = props;

  const thisCompRef = useRef(null);


 useEffect(() => {
    // Function to handle when clicks outside the popup to hide this component
    const handleClickOutside = (event: MouseEvent) => {
      if (
        thisCompRef.current &&
        !(thisCompRef.current as any).contains(event.target as Node)
      ) {
        // this div will close upon clicking outside but user can also clik on button which is also outside, so ref of that button is used here
        if (toggleButtonRef.current === event.target) {
          setShowComponent(true);
        } else {
          setShowComponent(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowComponent, toggleButtonRef]);
  


  const setCaseHandler = (caseType: string) => {
    setCaseType(caseType)
    setShowComponent(false)
  }

  const contents = data ?  data.map((type) => (
    <div className={styles.singleType} onClick={() => setCaseHandler(type)}>{type}</div>
  )) : null;
  return <div ref={thisCompRef} className={styles.container}>
    {contents}
  </div>
}
