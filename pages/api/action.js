import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    const { user_id, action } = req.body;

    const { data } = await supabase
        .from('users')
        .select('*')
        .eq('farcaster_id', user_id)
        .single();

    if (!data) return res.status(404).json({ error: 'User not found' });

    let { energy, temp, maintenance, sensors, firmware, friendliness } = data;

    switch(action){
        case 'load':
            energy = Math.min(energy + 3, 10);
            temp = Math.min(temp +1, 10);
            break;
        case 'cool':
            temp = Math.max(temp -3, 0);
            energy = Math.max(energy -1, 0);
            break;
        case 'maintenance':
            maintenance = Math.min(maintenance +4, 10);
            sensors = Math.min(sensors +1, 10);
            break;
        case 'clean':
            sensors = Math.min(sensors +3, 10);
            friendliness = Math.min(friendliness +1, 10);
            break;
        case 'update':
            firmware = Math.min(firmware +4, 10);
            friendliness = Math.min(friendliness +1, 10);
            break;
    }

    let state = 'normal';
    if(energy <=0) state = 'offline';
    else if(temp >=9) state = 'overheat';
    else if(firmware <=2) state = 'buggy';

    const { data: updated } = await supabase
        .from('users')
        .update({ energy, temp, maintenance, sensors, firmware, friendliness, state, last_update: new Date() })
        .eq('farcaster_id', user_id)
        .single();

    res.status(200).json({ user: updated });
}
