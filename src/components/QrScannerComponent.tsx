import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

// Khởi tạo component quét mã QR
const QrScannerComponent: React.FC = () => {
  // Trạng thái để lưu kết quả quét và trạng thái camera
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false); // Trạng thái để kiểm soát camera

  // Định nghĩa kiểu cho videoRef, sẽ là một đối tượng HTMLVideoElement hoặc null
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startScanning = () => {
    if (videoRef.current && !isScanning) {
      // Khởi tạo qr-scanner và kết nối với videoRef
      const scanner = new QrScanner(videoRef.current, (result: any) => {
        setScanResult(result?.data); // Lấy dữ liệu khi quét mã QR thành công
      });

      // Bắt đầu quét khi nhấn nút
      scanner.start();
      setIsScanning(true);

      // Dọn dẹp khi component unmount hoặc dừng quét
      return () => {
        scanner.stop();
        setIsScanning(false);
      };
    }
  };

  // Hàm dọn dẹp camera khi component unmount hoặc dừng quét
  useEffect(() => {
    return () => {
      // Dừng quét khi component unmount hoặc tắt camera
      setIsScanning(false);
    };
  }, []);
  const containerStyle = {
    position: "relative" as "relative",
    width: "100%",
    height: "100%",
  };

  const overlayStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    width: "200px",
    height: "200px",
    border: "2px solid rgba(255, 255, 255, 0.8)", // Viền trắng với độ trong suốt
    transform: "translate(-50%, -50%)",
    pointerEvents: "none" as "none", // Để không chặn các sự kiện camera
  };
  return (
    <div>
      <h1>QR Code Scanner</h1>

      {/* Button mở camera */}
      <button onClick={startScanning} disabled={isScanning}>
        {isScanning ? "Đang quét..." : "Mở Camera để quét"}
      </button>

      {/* Video element cho camera */}
      <video ref={videoRef} style={{ width: "100%" }} />
      {videoRef.current && <div style={overlayStyle}></div>}
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
