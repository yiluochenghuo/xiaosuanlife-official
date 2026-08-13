
"use client";

import { ArrowLeft, Check, Download, ShieldCheck, Smartphone } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

type Version={version:string;apk:string;size:string;update:string;sha256:string;description:string[];available:boolean};
const fallback:Version={version:"1.2.4",apk:"XiaoSuanLife-v1.2.4-debug.apk",size:"17.27 MB",update:"2026-08-13",sha256:"311559C3A668468AB11BB1ABE4E27636E53B37C25CC037C26BC295900033F937",available:true,description:["修复标准计算器等号后显示公式而非数值的问题","优化连续计算与重新输入的交互","保留全部生活计算、健康和亲戚关系功能"]};

export default function DownloadPage(){const[info,setInfo]=useState(fallback);useEffect(()=>{fetch("/version.json").then(r=>r.json()).then(setInfo).catch(()=>{})},[]);const apkUrl=`/download/${info.apk}`;const qr=typeof window==="undefined"?apkUrl:`${window.location.origin}${apkUrl}`;return <main className="download-page"><div className="download-nav"><Link href="/"><ArrowLeft/>返回官网</Link><span>小算生活 · v{info.version}</span></div><div className="download-shell"><section className="download-copy"><span className="section-label">ANDROID APP</span><h1>小算生活<br/><em>暖暖陪你算。</em></h1><p>扫描二维码或点击按钮，直接下载你提供的 Android 安装包。</p><div className="meta-row"><span><Smartphone/>Android 8.0+</span><span><ShieldCheck/>SHA-256 已校验</span></div></section><section className="download-card"><div className="app-identity"><img className="app-icon" src="/xiaosuan-app-icon.png" alt="小算生活 App 图标"/><div><h2>小算生活</h2><p>XiaoSuanLife v{info.version}</p></div></div><div className="version-grid"><div><small>安装包大小</small><b>{info.size}</b></div><div><small>更新时间</small><b>{info.update}</b></div><div><small>支持系统</small><b>Android 8.0+</b></div><div><small>版本状态</small><b>可下载</b></div></div><a className="apk-button" href={apkUrl} download={info.apk}><Download/>下载 APK 安装包</a><div className="qr-panel"><div className="qr-wrap"><QRCodeSVG value={qr} size={112} fgColor="#6d321b" bgColor="#fffdf8"/></div><div><b>手机扫码下载</b><p>打开手机相机扫描二维码，直接获取 v{info.version} 安装包。</p></div></div><div className="release-notes"><h3>本次版本</h3>{info.description.map(x=><p key={x}><Check/>{x}</p>)}</div><p className="hash">SHA-256<br/><span>{info.sha256}</span></p></section></div><div className="download-foot">© 2026 XiaoSuanLife · 暖暖地，帮你算清生活每一笔</div></main>}
