// app/api/post/route.ts
import { createClient } from '@supabase/supabase-js'

// 環境変数のチェック
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl ? '設定済み' : '未設定')
console.log('Supabase Key:', supabaseKey ? '設定済み' : '未設定')

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase環境変数が設定されていません')
}

const supabase = createClient(supabaseUrl!, supabaseKey!)

export async function GET() {
  console.log('GET /api/post が呼ばれました')
  
  try {
    // まずSupabaseの接続確認
    const { data: testData, error: testError } = await supabase
      .from('posts')
      .select('count', { count: 'exact', head: true })
    
    if (testError) {
      console.error('Supabase接続テストエラー:', testError)
      return Response.json({ 
        error: 'データベース接続エラー',
        details: testError.message,
        code: testError.code 
      }, { status: 500 })
    }

    console.log('Supabase接続OK, レコード数:', testData)

    // 実際のデータ取得
    const { data, error } = await supabase
      .from('posts')
      .select('id, image_url, tag_place_name, content, created_at')
      .order('created_at', { ascending: false })
      .limit(50) // とりあえず制限をかける

    if (error) {
      console.error('データ取得エラー:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      
      return Response.json({ 
        error: 'データ取得に失敗しました',
        details: error.message,
        code: error.code,
        hint: error.hint
      }, { status: 500 })
    }

    console.log('取得されたデータ件数:', data?.length || 0)
    console.log('最初のレコード:', data?.[0])

    // dataがnullの場合は空配列を返す
    const posts = data || []
    
    return Response.json(posts)
    
  } catch (error) {
    console.error('予期しないエラー:', error)
    
    return Response.json({ 
      error: '予期しないエラーが発生しました',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  console.log('POST /api/post が呼ばれました')
  
  try {
    const body = await request.json()
    console.log('リクエストボディ:', body)
    
    const { tag_place_name, content, image_url } = body

    // バリデーション
    if (!content) {
      return Response.json({ error: '内容は必須です' }, { status: 400 })
    }

    const insertData = { 
      tag_place_name: tag_place_name || 'その他',
      content,
      image_url: image_url || null
    }
    
    console.log('挿入予定データ:', insertData)

    const { data, error } = await supabase
      .from('posts')
      .insert([insertData])
      .select()

    if (error) {
      console.error('挿入エラー:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      
      return Response.json({ 
        error: '投稿の作成に失敗しました',
        details: error.message,
        code: error.code
      }, { status: 500 })
    }

    console.log('挿入成功:', data)
    return Response.json(data[0])
    
  } catch (error) {
    console.error('POST予期しないエラー:', error)
    
    return Response.json({ 
      error: '予期しないエラーが発生しました',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}