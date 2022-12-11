import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const fontRegular = fetch(
  new URL("../../public/assets/RedHatDisplay-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const fontSemiBold = fetch(
  new URL("../../public/assets/RedHatDisplay-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const fontBold = fetch(
  new URL("../../public/assets/RedHatDisplay-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const fontRegularData = await fontRegular;
  const fontSemiBoldData = await fontSemiBold;
  const fontBoldData = await fontBold;

  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle && searchParams.get("title")?.slice(0, 100);

    const hasSubtitle = searchParams.has("subtitle");
    const subtitle = hasSubtitle && searchParams.get("subtitle")?.slice(0, 100);

    return new ImageResponse(
      (
        <div tw="h-full w-full flex flex-col items-center justify-center bg-slate-300">
          <div
            tw="flex flex-row items-center"
            style={{
              marginBottom: title ? "8rem" : "0rem",
            }}
          >
            <div tw="h-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 32 32"
                fill="none"
                stroke="#BE123C"
                opacity={0.4}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
              </svg>
            </div>
            <h1
              tw="h-full mx-2 text-7xl text-center text-slate-800"
              style={{ fontFamily: "Red Hat Display Bold" }}
            >
              Kfir&apos;s Blog
            </h1>
            <div tw="h-full flex items-center justify-center ml-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 32 32"
                fill="none"
                stroke="#BE123C"
                opacity={0.4}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
              </svg>
            </div>
          </div>

          <div
            tw="text-5xl text-slate-800 text-center mb-4"
            style={{ fontFamily: "Red Hat Display SemiBold" }}
          >
            {title}
          </div>

          <div
            tw="text-2xl text-slate-800 text-center"
            style={{ fontFamily: "Red Hat Display" }}
          >
            {subtitle}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Red Hat Display",
            data: fontRegularData,
            style: "normal",
          },
          {
            name: "Red Hat Display SemiBold",
            data: fontSemiBoldData,
            style: "normal",
          },
          {
            name: "Red Hat Display Bold",
            data: fontBoldData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
