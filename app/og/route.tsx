import { type PageConfig } from 'next';
import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import colors from 'tailwindcss/colors';

import { blogConfig } from '@/config';

export const config: PageConfig = {
  runtime: 'edge',
};

const fontRegular = fetch(
  new URL('../../public/assets/RedHatDisplay-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

const fontSemiBold = fetch(
  new URL('../../public/assets/RedHatDisplay-SemiBold.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

const fontBold = fetch(
  new URL('../../public/assets/RedHatDisplay-Bold.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  const fontRegularData = await fontRegular;
  const fontSemiBoldData = await fontSemiBold;
  const fontBoldData = await fontBold;

  const accentColor = blogConfig.theme?.accentColor?.light || colors.rose[700];

  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>&subtitle=<subtitle>
    const hasTitle = searchParams.has('title');
    const title = hasTitle && searchParams.get('title')?.slice(0, 100);
    const hasSubtitle = searchParams.has('subtitle');
    const subtitle = hasSubtitle && searchParams.get('subtitle')?.slice(0, 100);

    return new ImageResponse(
      (
        <div tw="h-full w-full flex flex-col items-center justify-center bg-slate-300">
          <div
            tw="flex flex-row items-center text-7xl"
            style={{
              marginBottom: title ? '8rem' : '0rem',
              fontFamily: 'Red Hat Display',
            }}
          >
            {blogConfig.titleParts && (
              <div style={{ color: accentColor }}>‹</div>
            )}
            <h1
              tw="mx-0.5 font-semibold text-center text-slate-800"
              style={{
                fontFamily: 'Red Hat Display Bold',
              }}
            >
              {blogConfig.titleParts ? (
                <>
                  {blogConfig.titleParts[0]}
                  <span
                    tw="px-px font-light"
                    style={{
                      fontFamily: 'Red Hat Display',
                      color: accentColor,
                    }}
                  >
                    /
                  </span>
                  {blogConfig.titleParts[1]}
                </>
              ) : (
                blogConfig.title
              )}
            </h1>
            {blogConfig.titleParts && (
              <div style={{ color: accentColor }}>›</div>
            )}
          </div>

          <div
            tw="text-5xl text-slate-800 text-center mb-4"
            style={{ fontFamily: 'Red Hat Display SemiBold' }}
          >
            {title}
          </div>

          <div
            tw="text-2xl text-slate-800 text-center"
            style={{ fontFamily: 'Red Hat Display' }}
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
            name: 'Red Hat Display',
            data: fontRegularData,
            style: 'normal',
          },
          {
            name: 'Red Hat Display SemiBold',
            data: fontSemiBoldData,
            style: 'normal',
          },
          {
            name: 'Red Hat Display Bold',
            data: fontBoldData,
            style: 'normal',
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response('Failed to generate the image', {
      status: 500,
    });
  }
}
