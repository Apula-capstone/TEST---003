
import React, { useState, useRef, useEffect } from 'react';
import { CameraSource } from '../types';

const CameraFeed: React.FC = () => {
  const [source, setSource] = useState<CameraSource>(CameraSource.WEBCAM);
  const [rtspUrl, setRtspUrl] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (source === CameraSource.WEBCAM) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(err => console.error("Webcam Access Error:", err));
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
  }, [source]);

  const sourceColors: Record<CameraSource, string> = {
    [CameraSource.WIFI]: 'bg-blue-500',
    [CameraSource.BLUETOOTH]: 'bg-purple-500',
    [CameraSource.WEBCAM]: 'bg-emerald-500',
    [CameraSource.RTSP]: 'bg-amber-500'
  };

  return (
    <div className="bg-stone-900 rounded-[25px] md:rounded-[30px] overflow-hidden border-4 md:border-8 border-orange-500 shadow-2xl h-full flex flex-col">
      <div className="p-3 md:p-4 bg-stone-800 flex flex-col sm:flex-row gap-3 md:gap-4 justify-between items-center border-b-4 border-stone-700">
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full status-pulse ${source === CameraSource.WEBCAM ? 'bg-red-500' : 'bg-stone-500'}`}></div>
          <span className="text-[10px] md:text-sm font-black uppercase text-stone-300 tracking-tighter">Live // {source.split(' ')[0]}</span>
        </div>
        <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
          {Object.values(CameraSource).map(src => (
            <button
              key={src}
              onClick={() => setSource(src)}
              className={`px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase transition-all ${
                source === src ? `${sourceColors[src]} text-white scale-105` : 'bg-stone-700 text-stone-500 hover:bg-stone-600'
              }`}
            >
              {src.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
      
      {source === CameraSource.RTSP && (
        <div className="p-2 md:p-3 bg-stone-800 border-b-4 border-stone-900 flex flex-col xs:flex-row gap-2">
          <input 
            type="text" 
            placeholder="RTSP URI"
            value={rtspUrl}
            onChange={(e) => setRtspUrl(e.target.value)}
            className="flex-grow bg-black border border-stone-700 text-orange-500 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs"
          />
          <button className="bg-orange-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl font-black text-[10px] md:text-xs uppercase">Connect</button>
        </div>
      )}

      <div className="relative flex-grow bg-black flex items-center justify-center min-h-[150px]">
        {source === CameraSource.WEBCAM ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-stone-600 p-6 text-center">
            <i className={`fa-solid ${source === CameraSource.WIFI ? 'fa-wifi' : source === CameraSource.BLUETOOTH ? 'fa-bluetooth' : 'fa-network-wired'} text-4xl md:text-7xl mb-4 md:mb-6 animate-pulse`}></i>
            <p className="font-black text-lg md:text-2xl uppercase tracking-tighter">Awaiting {source}</p>
            <p className="text-[10px] md:text-sm font-bold opacity-50 mt-2 uppercase max-w-[200px] md:max-w-none">Check connection and interface settings</p>
          </div>
        )}
        
        <div className="absolute top-2 left-2 md:top-4 md:left-4 pointer-events-none">
          <div className="bg-red-600 text-white px-2 py-0.5 md:px-3 md:py-1 text-[8px] md:text-xs font-black rounded md:rounded-lg mb-1 md:mb-2 shadow-lg italic">SIGNAL ACTIVE</div>
          <div className="bg-black/80 text-white px-1.5 py-0.5 md:px-2 md:py-1 text-[8px] md:text-[10px] font-black rounded font-mono border border-white/10 hidden xs:block">
            FPS: 60.0 • RAW_COL
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraFeed;
