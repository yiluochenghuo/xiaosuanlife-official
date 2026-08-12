import type { Metadata } from "next";
import "./globals.css";

export const metadata:Metadata={
  title:"小算生活 XiaoSuanLife - 暖暖的生活计算助手",
  description:"小算生活是一款暖心轻量的 Android 生活计算工具，提供标准计算、亲戚关系换算、BMI 健康计算与单位转换。",
  keywords:["小算生活","生活计算器","亲戚关系换算","BMI计算","单位转换"],
  icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"},
  openGraph:{title:"小算生活 · 把生活里的计算一次装进口袋",description:"15 张真实界面，11+ 种计算工具，一次下载随时使用。",type:"website",images:["/og.png"]},
  twitter:{card:"summary_large_image",title:"小算生活 XiaoSuanLife",description:"把生活里的计算，一次装进口袋。",images:["/og.png"]}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}
