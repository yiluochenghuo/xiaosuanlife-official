"use client";

import { ArrowLeft, Check, Download, FileDown, ShieldCheck, Smartphone } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

type Version = { version:string; apk:string; size:string; update:string; description:string[]; available?:boolean };

export default function DownloadPage() {
  const [info,setInfo]=useState<Version>({version:"1.0.0",apk:"xiaosuanlife.apk",size:"待发布",update:"2026-08-12",description:["新增基础计算","新增单位转换","优化用户体验"],available:false});
  useEffect(()=>{fetch("/version.json").then(r=>r.json()).then(setInfo).catch(()=>{})},[]);
  const apkUrl = `/download/${info.apk}`;
  const qrValue = typeof window === "undefined" ? apkUrl : `${window.location.origin}${apkUrl}`;
  return <main className="download-page"><div className="download-nav"><Link href="/"><ArrowLeft/> 返回官网</Link><span className="mini-brand"><i>±</i> 小算生活</span></div><div className="download-layout"><section className="download-copy"><span className="kicker">ANDROID APP</span><h1>把生活里的计算，<br/><em>装进口袋。</em></h1><p>小算生活 Android 版，一次下载，随时解决日常数字问题。</p><div className="meta-row"><span><Smartphone/> Android 8.0+</span><span><ShieldCheck/> 安全轻量</span></div></section><section className="download-card"><div className="app-identity"><div className="app-icon">±</div><div><h2>小算生活</h2><p>XiaoSuanLife · v{info.version}</p></div></div><div className="version-grid"><div><small>安装包大小</small><b>{info.size}</b></div><div><small>更新时间</small><b>{info.update}</b></div><div><small>支持系统</small><b>Android 8.0+</b></div><div><small>当前版本</small><b>v{info.version}</b></div></div>{info.available ? <a className="apk-button" href={apkUrl} download><Download/>下载 APK</a> : <button className="apk-button disabled" disabled><FileDown/>安装包即将开放</button>}<div className="qr-panel"><div className="qr-wrap"><QRCodeSVG value={qrValue} size={110} fgColor="#10213f"/></div><div><b>手机扫码下载</b><p>{info.available ? "使用手机相机扫码，直接获取安装包" : "APK 发布后二维码将自动生效"}</p></div></div><div className="release-notes"><h3>本次更新</h3>{info.description.map(x=><p key={x}><Check/>{x}</p>)}</div></section></div><div className="download-foot">© 2026 XiaoSuanLife · 认真计算，好好生活</div></main>;
}
