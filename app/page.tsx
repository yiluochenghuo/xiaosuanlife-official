"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calculator, CalendarDays, ChevronLeft, ChevronRight, Download, HeartPulse, History, Landmark, Menu, Ruler, Search, ShieldCheck, Star, UserRound, Users, WalletCards, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const APK="/download/XiaoSuanLife-v1.2.3-debug.apk";
const tools=[
 {icon:Calculator,title:"基础计算器",desc:"日常四则与百分比运算",shot:"calculator"},
 {icon:Landmark,title:"房贷计算",desc:"月供、利息与还款总额",shot:"mortgage"},
 {icon:WalletCards,title:"个税计算",desc:"工资个人所得税估算",shot:"tax"},
 {icon:WalletCards,title:"利息计算",desc:"存款与理财收益估算",shot:"interest"},
 {icon:HeartPulse,title:"BMI 计算",desc:"体重指数与健康提示",shot:"bmi"},
 {icon:HeartPulse,title:"热量计算",desc:"基础代谢与每日消耗",shot:"calories"},
 {icon:WalletCards,title:"汇率转换",desc:"常用国际货币换算",shot:"exchange"},
 {icon:Ruler,title:"单位转换",desc:"长度、重量与温度",shot:"home"},
 {icon:CalendarDays,title:"年龄计算",desc:"出生年月日、周岁与生肖",shot:"age"},
 {icon:Users,title:"亲戚关系换算",desc:"中国亲属关系图谱推导",shot:"relation"},
];
const gallery=[
 ["home","工具首页"],["calculator","标准计算器"],["mortgage","房贷计算"],["tax","工资个税"],["bmi","BMI 健康"],["relation","亲戚换算"],["history","历史记录"],["favorites","我的收藏"],["profile","个人中心"],["exchange","汇率转换"],["calories","热量计算"],["age","年龄计算"],["interest","利息计算"]
];

function Logo({dark=false}:{dark?:boolean}){return <Link href="/" className={`logo ${dark?"dark":""}`}><span className="logo-box">±</span><span><b>小算生活</b><small>XiaoSuanLife</small></span></Link>}
function Nav(){const[open,setOpen]=useState(false),[scroll,setScroll]=useState(false);useEffect(()=>{const f=()=>setScroll(window.scrollY>20);f();addEventListener("scroll",f);return()=>removeEventListener("scroll",f)},[]);return <header className={scroll?"nav scrolled":"nav"}><div className="nav-inner"><Logo/><nav className={open?"open":""}><a href="#tools" onClick={()=>setOpen(false)}>全部工具</a><a href="#screens" onClick={()=>setOpen(false)}>真实界面</a><a href="#system" onClick={()=>setOpen(false)}>产品能力</a><a href="#about" onClick={()=>setOpen(false)}>关于</a><a className="nav-cta" href={APK} download><Download/>下载 v1.2.3</a></nav><button className="menu" onClick={()=>setOpen(!open)} aria-label="菜单">{open?<X/>:<Menu/>}</button></div></header>}

function Phone(){return <div className="phone-shell"><div className="phone-screen"><img src="/screens/home.jpg" alt="小算生活工具首页"/></div></div>}

export default function Home(){const[active,setActive]=useState(0);const prev=()=>setActive((active-1+gallery.length)%gallery.length),next=()=>setActive((active+1)%gallery.length);return <main><Nav/>
 <section className="hero"><div className="hero-grain"/><div className="hero-inner"><motion.div className="hero-copy" initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.65}}><div className="version-pill"><span/> Android v1.2.3 已开放下载</div><h1>把生活里的计算，<br/><em>一次装进口袋。</em></h1><p>从基础计算、房贷个税，到健康管理与亲戚称呼。小算生活把 10+ 种常用工具做得清晰、轻巧、随手可用。</p><div className="hero-actions"><a href={APK} download className="primary"><Download/>下载 Android APK <small>17.27 MB</small></a><a href="#screens" className="secondary">查看真实界面 <ArrowRight/></a></div><div className="hero-proof"><span><b>10+</b>计算工具</span><span><b>31</b>历史记录</span><span><b>100%</b>本地存储</span></div></motion.div><motion.div className="hero-product" initial={{opacity:0,scale:.93,x:20}} animate={{opacity:1,scale:1,x:0}} transition={{duration:.75}}><div className="phone-halo"/><Phone/><div className="floating-card one"><Landmark/><span><b>房贷计算</b>月供 ¥4,490.45</span></div><div className="floating-card two"><HeartPulse/><span><b>BMI 22.49</b>健康状态正常</span></div></motion.div></div></section>

 <section className="tools section" id="tools"><div className="section-head"><div><span className="label">TOOLBOX</span><h2>一个 App，覆盖<br/>真实生活的每种计算</h2></div><p>工具不只多，更重要的是每一个都能真正解决问题。<br/>数据输入、结果展示与重要说明一目了然。</p></div><div className="tool-grid">{tools.map((t,i)=><motion.article key={t.title} className="tool-card" initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:(i%5)*.04}}><span className="tool-icon"><t.icon/></span><small>{String(i+1).padStart(2,"0")}</small><h3>{t.title}</h3><p>{t.desc}</p><span className="tool-arrow"><ArrowRight/></span></motion.article>)}</div></section>

 <section className="screens-section" id="screens"><div className="screens-wrap"><div className="screens-copy"><span className="label">REAL PRODUCT</span><h2>13 张真实界面，<br/>这才是小算生活。</h2><p>每一张展示都来自你提供的 v1.2.3 App：统一的暖米色背景、珊瑚橙操作色、深棕文字，以及清晰的大圆角结果卡片。</p><div className="screen-count"><b>{String(active+1).padStart(2,"0")}</b><span>/ {gallery.length}</span><em>{gallery[active][1]}</em></div><div className="slider-buttons"><button onClick={prev} aria-label="上一张"><ChevronLeft/></button><button onClick={next} aria-label="下一张"><ChevronRight/></button></div></div><div className="screen-slider"><div className="screen-phone main"><img src={`/screens/${gallery[active][0]}.jpg`} alt={`小算生活 ${gallery[active][1]}界面`}/></div><button className="peek prev" onClick={prev} aria-label="上一张预览"><img src={`/screens/${gallery[(active-1+gallery.length)%gallery.length][0]}.jpg`} alt=""/></button><button className="peek next" onClick={next} aria-label="下一张预览"><img src={`/screens/${gallery[(active+1)%gallery.length][0]}.jpg`} alt=""/></button></div></div><div className="screen-dots">{gallery.map((g,i)=><button key={g[0]} className={i===active?"active":""} onClick={()=>setActive(i)} aria-label={`查看${g[1]}`}/>)}</div></section>

 <section className="system section" id="system"><div className="section-head"><div><span className="label">MORE THAN CALCULATE</span><h2>不止算出答案，<br/>也替你留住重要结果</h2></div></div><div className="system-grid"><article className="system-card orange"><History/><div><span>01</span><h3>历史记录</h3><p>自动保留每一次计算，房贷、BMI、热量与换算结果随时回看。</p></div><img src="/screens/history.jpg" alt="历史记录界面"/></article><article className="system-card yellow"><Star/><div><span>02</span><h3>收藏工具</h3><p>常用工具一键收藏，把自己的计算入口放在最顺手的位置。</p></div><img src="/screens/favorites.jpg" alt="收藏界面"/></article><article className="system-card cream"><UserRound/><div><span>03</span><h3>隐私与个性</h3><p>数据只存本机，支持主题与提醒设置，使用记录由你掌控。</p></div><img src="/screens/profile.jpg" alt="个人中心界面"/></article></div></section>

 <section className="numbers"><div><span><b>10+</b>实用计算工具</span><span><b>165+</b>汇率币种信息</span><span><b>337</b>地级行政区选择</span><span><b>0</b>云端隐私上传</span></div></section>

 <section className="download-cta"><div><span className="label light">DOWNLOAD NOW</span><h2>现在，开始你的小算生活。</h2><p>小算生活 XiaoSuanLife v1.2.3 · 支持 Android 8.0+</p></div><div><a href={APK} download className="white-button"><Download/>直接下载 APK <ArrowRight/></a><Link href="/download">查看二维码与版本校验</Link></div></section>

 <footer id="about"><div className="footer-top"><Logo dark/><p>暖暖地，帮你算清生活每一笔。</p><div><a href="#tools">全部工具</a><a href="#screens">真实界面</a><a href={APK} download>下载 App</a><Link href="/download">下载中心</Link></div></div><div className="footer-bottom"><span>© 2026 XiaoSuanLife</span><span>数据仅存本机 · 认真计算，安心生活</span></div></footer>
 </main>}
