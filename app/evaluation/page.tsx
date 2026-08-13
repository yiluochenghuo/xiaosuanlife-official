
"use client";

import { useMemo, useState } from "react";
import "./evaluation.css";

type Tab = "home" | "tools" | "history" | "favorites" | "profile";
type Category = "全部" | "财务" | "健康" | "生活" | "转换";
type RecordItem = { id:number; tool:string; input:string; result:string; time:string };
type Tool = { id:string; name:string; desc:string; category:Exclude<Category,"全部">; icon:string };

const tools:Tool[] = [
  {id:"calculator",name:"基础计算器",desc:"日常四则与百分比计算",category:"生活",icon:"⌗"},
  {id:"mortgage",name:"房贷计算",desc:"月供、利息与还款总额",category:"财务",icon:"⌂"},
  {id:"tax",name:"个税计算",desc:"快速估算个人所得税",category:"财务",icon:"¥"},
  {id:"interest",name:"利息计算",desc:"存款与投资收益估算",category:"财务",icon:"%"},
  {id:"bmi",name:"BMI健康计算",desc:"评估体重与健康区间",category:"健康",icon:"♥"},
  {id:"calorie",name:"热量计算",desc:"估算每日基础代谢",category:"健康",icon:"♨"},
  {id:"currency",name:"汇率转换",desc:"常用国际货币换算",category:"转换",icon:"↔"},
  {id:"unit",name:"单位换算",desc:"长度、重量、温度等",category:"转换",icon:"⇄"},
  {id:"date",name:"日期计算",desc:"计算两个日期间隔",category:"生活",icon:"▣"},
  {id:"age",name:"年龄计算",desc:"根据出生日期计算年龄",category:"生活",icon:"◷"},
  {id:"relationship",name:"亲戚关系换算",desc:"快速算出亲戚称呼",category:"生活",icon:"亲"},
];
const fmt=(n:number)=>n.toLocaleString("zh-CN",{maximumFractionDigits:2});

export default function App(){
  const [tab,setTab]=useState<Tab>("home"),[category,setCategory]=useState<Category>("全部"),[query,setQuery]=useState("");
  const [active,setActive]=useState<Tool|null>(null),[favorites,setFavorites]=useState(["mortgage","bmi","currency"]),[dark,setDark]=useState(false),[notice,setNotice]=useState(true);
  const [history,setHistory]=useState<RecordItem[]>([
    {id:3,tool:"BMI健康计算",input:"170cm / 60kg",result:"BMI 20.76 · 正常",time:"今天 10:28"},
    {id:2,tool:"房贷计算",input:"100万元 / 30年 / 3.85%",result:"月供 ¥4,687.14",time:"昨天 18:42"},
    {id:1,tool:"汇率转换",input:"100 USD → CNY",result:"¥720.00",time:"8月9日 09:16"},
  ]);
  const filtered=useMemo(()=>tools.filter(t=>(category==="全部"||t.category===category)&&(t.name+t.desc).includes(query)),[category,query]);
  const record=(tool:string,input:string,result:string)=>setHistory(h=>[{id:Date.now(),tool,input,result,time:"刚刚"},...h]);
  const toggle=(id:string)=>setFavorites(f=>f.includes(id)?f.filter(x=>x!==id):[...f,id]);
  return <main className={dark?"app dark":"app"}>
    <aside><Brand/><Navigation tab={tab} setTab={setTab}/><div className="aside-note"><small>轻量 · 准确 · 本地</small><b>让生活计算更简单</b></div></aside>
    <section className="workspace">
      {tab==="home"&&<Home query={query} setQuery={setQuery} history={history} open={setActive}/>} 
      {tab==="tools"&&<Tools category={category} setCategory={setCategory} query={query} setQuery={setQuery} items={filtered} open={setActive} favorites={favorites} toggle={toggle}/>} 
      {tab==="history"&&<History data={history} setData={setHistory} open={setActive}/>} 
      {tab==="favorites"&&<Favorites ids={favorites} toggle={toggle} open={setActive}/>} 
      {tab==="profile"&&<Profile history={history.length} favorites={favorites.length} dark={dark} setDark={setDark} notice={notice} setNotice={setNotice}/>} 
    </section>
    <div className="bottom"><Navigation tab={tab} setTab={setTab}/></div>
    {active&&<ToolPanel tool={active} close={()=>setActive(null)} record={record} favorite={favorites.includes(active.id)} toggle={()=>toggle(active.id)}/>} 
  </main>
}

function Brand(){return <div className="brand"><img src="/xiaosuan-app-icon.png" alt="小算生活图标"/><div><b>小算生活</b><small>在线测评版 · v1.2.4</small></div></div>}
function Navigation({tab,setTab}:{tab:Tab;setTab:(t:Tab)=>void}){const nav:[Tab,string,string][]=[["home","⌂","首页"],["tools","▦","工具"],["history","◷","历史"],["favorites","♡","收藏"],["profile","○","我的"]];return <nav>{nav.map(([id,icon,label])=><button key={id} className={tab===id?"active":""} onClick={()=>setTab(id)}><i>{icon}</i><span>{label}</span></button>)}</nav>}
function Title({eyebrow,title,text,action}:{eyebrow:string;title:string;text:string;action?:React.ReactNode}){return <header className="title"><div><small>{eyebrow}</small><h1>{title}</h1><p>{text}</p></div>{action}</header>}

function Home({query,setQuery,history,open}:{query:string;setQuery:(v:string)=>void;history:RecordItem[];open:(t:Tool)=>void}){const hot=query?tools.filter(t=>(t.name+t.desc).includes(query)):[tools[10],...tools.slice(0,7)];return <div className="page home">
  <header className="hero"><div><small>XIAOSUANLIFE · 生活计算工具箱</small><h1>暖暖地，<br/>帮你算清生活每一笔。</h1><p>从基础计算、房贷个税，到健康管理与亲戚称呼。暖橙奶油风格，和 v1.2.4 App 保持一致。</p></div><div className="orbit"><b><img src="/xiaosuan-app-icon.png" alt="小算生活"/></b><i>¥</i><i>%</i><i>↔</i></div></header>
  <label className="search">⌕<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索计算工具，例如：房贷、BMI、汇率"/></label>
  <Section top="QUICK START" title="快捷入口"><div className="quick"><Quick icon="亲" title="亲戚称呼" text="关系再绕也不怕叫错" onClick={()=>open(tools.find(t=>t.id==="relationship")!)}/><Quick icon="⌗" title="快速计算" text="立即开始四则运算" onClick={()=>open(tools.find(t=>t.id==="calculator")!)}/><Quick icon="↔" title="单位转换" text="长度、重量与温度" onClick={()=>open(tools.find(t=>t.id==="unit")!)}/></div></Section>
  <Section top="POPULAR TOOLS" title={query?"搜索结果":"热门工具"}><div className="grid">{hot.map(t=><ToolCard key={t.id} tool={t} open={()=>open(t)}/>)}</div></Section>
  <Section top="RECENT" title="最近使用"><div className="recent">{history.slice(0,3).map(r=><div key={r.id}><span>◷</span><p><b>{r.tool}</b><small>{r.input}</small></p><strong>{r.result}</strong></div>)}</div></Section>
  </div>}
function Section({top,title,children}:{top:string;title:string;children:React.ReactNode}){return <section><div className="section-title"><div><small>{top}</small><h2>{title}</h2></div></div>{children}</section>}
function Quick({icon,title,text,onClick}:{icon:string;title:string;text:string;onClick:()=>void}){return <button className="quick-card" onClick={onClick}><span>{icon}</span><p><b>{title}</b><small>{text}</small></p><i>→</i></button>}
function ToolCard({tool,open,favorite,toggle}:{tool:Tool;open:()=>void;favorite?:boolean;toggle?:()=>void}){return <article className="tool-card"><button onClick={open}><span className="tool-icon">{tool.icon}</span><b>{tool.name}</b><small>{tool.desc}</small><em>{tool.category}</em><i>↗</i></button>{toggle&&<button className={favorite?"fav on":"fav"} onClick={toggle}>{favorite?"♥":"♡"}</button>}</article>}

function Tools({category,setCategory,query,setQuery,items,open,favorites,toggle}:{category:Category;setCategory:(c:Category)=>void;query:string;setQuery:(s:string)=>void;items:Tool[];open:(t:Tool)=>void;favorites:string[];toggle:(id:string)=>void}){const cats:Category[]=["全部","财务","健康","生活","转换"];return <div className="page"><Title eyebrow="TOOLBOX" title="全部工具" text="为你的每个生活决策，准备一把趁手的计算尺。"/><div className="controls"><div className="tabs">{cats.map(c=><button key={c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div><label className="mini-search">⌕<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索工具"/></label></div><div className="grid">{items.map(t=><ToolCard key={t.id} tool={t} open={()=>open(t)} favorite={favorites.includes(t.id)} toggle={()=>toggle(t.id)}/>)}</div>{!items.length&&<Empty icon="⌕" title="没有找到工具" text="换一个关键词试试吧"/>}</div>}
function History({data,setData,open}:{data:RecordItem[];setData:(d:RecordItem[])=>void;open:(t:Tool)=>void}){return <div className="page"><Title eyebrow="YOUR RECORDS" title="计算历史" text="每一次结果都清晰可追溯。" action={data.length?<button className="clear" onClick={()=>setData([])}>清空记录</button>:undefined}/>{data.length?<div className="history">{data.map(r=><article key={r.id}><span className="tool-icon">◷</span><p><b>{r.tool}</b><small>{r.time} · {r.input}</small></p><strong>{r.result}</strong><button onClick={()=>{const t=tools.find(x=>x.name===r.tool);if(t)open(t)}}>重新计算</button><button className="x" onClick={()=>setData(data.filter(x=>x.id!==r.id))}>×</button></article>)}</div>:<Empty icon="◷" title="暂无计算记录" text="完成一次计算后，结果会自动保存在这里"/>}</div>}
function Favorites({ids,toggle,open}:{ids:string[];toggle:(id:string)=>void;open:(t:Tool)=>void}){const items=tools.filter(t=>ids.includes(t.id));return <div className="page"><Title eyebrow="FAVORITES" title="我的收藏" text="常用工具，一键直达。"/>{items.length?<div className="grid">{items.map(t=><ToolCard key={t.id} tool={t} open={()=>open(t)} favorite toggle={()=>toggle(t.id)}/>)}</div>:<Empty icon="♡" title="还没有收藏" text="前往工具中心，点击爱心收藏常用工具"/>}</div>}
function Empty({icon,title,text}:{icon:string;title:string;text:string}){return <div className="empty"><span>{icon}</span><b>{title}</b><p>{text}</p></div>}

function Profile({history,favorites,dark,setDark,notice,setNotice}:{history:number;favorites:number;dark:boolean;setDark:(v:boolean)=>void;notice:boolean;setNotice:(v:boolean)=>void}){return <div className="page"><Title eyebrow="PROFILE" title="我的" text="你的计算足迹与偏好设置。"/><div className="profile"><span>小</span><p><b>小算用户</b><small>让每一次计算更简单</small></p><em>在线测评</em></div><div className="stats"><div><b>{history}</b><small>使用次数</small></div><div><b>{favorites}</b><small>收藏数量</small></div><div><b>{history}</b><small>历史数量</small></div></div><section className="settings"><h2>设置</h2><Setting icon="◉" title="通知设置" text="接收实用工具与更新提醒"><Switch value={notice} set={setNotice}/></Setting><Setting icon="◐" title="深色主题" text="切换更舒适的夜间显示"><Switch value={dark} set={setDark}/></Setting><Setting icon="◇" title="隐私设置" text="计算数据仅保存在当前设备"><i>›</i></Setting><Setting icon="ⓘ" title="关于小算生活" text="XiaoSuanLife 1.2.4 在线测评版"><i>›</i></Setting></section></div>}
function Setting({icon,title,text,children}:{icon:string;title:string;text:string;children:React.ReactNode}){return <div className="setting"><span>{icon}</span><p><b>{title}</b><small>{text}</small></p>{children}</div>}
function Switch({value,set}:{value:boolean;set:(v:boolean)=>void}){return <button className={value?"switch on":"switch"} onClick={()=>set(!value)}><i/></button>}

function ToolPanel({tool,close,record,favorite,toggle}:{tool:Tool;close:()=>void;record:(t:string,i:string,r:string)=>void;favorite:boolean;toggle:()=>void}){return <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}><div className="panel"><header><button onClick={close}>←</button><span className="tool-icon">{tool.icon}</span><p><small>{tool.category}工具</small><b>{tool.name}</b></p><button className={favorite?"heart on":"heart"} onClick={toggle}>{favorite?"♥":"♡"}</button></header><Calculator tool={tool} record={record}/></div></div>}
function Calculator({tool,record}:{tool:Tool;record:(t:string,i:string,r:string)=>void}){if(tool.id==="calculator")return <Basic record={record}/>;if(tool.id==="mortgage")return <Mortgage record={record}/>;if(tool.id==="bmi")return <Bmi record={record}/>;if(tool.id==="currency")return <Currency record={record}/>;if(tool.id==="unit")return <Unit record={record}/>;if(tool.id==="relationship")return <Relationship record={record}/>;return <Simple tool={tool} record={record}/>}

const relations=[{key:"father",label:"爸爸"},{key:"mother",label:"妈妈"},{key:"elderBrother",label:"哥哥"},{key:"youngerBrother",label:"弟弟"},{key:"elderSister",label:"姐姐"},{key:"youngerSister",label:"妹妹"},{key:"husband",label:"丈夫"},{key:"wife",label:"妻子"},{key:"son",label:"儿子"},{key:"daughter",label:"女儿"}];
const relationshipNames:Record<string,string>={
  father:"爸爸",mother:"妈妈",elderBrother:"哥哥",youngerBrother:"弟弟",elderSister:"姐姐",youngerSister:"妹妹",husband:"丈夫",wife:"妻子",son:"儿子",daughter:"女儿",
  "father>father":"爷爷","father>mother":"奶奶","mother>father":"外公","mother>mother":"外婆",
  "father>elderBrother":"伯父","father>youngerBrother":"叔叔","father>elderSister":"姑妈","father>youngerSister":"姑妈",
  "mother>elderBrother":"舅舅","mother>youngerBrother":"舅舅","mother>elderSister":"姨妈","mother>youngerSister":"姨妈",
  "husband>father":"公公","husband>mother":"婆婆","wife>father":"岳父","wife>mother":"岳母",
  "elderBrother>son":"侄子","youngerBrother>son":"侄子","elderBrother>daughter":"侄女","youngerBrother>daughter":"侄女",
  "elderSister>son":"外甥","youngerSister>son":"外甥","elderSister>daughter":"外甥女","youngerSister>daughter":"外甥女",
  "son>wife":"儿媳","daughter>husband":"女婿",
  "father>elderBrother>son":"堂兄弟","father>youngerBrother>son":"堂兄弟","father>elderBrother>daughter":"堂姐妹","father>youngerBrother>daughter":"堂姐妹",
  "father>elderSister>son":"表兄弟","father>youngerSister>son":"表兄弟","mother>elderBrother>son":"表兄弟","mother>youngerBrother>son":"表兄弟","mother>elderSister>son":"表兄弟","mother>youngerSister>son":"表兄弟",
  "father>elderSister>daughter":"表姐妹","father>youngerSister>daughter":"表姐妹","mother>elderBrother>daughter":"表姐妹","mother>youngerBrother>daughter":"表姐妹","mother>elderSister>daughter":"表姐妹","mother>youngerSister>daughter":"表姐妹"
};
function Relationship({record}:{record:(t:string,i:string,r:string)=>void}){const [chain,setChain]=useState<typeof relations>([]),[result,setResult]=useState("");const description=chain.length?"我的"+chain.map(x=>`的${x.label}`).join(""):"请选择一位亲戚";const calculate=()=>{const out=relationshipNames[chain.map(x=>x.key).join(">") ]||"关系较远，建议按关系链逐级确认";setResult(out);record("亲戚关系换算",description,out)};return <Form><div className="relation-path"><small>关系链</small><b>{description}</b></div><div className="relation-actions"><b>选择关系</b><span><button onClick={()=>{setChain(c=>c.slice(0,-1));setResult("")}} disabled={!chain.length}>退格</button><button onClick={()=>{setChain([]);setResult("")}} disabled={!chain.length}>清空</button></span></div><div className="relation-grid">{relations.map(item=><button key={item.key} disabled={chain.length>=4} onClick={()=>{setChain(c=>[...c,item]);setResult("")}}>{item.label}</button>)}</div><Run onClick={calculate}>算出称呼</Run>{result&&<Result title="应该称呼" value={result} detail={description}/>}<p className="relation-tip">示例：爸爸 → 妹妹 → 儿子 = 表兄弟</p></Form>}
function Basic({record}:{record:(t:string,i:string,r:string)=>void}){const [exp,setExp]=useState(""),[out,setOut]=useState("0");const keys=["C","⌫","%","÷","7","8","9","×","4","5","6","−","1","2","3","+","00","0",".","="];const press=(k:string)=>{if(k==="C"){setExp("");setOut("0")}else if(k==="⌫")setExp(exp.slice(0,-1));else if(k==="="){try{const safe=exp.replace(/×/g,"*").replace(/÷/g,"/").replace(/−/g,"-").replace(/(\d+(?:\.\d+)?)%/g,"($1/100)");if(!/^[\d+\-*/().\s]+$/.test(safe))throw 0;const value=Function(`"use strict";return (${safe})`)();const result=fmt(value);setOut(result);record("基础计算器",exp,result)}catch{setOut("输入有误")}}else setExp(exp+k)};return <div className="calc"><div className="display"><small>计算过程</small><p>{exp||"0"}</p><b>{out}</b></div><div className="keypad">{keys.map(k=><button key={k} onClick={()=>press(k)}>{k}</button>)}</div></div>}
function Mortgage({record}:{record:(t:string,i:string,r:string)=>void}){const [a,setA]=useState("100"),[y,setY]=useState("30"),[rate,setRate]=useState("3.85"),[result,setResult]=useState<{m:number;i:number;t:number}>();const run=()=>{const p=+a*10000,n=+y*12,r=+rate/1200,f=(1+r)**n,m=p*r*f/(f-1),t=m*n;setResult({m,i:t-p,t});record("房贷计算",`${a}万元 / ${y}年 / ${rate}%`,`月供 ¥${fmt(m)}`)};return <Form><div className="segments"><button className="active">商业贷款</button><button>公积金贷款</button></div><Field label="贷款金额" value={a} set={setA} unit="万元"/><Field label="贷款年限" value={y} set={setY} unit="年"/><Field label="年利率" value={rate} set={setRate} unit="%"/><Run onClick={run}>开始计算</Run>{result&&<Result title="等额本息月供" value={`¥ ${fmt(result.m)}`} detail={`总利息 ¥${fmt(result.i)} · 总还款 ¥${fmt(result.t)}`}/>}</Form>}
function Bmi({record}:{record:(t:string,i:string,r:string)=>void}){const [h,setH]=useState("170"),[w,setW]=useState("60"),[result,setResult]=useState<{n:number;s:string}>();const run=()=>{const n=+w/(+h/100)**2,s=n<18.5?"偏瘦":n<24?"正常":n<28?"超重":"肥胖";setResult({n,s});record("BMI健康计算",`${h}cm / ${w}kg`,`BMI ${n.toFixed(2)} · ${s}`)};return <Form><Field label="身高" value={h} set={setH} unit="cm"/><Field label="体重" value={w} set={setW} unit="kg"/><Run onClick={run}>计算 BMI</Run>{result&&<Result title={`BMI 指数 · ${result.s}`} value={result.n.toFixed(2)} detail={result.s==="正常"?"保持规律运动与均衡饮食，你做得很好。":"建议结合饮食与运动制定健康管理计划。"}/>}</Form>}
function Currency({record}:{record:(t:string,i:string,r:string)=>void}){const rates:Record<string,number>={USD:1,CNY:7.2,EUR:.92,JPY:147.5};const [a,setA]=useState("100"),[from,setFrom]=useState("USD"),[to,setTo]=useState("CNY"),[result,setResult]=useState<number>();const run=()=>{const n=+a/rates[from]*rates[to];setResult(n);record("汇率转换",`${a} ${from} → ${to}`,`${fmt(n)} ${to}`)};return <Form><Field label="金额" value={a} set={setA} unit={from}/><div className="selects"><Select value={from} set={setFrom} options={Object.keys(rates)}/><button onClick={()=>{setFrom(to);setTo(from)}}>⇄</button><Select value={to} set={setTo} options={Object.keys(rates)}/></div><Run onClick={run}>立即换算</Run>{result!==undefined&&<Result title="换算结果" value={`${fmt(result)} ${to}`} detail={`1 ${from} = ${fmt(rates[to]/rates[from])} ${to} · 模拟汇率`}/>}</Form>}
function Unit({record}:{record:(t:string,i:string,r:string)=>void}){const rates:Record<string,number>={米:1,公里:1000,厘米:.01};const [a,setA]=useState("1"),[from,setFrom]=useState("米"),[to,setTo]=useState("公里"),[result,setResult]=useState<number>();const run=()=>{const n=+a*rates[from]/rates[to];setResult(n);record("单位换算",`${a}${from} → ${to}`,`${fmt(n)} ${to}`)};return <Form><div className="segments"><button className="active">长度</button><button>重量</button><button>温度</button></div><Field label="数值" value={a} set={setA} unit={from}/><div className="selects"><Select value={from} set={setFrom} options={Object.keys(rates)}/><span>→</span><Select value={to} set={setTo} options={Object.keys(rates)}/></div><Run onClick={run}>开始换算</Run>{result!==undefined&&<Result title="换算结果" value={`${fmt(result)} ${to}`} detail={`${a} ${from}`}/>}</Form>}
function Simple({tool,record}:{tool:Tool;record:(t:string,i:string,r:string)=>void}){const date=tool.id==="date"||tool.id==="age";const [a,setA]=useState(date?"1995-01-01":"10000"),[b,setB]=useState(tool.id==="date"?"2026-08-11":"3"),[out,setOut]=useState("");const run=()=>{let r="";if(tool.id==="interest")r=`预估利息 ¥${fmt(+a*+b*.025)}`;else if(tool.id==="tax")r=`预估月税额 ¥${fmt(Math.max(0,(+a-5000)*.03))}`;else if(tool.id==="date")r=`相差 ${Math.abs(Math.round((new Date(b).getTime()-new Date(a).getTime())/86400000))} 天`;else if(tool.id==="age")r=`当前 ${new Date().getFullYear()-new Date(a).getFullYear()} 岁`;else r=`基础代谢约 ${fmt(10*+a+6.25*170-5*+b)} 千卡`;setOut(r);record(tool.name,`${a} / ${b}`,r)};return <Form><Field label={date?tool.id==="age"?"出生日期":"开始日期":tool.id==="calorie"?"体重":"金额 / 收入"} value={a} set={setA} unit={tool.id==="calorie"?"kg":""} type={date?"date":"number"}/>{tool.id!=="age"&&<Field label={tool.id==="date"?"结束日期":tool.id==="calorie"?"年龄":"期限"} value={b} set={setB} unit={tool.id==="calorie"?"岁":tool.id==="date"?"":"年"} type={tool.id==="date"?"date":"number"}/>}<Run onClick={run}>开始计算</Run>{out&&<Result title="计算结果" value={out} detail="结果仅供日常估算参考"/>}</Form>}
function Form({children}:{children:React.ReactNode}){return <div className="form">{children}</div>}
function Field({label,value,set,unit,type="number"}:{label:string;value:string;set:(v:string)=>void;unit:string;type?:string}){return <label className="field"><span>{label}</span><div><input type={type} value={value} onChange={e=>set(e.target.value)}/><em>{unit}</em></div></label>}
function Select({value,set,options}:{value:string;set:(v:string)=>void;options:string[]}){return <select value={value} onChange={e=>set(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select>}
function Run({children,onClick}:{children:React.ReactNode;onClick:()=>void}){return <button className="run" onClick={onClick}>{children}<span>→</span></button>}
function Result({title,value,detail}:{title:string;value:string;detail:string}){return <div className="result"><small>{title}</small><b>{value}</b><p>{detail}</p></div>}
