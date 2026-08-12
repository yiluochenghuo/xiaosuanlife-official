import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "小算生活 XiaoSuanLife - 智能生活计算助手",
  description: "小算生活是一款轻量级生活计算工具 App，提供基础计算、单位转换、健康计算、金融计算、生活计算与亲戚关系换算。",
  keywords: ["生活计算", "计算器App", "单位转换", "健康计算", "贷款计算"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "小算生活 · 生活中的数字，小算一下就好", description: "为日常而生的智能生活计算助手", type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "小算生活 XiaoSuanLife", description: "生活中的数字，小算一下就好。", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
