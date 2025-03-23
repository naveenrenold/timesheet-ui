import "Scanner.css";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";
import httpClient from "../../helperServices/httpClient";

function Scanner() {
  useEffect(() => {
    let cameraId = "";
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          cameraId = devices[0].id;
        }
      })
      .then(function renderScanner() {
        const html5QRCode = new Html5Qrcode("reader");
        html5QRCode.start(
          cameraId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          function handleDecodedText(decodedText, decodedResult) {
            fillAttendance(decodedText);
          },
          function handleError(err) {
            console.log("Scanner failed to scan", err);
          }
        );
      })
      .catch((err) => {
        console.log("Scanner failed to get camera:", err);
      });
  }, []);

  const fillAttendance = function (employeeId: string) {
    if (employeeId) {
      let request = {
        employeeId,
        StatusId: "1",
        date: new Date(),
      };
      httpClient.post(httpClient.postAttendance, request, true);
    }
  };
  return (
    <>
      <div id="reader"></div>
    </>
  );
}
export default Scanner;
