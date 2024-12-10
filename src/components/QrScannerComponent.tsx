import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

const QrScannerComponent: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startScanning = async () => {
    if (videoRef.current && !isScanning) {
      const scanner = new QrScanner(
        videoRef.current,
        (result: any) => {
          setScanResult(result?.data);
          setIsScanning(false);
          videoRef.current = null;
          scanner.stop();
        },
        {
          highlightScanRegion: true,
        }
      );

      await scanner.start();
      setIsScanning(true);
      return () => {
        scanner.stop();
        setIsScanning(false);
      };
    }
  };

  useEffect(() => {
    return () => {
      setIsScanning(false);
    };
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>

      {/* Button mở camera */}
      <button onClick={startScanning} disabled={isScanning}>
        {isScanning ? "Đang quét..." : "Mở Camera để quét"}
      </button>

      {/* Video element cho camera */}
      <video ref={videoRef} style={{ width: "100%" }} />

      <div>
        {scanResult ? (
          <p>Mã QR đã quét: {scanResult}</p>
        ) : (
          <p>Chưa quét được mã QR nào.</p>
        )}
      </div>
    </div>
  );
};

export default QrScannerComponent;
