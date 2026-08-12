import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ version:"1.0.0", apkUrl:"/download/xiaosuanlife.apk", forceUpdate:false, available:false, description:["新增基础计算","新增单位转换","优化用户体验"] });
}
