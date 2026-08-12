"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calculator, ChevronRight, CircleDollarSign, Download, HeartPulse, Menu, MoveRight, Ruler, Sparkles, Users, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const features = [
  { icon: Calculator, no: "01", title: "基础计算", text: "把日常计算装进口袋，打开就算，没有多余步骤。", tone: "blue" },
  { icon: Ruler, no: "02", title: "单位换算", text: "长度、重量、面积与温度，跨单位切换快而准确。", tone: "cyan" },
  { icon: HeartPulse, no: "03", title: "健康计算", text: "BMI、基础代谢与健康指标，读懂身体的日常数据。", tone: "rose" },
  { icon: CircleDollarSign, no: "04", title: "金融计算", text: "贷款、利息与收益测算，重要决定更有把握。", tone: "amber" },
  { icon: Sparkles, no: "05", title: "生活计算", text: "日期、年龄、时间和消费，琐碎数字一次理清。", tone: "violet" },
  { icon: Users, no: "06", title: "亲戚关系换算", text: "再复杂的称谓也不用猜，家庭聚会从容开口。", tone: "green" },
];

const scenes = [
  { emoji: "🥣", tag: "健康", title: "早餐热量", value: "486 kcal", note: "轻松掌握每日摄入" },
  { emoji: "🗺️", tag: "旅行", title: "距离换算", value: "12.4 mi", note: "陌生单位也能秒懂" },
  { emoji: "🏠", tag: "金融", title: "房贷月供", value: "¥ 4,862", note: "大事提前算清楚" },
  { emoji: "👪", tag: "家庭", title: "关系称谓", value: "表舅", note: "见面不再叫错人" },
];

function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`brand ${light ? "brand-light" : ""}`} aria-label="小算生活首页"><span className="brand-mark"><span>+</span><span>−</span></span><span><b>小算生活</b><small>XiaoSuanLife</small></span></Link>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  const links = [["首页", "#home"], ["功能", "#features"], ["特色", "#advantages"], ["场景", "#scenes"], ["关于", "#about"]];
  return <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}><div className="nav-inner"><Brand /><nav className={open ? "open" : ""}>{links.map(([n, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{n}</a>)}<Link href="/download" className="nav-download">立即下载 <Download size={15}/></Link></nav><button className="menu" aria-label={open ? "关闭菜单" : "打开菜单"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div></header>;
}

function Phone({ compact = false }: { compact?: boolean }) {
  return <div className={`phone ${compact ? "phone-compact" : ""}`}><div className="phone-bar"><span>9:41</span><span>● ◒</span></div><div className="phone-head"><div><small>下午好</small><b>今天想算点什么？</b></div><span className="avatar">算</span></div><div className="answer-card"><span>快速计算</span><strong>1,286<em>.50</em></strong><div>24 × 53.604</div></div><div className="phone-section"><span>常用工具</span><small>查看全部</small></div><div className="tool-grid">{features.slice(0, 4).map((f) => <div key={f.title} className={`mini-tool ${f.tone}`}><f.icon/><span>{f.title}</span></div>)}</div><div className="tip"><Sparkles/><span><b>每日小算</b><small>今天已为你节省 8 分钟</small></span></div><div className="phone-dock"><i/><i/><i/></div></div>;
}

export default function Home() {
  return <main><Navbar />
    <section className="hero" id="home"><div className="hero-grid"><motion.div className="hero-copy" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.7}}><div className="eyebrow"><span/> 为日常而生的计算工具</div><h1>生活中的数字，<br/><em>小算一下就好。</em></h1><p>从日常计算到复杂换算，小算生活帮你快速理清每一个数字，让选择更简单，让决定更从容。</p><div className="hero-actions"><Link className="primary-button" href="/download"><Download size={18}/>立即下载 App</Link><a className="text-button" href="#features">探索全部功能 <ArrowRight size={17}/></a></div><div className="trust-row"><span><b>6</b> 大工具分类</span><span><b>20+</b> 实用计算</span><span><b>0</b> 学习成本</span></div></motion.div><motion.div className="hero-visual" initial={{opacity:0,scale:.93}} animate={{opacity:1,scale:1}} transition={{duration:.8,delay:.1}}><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="float-pill pill-a"><Ruler/><span>100 cm<b>= 1 m</b></span></div><div className="float-pill pill-b"><HeartPulse/><span>BMI<b>21.8 正常</b></span></div><Phone/><div className="glow"/></motion.div></div><div className="scroll-note">向下探索 <span>↓</span></div></section>

    <section className="section" id="features"><div className="section-heading"><div><span className="kicker">ALL IN ONE</span><h2>一次 App，解决生活中的<br/>各种计算需求</h2></div><p>不追求堆砌功能，只把每一种常用计算做得<br/>直观、顺手、值得信赖。</p></div><div className="feature-grid">{features.map((f, i) => <motion.article className="feature-card" key={f.title} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-60px"}} transition={{delay:i*.05}}><div className={`icon-box ${f.tone}`}><f.icon/></div><span className="card-no">{f.no}</span><h3>{f.title}</h3><p>{f.text}</p><span className="card-link">了解更多 <ChevronRight/></span></motion.article>)}</div></section>

    <section className="advantages" id="advantages"><div className="section narrow"><span className="kicker light">WHY XIAOSUAN</span><h2>少一点复杂，<br/>多一点确定。</h2><div className="adv-grid">{[["01","简单易用","清晰的信息层级与自然操作路径，第一次打开也知道怎么用。"],["02","覆盖全面","从健康到金融，从工作到家庭，一站覆盖真实生活场景。"],["03","快速准确","精心校验计算逻辑，输入即得结果，每一次都清楚可靠。"]].map((a) => <div className="adv" key={a[0]}><strong>{a[0]}</strong><div><h3>{a[1]}</h3><p>{a[2]}</p></div></div>)}</div></div></section>

    <section className="product-showcase"><div className="showcase-copy"><span className="kicker">THE APP</span><h2>让计算，成为一种<br/>轻松的生活习惯。</h2><p>常用功能触手可及，计算结果清晰呈现。没有广告干扰，没有复杂学习，只有恰到好处的帮助。</p><ul><li><span>✓</span>轻量安装，打开即用</li><li><span>✓</span>关键信息一眼看懂</li><li><span>✓</span>为 Android 深度优化</li></ul><Link href="/download" className="text-button blue">查看 Android 版本 <MoveRight/></Link></div><div className="phone-stage"><div className="phone-back"><div className="fake-list"><b>全部工具</b>{features.slice(0,5).map(f=><span key={f.title}><f.icon/>{f.title}<ChevronRight/></span>)}</div></div><Phone compact/></div></section>

    <section className="section scenes" id="scenes"><div className="section-heading"><div><span className="kicker">EVERYDAY MOMENTS</span><h2>每个生活瞬间，<br/>都有小算在身边</h2></div><p>那些值得认真对待的小问题，<br/>交给小算，答案马上就来。</p></div><div className="scene-grid">{scenes.map((s,i)=><article className={`scene-card scene-${i+1}`} key={s.title}><div className="scene-top"><span className="scene-emoji">{s.emoji}</span><span className="scene-tag">{s.tag}</span></div><div><small>{s.title}</small><strong>{s.value}</strong><p>{s.note}</p></div></article>)}</div></section>

    <section className="download-band" id="download"><div className="download-inner"><div><span className="kicker light">DOWNLOAD</span><h2>现在，开始你的小算生活。</h2><p>Android 8.0 及以上系统 · 轻量、纯粹、免费使用</p></div><Link className="white-button" href="/download"><Download/>前往下载中心 <ArrowRight/></Link></div></section>

    <footer id="about"><div className="footer-top"><Brand light/><p>让复杂计算变简单，<br/>让生活决策更轻松。</p><div className="footer-links"><div><b>产品</b><a href="#features">核心功能</a><a href="#advantages">产品特色</a><Link href="/download">下载 App</Link></div><div><b>了解</b><a href="#about">关于我们</a><a href="mailto:hello@xiaosuan.life">联系我们</a><span>隐私政策</span></div></div></div><div className="footer-bottom"><span>© 2026 XiaoSuanLife. 保留所有权利。</span><span>认真计算 · 好好生活</span></div></footer>
  </main>;
}
