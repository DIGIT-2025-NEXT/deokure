// app/api/post/route.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('post')
      .select('id, image_url, tag_place_name, content, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return Response.json(data)
  } catch (error) {
    console.error('投稿取得エラー:', error)
    return Response.json({ error: '投稿の取得に失敗しました' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tag_place_name, content, image_url } = body

    // バリデーション
    if (!content) {
      return Response.json({ error: '内容は必須です' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('post')
      .insert([
        { 
          tag_place_name: tag_place_name || 'その他',
          content,
          image_url: image_url || null
        }
      ])
      .select()

    if (error) {
      throw error
    }

    return Response.json(data[0])
  } catch (error) {
    console.error('投稿作成エラー:', error)
    return Response.json({ error: '投稿の作成に失敗しました' }, { status: 500 })
  }
}