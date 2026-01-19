
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import CameraFeed from './components/CameraFeed';
import SensorStatusPanel from './components/SensorStatus';
import Statistics from './components/Statistics';
import ArduinoConnect from './components/ArduinoConnect';
import AlarmSystem from './components/AlarmSystem';
import LoadingScreen from './components/LoadingScreen';
import { SensorData, SensorStatus, HistoryPoint, ConnectionState } from './types';

const INITIAL_SENSORS: SensorData[] = [
  { id: '1', name: 'Alpha Sensor', value: 0, status: SensorStatus.NOT_READY, lastUpdated: 'Disconnected' },
  { id: '2', name: 'Beta Sensor', value: 0, status: SensorStatus.NOT_READY, lastUpdated: 'Disconnected' },
  { id: '3', name: 'Gamma Sensor', value: 0, status: SensorStatus.NOT_READY, lastUpdated: 'Disconnected' },
];

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [sensors, setSensors] = useState<SensorData[]>(INITIAL_SENSORS);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [fireIncidentCount, setFireIncidentCount] = useState(0);
  const [connection, setConnection] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [isTestActive, setIsTestActive] = useState(false);
  
  const serialPortRef = useRef<any>(null);
  const readerRef = useRef<any>(null);
  const fireInCurrentTurn = useRef(false);

  const handleLoadingFinished = () => {
    setIsLoading(false);
    // Smooth transition delay
    setTimeout(() => setShowDashboard(true), 50);
  };

  useEffect(() => {
    const fireDetected = sensors.some(s => s.status === SensorStatus.FIRE_DETECTED);
    if (fireDetected && !isAlarmActive && !fireInCurrentTurn.current) {
      setIsAlarmActive(true);
      setFireIncidentCount(prev => prev + 1);
      fireInCurrentTurn.current = true;
    } else if (!fireDetected) {
      fireInCurrentTurn.current = false;
    }
  }, [sensors, isAlarmActive]);

  const processSerialData = useCallback((data: string) => {
    const cleanData = data.trim();
    if (isTestActive) return;

    // Handle "SENSORS:1,0,1" format (0=fire, 1=no fire)
    if (cleanData.startsWith("SENSORS:")) {
      const payload = cleanData.replace("SENSORS:", "");
      const values = payload.split(',').map(v => parseInt(v.trim(), 10));
      
      if (values.length >= 3) {
        setSensors(prev => prev.map((s, i) => {
          const rawVal = values[i]; // 0 or 1
          if (isNaN(rawVal)) return s;

          // Arduino: 0 = Fire, 1 = No Fire
          // UI: 100% = Fire, 0% = No Fire
          const intensity = rawVal === 0 ? 100 : 0;
          const status = rawVal === 0 ? SensorStatus.FIRE_DETECTED : SensorStatus.SAFE;
          
          return {
            ...s,
            value: intensity,
            status,
            lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          };
        }));
      }
    }
    
    // Also handle individual "FIRE:SensorX:250" messages
    if (cleanData.startsWith("FIRE:")) {
      const parts = cleanData.split(':'); // ["FIRE", "Sensor1", "250"]
      if (parts.length >= 2) {
        const sensorName = parts[1];
        setSensors(prev => prev.map(s => {
          if (s.name.includes(sensorName) || (sensorName === "Sensor1" && s.id === "1") || (sensorName === "Sensor2" && s.id === "2") || (sensorName === "Sensor3" && s.id === "3")) {
            return {
              ...s,
              value: 100,
              status: SensorStatus.FIRE_DETECTED,
              lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            };
          }
          return s;
        }));
      }
    }
  }, [isTestActive]);

  const connectArduino = async () => {
    if (!("serial" in navigator)) {
      alert("Please use Chrome or Edge on Desktop to use the Serial connection.");
      return;
    }
    setConnection(ConnectionState.CONNECTING);
    try {
      const port = await (navigator as any).serial.requestPort();
      await port.open({ baudRate: 9600 });
      serialPortRef.current = port;
      setConnection(ConnectionState.CONNECTED);
      
      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      readerRef.current = reader;
      
      setSensors(prev => prev.map(s => ({ ...s, status: SensorStatus.INITIALIZING })));

      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) {
          buffer += value;
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() || '';
          lines.forEach(line => processSerialData(line));
        }
      }
    } catch (err) {
      console.error(err);
      setConnection(ConnectionState.ERROR);
    }
  };

  const disconnectArduino = async () => {
    try {
      if (readerRef.current) await readerRef.current.cancel();
      if (serialPortRef.current) await serialPortRef.current.close();
    } catch (e) {}
    setConnection(ConnectionState.DISCONNECTED);
    setSensors(INITIAL_SENSORS);
    setIsTestActive(false);
  };

  const triggerTestAlarm = () => {
    setIsTestActive(true);
    setSensors(prev => prev.map((s, i) => i === 0 ? { 
      ...s, 
      value: 100, 
      status: SensorStatus.FIRE_DETECTED,
      lastUpdated: 'TEST_MODE'
    } : s));
  };

  const acknowledgeAlarm = () => {
    setIsAlarmActive(false);
    if (isTestActive) {
      setIsTestActive(false);
      if (connection === ConnectionState.CONNECTED) {
        setSensors(prev => prev.map(s => ({ ...s, status: SensorStatus.READY })));
      } else {
        setSensors(INITIAL_SENSORS);
      }
    }
  };

  useEffect(() => {
    const point: HistoryPoint = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      alpha: sensors[0].value,
      beta: sensors[1].value,
      gamma: sensors[2].value
    };
    setHistory(prev => [...prev.slice(-19), point]);
  }, [sensors]);

  if (isLoading) return <LoadingScreen onFinished={handleLoadingFinished} />;

  return (
    <div className={`transition-all duration-1000 ease-out transform ${showDashboard ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
      <AlarmSystem isActive={isAlarmActive} onAcknowledge={acknowledgeAlarm} />
      <div className="max-w-[1600px] mx-auto px-4 pb-12 overflow-x-hidden">
        <Header />
        
        <main className="mt-6 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-start">
          {/* Main Monitor Area */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4 md:gap-8">
            <div className="h-[280px] sm:h-[450px] md:h-[550px] xl:h-[650px] w-full">
              <CameraFeed />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              <ArduinoConnect 
                state={connection} 
                onConnect={connectArduino} 
                onDisconnect={disconnectArduino} 
              />
              <Statistics data={history} fireCount={fireIncidentCount} />
            </div>
          </div>

          {/* Controls & Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 md:gap-6 lg:sticky lg:top-8">
            <div className={`rounded-[30px] md:rounded-[40px] p-6 md:p-10 border-b-[8px] md:border-b-[12px] transition-all flex items-center justify-between shadow-2xl relative overflow-hidden ${
              sensors.some(s => s.status === SensorStatus.FIRE_DETECTED) 
              ? 'bg-red-700 border-red-900 animate-pulse' 
              : connection === ConnectionState.CONNECTED ? 'bg-emerald-600 border-emerald-800' : 'bg-stone-800 border-stone-900'
            }`}>
               <div className="text-white relative z-10">
                  <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-1 opacity-70">Detection Status</h3>
                  <p className="text-xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                    {sensors.some(s => s.status === SensorStatus.FIRE_DETECTED) ? 'EXTREME ALERT' : connection === ConnectionState.CONNECTED ? 'GUARD ACTIVE' : 'SYSTEM IDLE'}
                  </p>
               </div>
               <i className={`fa-solid ${sensors.some(s => s.status === SensorStatus.FIRE_DETECTED) ? 'fa-radiation' : 'fa-shield-halved'} text-3xl md:text-6xl text-white opacity-80`}></i>
            </div>

            <SensorStatusPanel sensors={sensors} />
            
            <div className="bg-stone-900 rounded-[30px] md:rounded-[40px] p-6 md:p-10 border-b-[8px] md:border-b-[12px] border-stone-950 flex flex-col gap-4 md:gap-6 shadow-xl">
              <h4 className="text-[10px] md:text-xs font-black text-stone-500 uppercase tracking-widest border-l-4 border-orange-600 pl-3">Emergency Control Unit</h4>
              
              <button 
                className="w-full bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black py-4 md:py-6 rounded-2xl md:rounded-[30px] border-b-8 border-red-800 transition-all uppercase flex items-center justify-center gap-3 text-sm md:text-xl shadow-lg"
                onClick={triggerTestAlarm}
              >
                <i className="fa-solid fa-fire-extinguisher"></i>
                Simulate Panic
              </button>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <button 
                  onClick={() => setFireIncidentCount(0)}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-400 font-black py-3 md:py-4 rounded-xl md:rounded-[20px] border-b-4 border-stone-950 transition-all uppercase text-[10px] md:text-xs"
                >
                  Clear Logs
                </button>
                <button 
                  onClick={() => setSensors(INITIAL_SENSORS)}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-400 font-black py-3 md:py-4 rounded-xl md:rounded-[20px] border-b-4 border-stone-950 transition-all uppercase text-[10px] md:text-xs"
                >
                  Hard Reset
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-white/5 text-center text-stone-600">
          <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-4">APULA // Automated Prevention Unit for Lethal Ablaze</p>
          <div className="flex justify-center items-center gap-4 md:gap-8 opacity-20 text-xl">
             <i className="fa-solid fa-microchip"></i>
             <div className="h-px w-12 bg-stone-700"></div>
             <i className="fa-solid fa-satellite-dish"></i>
             <div className="h-px w-12 bg-stone-700"></div>
             <i className="fa-solid fa-shield-halved"></i>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
