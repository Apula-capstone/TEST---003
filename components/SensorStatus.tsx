
import React from 'react';
import { SensorData, SensorStatus } from '../types';

interface Props {
  sensors: SensorData[];
}

const SensorStatusPanel: React.FC<Props> = ({ sensors }) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:gap-4">
      {sensors.map((sensor) => {
        const isFire = sensor.status === SensorStatus.FIRE_DETECTED;
        const isReady = sensor.status === SensorStatus.READY || sensor.status === SensorStatus.INITIALIZING;
        
        return (
          <div 
            key={sensor.id} 
            className={`kahoot-card rounded-[20px] md:rounded-[25px] p-4 md:p-6 border-b-4 md:border-b-8 transition-all ${
              isFire 
                ? 'bg-red-600 border-red-800 animate-pulse' 
                : 'bg-orange-500 border-orange-700'
            }`}
          >
            <div className="flex justify-between items-start mb-3 md:mb-4">
              <div>
                <h3 className="text-[8px] md:text-xs font-black text-orange-100 uppercase tracking-widest mb-1">Flame Sensor</h3>
                <h2 className="text-xl md:text-3xl font-black text-white">{sensor.name}</h2>
              </div>
              <div className={`p-2 md:p-3 rounded-lg md:rounded-xl shadow-lg ${isFire ? 'bg-white' : 'bg-orange-600'}`}>
                <i className={`fa-solid ${isFire ? 'fa-fire-burner text-red-600' : 'fa-microchip text-white'} text-lg md:text-2xl`}></i>
              </div>
            </div>

            <div className="bg-black/20 rounded-xl md:rounded-2xl p-3 md:p-4 mb-3 md:mb-4 backdrop-blur-sm border border-white/5">
              <div className="flex justify-between items-center mb-1.5 md:mb-2">
                <span className="text-[8px] md:text-[10px] font-black uppercase text-orange-200">Intensity</span>
                <span className="text-lg md:text-xl font-black text-white">{sensor.value}%</span>
              </div>
              <div className="w-full bg-black/40 h-2 md:h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-700 ease-out ${isFire ? 'bg-white shadow-[0_0_10px_white]' : 'bg-amber-400'}`}
                  style={{ width: `${sensor.value}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center gap-2">
              <div className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-[8px] md:text-xs font-black uppercase flex items-center gap-1.5 md:gap-2 shadow-sm ${
                isFire ? 'bg-white text-red-600' : 'bg-orange-800 text-orange-200'
              }`}>
                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isFire ? 'bg-red-600 status-pulse' : isReady ? 'bg-green-400' : 'bg-stone-500'}`}></div>
                {sensor.status}
              </div>
              <span className="text-[8px] md:text-[10px] font-bold text-orange-200 uppercase opacity-60 truncate">
                {sensor.lastUpdated}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SensorStatusPanel;
