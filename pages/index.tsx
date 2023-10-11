import { useEffect, useState } from "react";

import ChartContainer from "../components/ChartContainer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Home() {
  const url =
    "https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv";

  const [data, setData] = useState<any>(null);
  const [prinClicked, setPrintClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const [fetchLoader, setFetchLoader] = useState(false);

  const fetchData = async () => {
    try {
      setFetchLoader(true);
      const response = await fetch(url);
      if (!response.ok) {
        setFetchLoader(false);
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setFetchLoader(false);
      setData(result);
    } catch (error) {
      console.log("error occured!");
    }
  };

  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector(".app") as HTMLElement;
    setLoader(true);
    if (capture != null) {
      html2canvas(capture, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const doc = new jsPDF("l", "mm", "a4");
        const compWidth = doc.internal.pageSize.getWidth();
        const compHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, "PNG", 0, 0, compWidth, compHeight);
        setLoader(false);
        doc.save("graph-tanvirAR.pdf");
      });
    }
  };

  const [caseType, setCaseType] = useState("Arson");
  const xValues = data?.data.map((singleYear: any) => singleYear.data_year);

  const yValues = data?.data.map((singleYear: any) => singleYear[caseType]);

  const printButtonHandler = async() => {
    setPrintClicked(true);

    // wait if data still not fetched from server
     while (fetchLoader) {
       await new Promise((resolve) => setTimeout(resolve, 100)); 
     }

  setTimeout(() => {
    downloadPDF();
  }, 2000);
  };

  return (
    <>
      {prinClicked ? (
        <div className="app">
          <Header />
          <div className="contents">
            <ChartContainer
              download={downloadPDF}
              xValues={xValues}
              yValues={yValues}
              setCaseType={setCaseType}
              caseType={caseType}
              types={data?.keys}
            />
          </div>
          <Footer />
        </div>
      ) : (
        <div className="print">
          <button onClick={printButtonHandler}>
            {fetchLoader  ? "loading..." : "Print"}
          </button>
        </div>
      )}
    </>
  );
}
