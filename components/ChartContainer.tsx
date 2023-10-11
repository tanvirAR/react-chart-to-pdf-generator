import Chart from "./Chart";
import styles from "../styles/ChartContainer.module.css";
import CaseType from "./CaseType";
import { useRef, useState } from "react";
interface props {
  xValues: number[];
  yValues: number[];
  download: any;
  types: string[];
  caseType: string;
  setCaseType: any;
}

export default function ChartContainer(props: props) {
  const { xValues, yValues, download, types, setCaseType, caseType } = props;

  const [showCasesTypes, setShowCasesTypes] = useState(false);
  const showCaseTypeButtonRef = useRef(null);

  const showCasesTypesHandler = () => {
    console.log(showCasesTypes)
    setShowCasesTypes(!showCasesTypes)
  }

  const chartData = {
    labels: xValues,
    datasets: [
      {
        label: "Dummy Datas",
        data: yValues,
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className={styles.line}>
        <p>&#40;</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height={"25px"}
          width={"25px"}
        >
          <path
            d="M18,4.48a8.45,8.45,0,0,0-12,12l5.27,5.28a1,1,0,0,0,1.42,0L18,16.43A8.45,8.45,0,0,0,18,4.48ZM16.57,15,12,19.59,7.43,15a6.46,6.46,0,1,1,9.14,0ZM9,7.41a4.32,4.32,0,0,0,0,6.1,4.31,4.31,0,0,0,7.36-3,4.24,4.24,0,0,0-1.26-3.05A4.3,4.3,0,0,0,9,7.41Zm4.69,4.68a2.33,2.33,0,1,1,.67-1.63A2.33,2.33,0,0,1,13.64,12.09Z"
            fill="#24e5cf"
          ></path>
        </svg>
        <p>&#41;</p>

        <p className={styles.type}>&nbsp; Crime &nbsp;&nbsp;</p>
        <div className={styles.lineInside}></div>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.title}>
          <p onClick={download}>{caseType}</p>
          <svg
            ref={showCaseTypeButtonRef}
            onClick={showCasesTypesHandler}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            className={showCasesTypes ? styles.toggled : ""}
          >
            <path
              d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"
              fill="white"
            />
          </svg>
          {showCasesTypes && (
            <div className={styles.popup}>
              <CaseType
                data={types}
                setShowComponent={setShowCasesTypes}
                toggleButtonRef={showCaseTypeButtonRef}
                setCaseType={setCaseType}
              />
            </div>
          )}
        </div>
        <div className={styles.mid}>
          <div className={`${styles.info} tittle3`}>
            <p>Arrests</p>
          </div>
          <div className={styles.chart}>
            <Chart chartData={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </>
  );
}
