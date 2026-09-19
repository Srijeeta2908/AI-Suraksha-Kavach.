import { useState } from "react";

import {
  scanUrl,
  scanMessage,
  scanEmail,
  scanImage,
  scanVideo,
  scanQR,
} from "../services/api";

import { saveScanHistory } from "../services/history";

export default function useScanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const runScan = async (type, data) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      let response;

      switch (type) {
        case "url":
          response = await scanUrl(data);
          break;

        case "message":
          response = await scanMessage(data);
          break;

        case "email":
          response = await scanEmail(data);
          break;

        case "image":
          response = await scanImage(data);
          break;

        case "video":
          response = await scanVideo(data);
          break;

        case "qr":
          response = await scanQR(data);
          break;

        default:
          throw new Error(
            "Unknown scanner type."
          );
      }

      setResult(response);

      try {
        await saveScanHistory({
          scannerType: type,
          inputData:
            typeof data === "string"
              ? data
              : data?.name || "Uploaded file",
          result: response,
        });
      } catch (historyError) {
        console.error(
          "History save failed:",
          historyError
        );
      }

      return response;
    } catch (err) {
      setError(
        err.message || "Scan failed."
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError("");
    setLoading(false);
  };

  return {
    loading,
    result,
    error,
    runScan,
    reset,
  };
}