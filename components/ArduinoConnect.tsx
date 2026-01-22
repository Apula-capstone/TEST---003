
import React from 'react';
import { ConnectionState } from '../types';

interface Props {
  state: ConnectionState;
  onConnect: () => void;
  onDisconnect: () => void;
  label?: string;
}

const ArduinoConnect: React.FC<Props> = ({ state, onConnect, onDisconnect, label }) => {
  const isConnected = state === ConnectionState.CONNECTED;
  const isConnecting = state === ConnectionState.CONNECTING;

  return (
    <div className="bg-stone-900 rounded-[25px] md:rounded-[30px] p-5 md:p-6 border-4 md:border-8 border-orange-600 shadow-2xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-orange-600 p-2 rounded-lg md:rounded-xl shadow-lg">
            <i className="fa-solid fa-microchip text-white text-lg md:text-xl"></i>
          </div>
          <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">{label || 'Arduino UNO'}</h2>
        </div>
        <div className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase transition-colors ${
          isConnected ? 'bg-emerald-500 text-white' : 'bg-stone-700 text-stone-400'
        }`}>
          {state}
        </div>
      </div>

      <div className="bg-black/40 rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/5 mb-4 flex-grow">
        <p className="text-[8px] md:text-xs text-stone-500 font-bold mb-2 uppercase tracking-widest">Serial I/O Params</p>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="bg-stone-800/50 p-2 rounded-lg">
            <span className="text-[8px] block text-stone-600 font-black">BAUD</span>
            <span className="text-xs md:text-sm font-bold text-orange-400">9600</span>
          </div>
          <div className="bg-stone-800/50 p-2 rounded-lg">
            <span className="text-[8px] block text-stone-600 font-black">PORT</span>
            <span className="text-xs md:text-sm font-bold text-orange-400">USB-S</span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-2">
        {!isConnected ? (
          <button
            onClick={onConnect}
            disabled={isConnecting}
            className="w-full bg-orange-600 hover:bg-orange-500 active:scale-95 disabled:bg-stone-700 text-white font-black py-3 md:py-4 rounded-xl md:rounded-2xl border-b-4 border-orange-800 transition-all uppercase flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm"
          >
            {isConnecting ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <i className="fa-solid fa-plug"></i>
            )}
            {isConnecting ? 'Linking...' : 'Connect Hardware'}
          </button>
        ) : (
          <button
            onClick={onDisconnect}
            className="w-full bg-stone-800 hover:bg-stone-700 active:scale-95 text-red-500 font-black py-3 md:py-4 rounded-xl md:rounded-2xl border-b-4 border-stone-950 transition-all uppercase flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm"
          >
            <i className="fa-solid fa-power-off"></i>
            Kill Connection
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-stone-600 text-[8px] md:text-[10px] font-bold italic">
        <i className="fa-solid fa-shield-check"></i>
        <span>Authenticated Hardware Sync</span>
      </div>
    </div>
  );
};

export default ArduinoConnect;
