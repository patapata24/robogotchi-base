import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    const { user_id } = req.query;
    let { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('farcaster_id', user_id)
        .single();

    if (!data) {
        const { data: newUser } = await supabase
            .from('users')
            .insert({
                farcaster_id: user_id,
                energy: 8,
                temp: 3,
                maintenance: 7,
                sensors: 9,
                firmware: 10,
                friendliness: 5,
                last_update: new Date(),
                state: 'normal'
            })
            .single();
        data = newUser;
    }

    res.status(200).json({ user: data });
}
