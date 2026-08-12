"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calculator, CalendarDays, ChevronRight, Download, HeartPulse, History, Menu, Ruler, ShieldCheck, Sparkles, Star, UserRound, Users, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const APK_URL = "/download/XiaoSuanLife-v1.2.3-debug.apk";
const tools = [
  { icon: Calculator, title: "标准计算器", sub: "日常计算", className: "orange" },
  { icon: Users, title: "亲戚关系换算", sub: "亲戚称呼", className: "yellow" },
  { icon: HeartPulse, title: "BMI 健康计算", sub: "健康指数", className: "coral" },
  { icon: Ruler, title: "单位转换", sub: "多种单位", className: "cream" },
];

function Logo({ inverse = false }: { inverse?: boolean }) {
  return <Link className={`logo ${inverse ? "inverse" : ""}`} href="/" aria-label="小算生活首页"><span className="logo-mascot"><i>●</i><i>●</i><b>⌣</b><em>+</em><em>−</em></span><span><strong>小算生活</strong><small>XiaoSuanLife</small></span></Link>;
}

function Navbar() {
  const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>18);fn();window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn)},[]);
  return <header className={`navbar ${scrolled?"is-scrolled":""}`}><div className="nav-inner"><Logo/><nav className={open?"open":""}><a href="#features" onClick={()=>setOpen(false)}>功能</a><a href="#screens" onClick={()=>setOpen(false)}>界面</a><a href="#story" onClick={()=>setOpen(false)}>特色</a><a href="#about" onClick={()=>setOpen(false)}>关于</a><a className="nav-download" href={APK_URL} download><Download/> 下载 v1.2.3</a></nav><button className="menu" onClick={()=>setOpen(!open)} aria-label={open?"关闭菜单":"打开菜单"}>{open?<X/>:<Menu/>}</button></div></header>;
}

function AppPhone() {
  return <div className="app-phone"><div className="phone-status"><span>9:30</span><span>◒ ▰</span></div><div className="phone-hero"><div><h3>小算生活</h3><p>XiaoSuanLife</p></div><div className="phone-mascot"><span>●　●</span><b>⌣</b><div>●　●　●</div><div>●　●　♥</div></div><Sparkles className="spark s1"/><Sparkles className="spark s2"/></div><div className="phone-search"><span>⌕　输入需要计算的问题</span><b>计算</b></div><div className="phone-tools">{tools.map(t=><div className="phone-tool" key={t.title}><span className={t.className}><t.icon/></span><div><b>{t.title}</b><small>{t.sub}</small></div></div>)}</div><div className="phone-banner"><div><b>小算生活，暖暖陪伴</b><span>让生活计算更简单 ✦</span></div><div className="mini-mascot">⌣<small>● ●</small></div></div><div className="phone-tabs"><span className="active"><span>◆</span>首页</span><span><History/>历史</span><span><Star/>收藏</span><span><UserRound/>我的</span></div></div>;
}

export default function Home(){return <main><Navbar/>
  <section className="hero" id="home"><div className="warm-blob blob-one"/><div className="warm-blob blob-two"/><div className="hero-inner"><motion.div className="hero-copy" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}}><span className="eyebrow"><Sparkles/> 小算生活 Android v1.2.3</span><h1>暖暖地，<br/>帮你算清生活<span>每一笔。</span></h1><p>从标准计算到亲戚称呼，从健康指标到单位转换。一个软萌、顺手又可靠的生活计算小助手。</p><div className="hero-actions"><a className="primary-button" href={APK_URL} download><Download/>立即下载 APK <small>17.27 MB</small></a><a className="text-button" href="#screens">看看 App 界面 <ArrowRight/></a></div><div className="download-proof"><ShieldCheck/><span><b>已接入真实安装包</b>支持 Android 8.0 及以上系统</span></div></motion.div><motion.div className="hero-visual" initial={{opacity:0,scale:.94,y:18}} animate={{opacity:1,scale:1,y:0}} transition={{duration:.8,delay:.1}}><div className="hero-ring ring-one"/><div className="hero-ring ring-two"/><AppPhone/><div className="float-note note-one"><HeartPulse/><span><b>BMI 22.2</b>健康范围</span></div><div className="float-note note-two"><Ruler/><span><b>10 米</b>= 0.01 千米</span></div></motion.div></div></section>

  <section className="features section" id="features"><div className="section-intro center"><span className="section-label">常用工具</span><h2>生活里常用的计算，<br/>打开就能找到</h2><p>清晰的分类、温暖的界面，每一步都简单好懂。</p></div><div className="feature-grid">{tools.map((t,i)=><motion.article className="feature-card" key={t.title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.07}}><span className={`feature-icon ${t.className}`}><t.icon/></span><small>0{i+1}</small><h3>{t.title}</h3><p>{i===0?"大字号结果与舒适按键，随手算一笔。":i===1?"复杂关系一步步梳理，称呼不再难猜。":i===2?"输入身高体重，快速了解 BMI 健康区间。":"长度、重量、面积、体积、温度轻松互换。"}</p><ChevronRight/></motion.article>)}</div></section>

  <section className="screens" id="screens"><div className="screens-inner"><div className="screen-copy"><span className="section-label">真实 App 界面</span><h2>网站与 App，<br/>从里到外都是同一种温度。</h2><p>官网现在完整继承了小算生活的奶油白、暖橙渐变、圆润卡片与软萌陪伴感，让用户第一眼就能认出你的产品。</p><div className="screen-points"><span><b>01</b>暖橙奶油配色</span><span><b>02</b>大圆角轻卡片</span><span><b>03</b>真实功能展示</span></div><a className="outline-button" href={APK_URL} download>下载体验完整功能 <ArrowRight/></a></div><div className="showcase-image"><img src="/app-showcase.png" alt="小算生活 v1.2.3 全部 App 界面展示"/><div className="image-caption"><Sparkles/><span><b>小算生活 v1.2.3</b>你提供的真实产品界面</span></div></div></div></section>

  <section className="story section" id="story"><div className="story-card"><div className="story-mascot"><div className="mascot-screen"><i/> <i/><b>⌣</b></div><div className="mascot-keys"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div><div className="story-copy"><span className="section-label">为什么是小算</span><h2>少一点冷冰冰，<br/>多一点暖暖陪伴。</h2><p>计算工具也可以有温度。小算把复杂的数字藏在简单操作之后，让每一次计算都更轻松、更安心。</p><div className="story-stats"><span><b>4+</b>核心场景</span><span><b>17.27</b>MB 安装包</span><span><b>8.0+</b>Android</span></div></div></div></section>

  <section className="download-band" id="download"><div><span className="section-label light">现在就下载</span><h2>让小算陪你，<br/>算清生活每一笔。</h2><p>小算生活 XiaoSuanLife v1.2.3 · Android 安装包</p></div><div className="band-actions"><a className="white-button" href={APK_URL} download><Download/>直接下载 APK <ArrowRight/></a><Link href="/download">查看版本详情与二维码</Link></div></section>

  <footer id="about"><div className="footer-top"><Logo inverse/><p>暖暖地，帮你算清生活每一笔。</p><div><a href="#features">核心功能</a><a href="#screens">App 界面</a><a href={APK_URL} download>下载 v1.2.3</a><Link href="/download">下载中心</Link></div></div><div className="footer-bottom"><span>© 2026 XiaoSuanLife</span><span>认真计算 · 暖暖生活</span></div></footer>
</main>}
