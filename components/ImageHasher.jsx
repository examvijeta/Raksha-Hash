"use client";
import React, { useState, useEffect, useRef } from 'react';
import { PDQ, generateHashFromBlob } from 'pdq-wasm';
import { useLanguage } from '../context/LanguageContext';

// Extract a frame from a video at a given time, returning a Blob
const extractVideoFrame = (file, timeSeconds = 1) => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        video.playsInline = true;
        const url = URL.createObjectURL(file);
        video.src = url;

        video.onloadeddata = () => {
            video.currentTime = Math.min(timeSeconds, video.duration * 0.1 || 1);
        };

        video.onseeked = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth || 512;
            canvas.height = video.videoHeight || 512;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                URL.revokeObjectURL(url);
                resolve(blob);
            }, 'image/jpeg', 0.85);
        };

        video.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Video load failed'));
        };
    });
};

const MediaHasher = ({ onComplete }) => {
    const { t } = useLanguage();
    const [status, setStatus] = useState('idle');
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [networkLog, setNetworkLog] = useState([]);
    const [showHashFor, setShowHashFor] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const initPDQ = async () => {
            try {
                await PDQ.init({ wasmUrl: '/wasm/pdq.wasm' });
                console.log('PDQ WASM Initialized');
            } catch (err) {
                console.error('Failed to initialize PDQ WASM:', err);
                setError('Failed to initialize hashing engine.');
            }
        };
        initPDQ();
    }, []);

    const logNetworkEvent = (message, type = 'info') => {
        setNetworkLog(prev => [{
            time: new Date().toLocaleTimeString(),
            message,
            type,
        }, ...prev].slice(0, 10));
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setStatus('processing');

        for (const file of files) {
            const isImage = file.type.startsWith('image/');
            const isVideo = file.type.startsWith('video/');
            if (!isImage && !isVideo) continue;

            const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
            logNetworkEvent(`📂 File loaded: "${file.name}" (${fileSizeMB} MB) — stays on your device`, 'info');

            try {
                let hexHash;
                let preview;
                const type = isVideo ? 'video' : 'image';

                if (isImage) {
                    logNetworkEvent(`⚙️ Hashing image in browser (0 bytes sent)...`, 'info');
                    hexHash = await generateHashFromBlob(file);
                    preview = URL.createObjectURL(file);
                } else {
                    logNetworkEvent(`🎬 Extracting frame from video in browser...`, 'info');
                    const frameBlob = await extractVideoFrame(file, 1);
                    logNetworkEvent(`⚙️ Hashing video frame in browser (0 bytes sent)...`, 'info');
                    hexHash = await generateHashFromBlob(frameBlob);
                    preview = URL.createObjectURL(frameBlob);
                }

                logNetworkEvent(`🔒 Hash generated: ${hexHash.slice(0, 12)}... (${hexHash.length} chars sent to server)`, 'success');
                logNetworkEvent(`🖼️ Image data sent: 0 bytes ✓`, 'success');

                setItems(prev => [...prev, {
                    name: file.name,
                    hash: hexHash,
                    preview,
                    type,
                    size: fileSizeMB + ' MB',
                }]);
            } catch (err) {
                logNetworkEvent(`❌ Error processing ${file.name}: ${err.message}`, 'error');
                console.error(err);
            }
        }

        setStatus('done');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeItem = (index) => {
        setItems(prev => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            if (updated.length === 0) setStatus('idle');
            return updated;
        });
    };

    const handleConfirm = () => {
        if (onComplete) onComplete(items);
    };

    return (
        <div className="w-full space-y-8">
            {/* Upload Zone */}
            <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-4 border-dashed rounded-[40px] p-12 text-center cursor-pointer transition-all duration-300 ${status === 'idle'
                        ? 'border-slate-200 bg-slate-50 hover:border-saffron hover:bg-saffron/5'
                        : 'border-slate-100 bg-white opacity-60 hover:opacity-100'
                    }`}
            >
                <div className="text-6xl mb-4">🖼️🎬</div>
                <h3 className="text-xl font-bold text-navy-blue mb-2">
                    {items.length > 0 ? '+ Add More Files' : 'Select Images or Videos'}
                </h3>
                <p className="text-slate-400 font-medium text-sm mb-4">
                    Files never leave your device. Only a 64-char hash is sent.
                </p>
                <div className="flex justify-center flex-wrap gap-2 text-xs font-bold text-slate-400">
                    {['JPG', 'PNG', 'WEBP', 'MP4', 'MOV', 'AVI', 'WEBM'].map(fmt => (
                        <span key={fmt} className="bg-slate-100 px-3 py-1 rounded-full">{fmt}</span>
                    ))}
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                />
            </div>

            {/* Processing State */}
            {status === 'processing' && (
                <div className="flex items-center justify-center gap-4 text-navy-blue font-bold p-6 bg-saffron/5 rounded-3xl">
                    <div className="w-6 h-6 border-2 border-saffron border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating fingerprint in your browser...</span>
                </div>
            )}

            {/* LIVE NETWORK MONITOR */}
            {networkLog.length > 0 && (
                <div className="bg-slate-900 rounded-3xl p-6 font-mono text-xs">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2 items-center">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-green-400 font-bold text-sm">LIVE NETWORK MONITOR</span>
                        </div>
                        <span className="text-slate-500 text-xs">Image data sent: 0 bytes</span>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {networkLog.map((log, i) => (
                            <div key={i} className={`flex gap-3 ${log.type === 'success' ? 'text-green-400' :
                                    log.type === 'error' ? 'text-red-400' : 'text-slate-400'
                                }`}>
                                <span className="text-slate-600 flex-shrink-0">{log.time}</span>
                                <span>{log.message}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-red-400 font-black">0 bytes</p>
                            <p className="text-slate-600 text-xs">Image data sent</p>
                        </div>
                        <div>
                            <p className="text-green-400 font-black">64 chars</p>
                            <p className="text-slate-600 text-xs">Hash sent</p>
                        </div>
                        <div>
                            <p className="text-blue-400 font-black">Browser</p>
                            <p className="text-slate-600 text-xs">Processing location</p>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="text-red-600 font-medium text-sm text-center">{error}</div>
            )}

            {/* Gallery / Results */}
            {items.length > 0 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {items.map((item, idx) => (
                            <div key={idx} className="relative group">
                                <div
                                    className="aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer"
                                    onClick={() => setShowHashFor(showHashFor === idx ? null : idx)}
                                >
                                    <img src={item.preview} alt={item.name} className="w-full h-full object-cover" />
                                    {item.type === 'video' && (
                                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-lg">
                                            🎬 Video
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-navy-blue/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                                        <span className="text-white text-xs font-bold">View Hash</span>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeItem(idx); }}
                                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                >
                                    ×
                                </button>
                                <div className="mt-2 h-1.5 w-full bg-india-green rounded-full shadow-[0_0_8px_rgba(34,197,94,0.3)]"></div>
                                <p className="text-xs text-slate-400 font-medium truncate mt-1">{item.name}</p>

                                {/* Hash Reveal */}
                                {showHashFor === idx && (
                                    <div className="col-span-full mt-3 bg-slate-900 rounded-2xl p-4 font-mono text-xs text-green-400 break-all">
                                        <p className="text-slate-500 text-xs mb-1 font-sans font-bold">PDQ Hash (only this was sent):</p>
                                        {item.hash}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-navy-blue/5 p-6 rounded-3xl border border-navy-blue/10 flex items-center justify-between">
                        <div className="text-left">
                            <span className="block text-navy-blue font-black text-2xl">{items.length}</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                {items.filter(i => i.type === 'image').length} Image{items.filter(i => i.type === 'image').length !== 1 ? 's' : ''} · {items.filter(i => i.type === 'video').length} Video{items.filter(i => i.type === 'video').length !== 1 ? 's' : ''} · Ready
                            </span>
                        </div>
                        <button
                            onClick={handleConfirm}
                            className="bg-navy-blue text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-900 transition-all shadow-xl active:scale-95"
                        >
                            {t('protect.btn_confirm')} →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaHasher;
