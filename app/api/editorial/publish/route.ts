import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const secret = process.env.EDITORIAL_API_SECRET || 'yojqi_editorial_secret_key_2026';

    if (!authHeader || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid editorial publishing secret token.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      slug,
      track = 'product_wisdom',
      titleEn,
      titleZh,
      summaryEn,
      summaryZh,
      directTakeawayEn,
      directTakeawayZh,
      featuredImage,
      contentHtmlEn,
      contentHtmlZh,
      fourStepPracticeEn,
      fourStepPracticeZh,
      relatedProductSlug,
      relatedPropertySlug,
    } = body;

    if (!slug || (!titleEn && !titleZh)) {
      return NextResponse.json(
        { error: 'Missing required article fields: slug and title are required.' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    if (supabase) {
      const { error: dbError } = await supabase.from('editorial_articles').upsert({
        slug,
        track,
        title_en: titleEn,
        title_zh: titleZh,
        summary_en: summaryEn,
        summary_zh: summaryZh,
        direct_takeaway_en: directTakeawayEn,
        direct_takeaway_zh: directTakeawayZh,
        featured_image: featuredImage,
        content_html_en: contentHtmlEn,
        content_html_zh: contentHtmlZh,
        four_step_practice_en: fourStepPracticeEn,
        four_step_practice_zh: fourStepPracticeZh,
        related_product_slug: relatedProductSlug,
        related_property_slug: relatedPropertySlug,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'slug' });

      if (dbError) {
        console.error('Supabase upsert error:', dbError);
        return NextResponse.json({ error: dbError.message }, { status: 500 });
      }
    }

    // On-demand revalidation of static routes
    revalidatePath('/en/wisdom');
    revalidatePath('/zh/wisdom');
    revalidatePath(`/en/wisdom/${slug}`);
    revalidatePath(`/zh/wisdom/${slug}`);
    revalidatePath('/en');
    revalidatePath('/zh');

    return NextResponse.json({
      success: true,
      message: 'Article published & ISR caches revalidated successfully.',
      slug,
    });
  } catch (error: any) {
    console.error('Editorial publish error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
