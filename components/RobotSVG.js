export default function RobotSVG({ state }) {
    let url = '/robot_normal.svg';
    if (state === 'offline') url = '/robot_offline.svg';
    else if (state === 'overheat') url = '/robot_overheat.svg';
    else if (state === 'buggy') url = '/robot_lowbattery.svg';

    return <img src={url} alt="RoboGotchi" style={{ width: '200px', height: '200px' }} />;
}

