export async function getUserData(supabase) {
    return await supabase
        .from('users')
        .select()
        .single()
}