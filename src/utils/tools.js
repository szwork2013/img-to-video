/**
 * Created by liyunsong on 2016/12/7.
 */

export function formatNumber(n) {
    n = n.toString();
    return n.length > 1 ? n : '0' + n
}

export function formatVideoTime(ct = 0) {
    const total = ct / 1000;
    const s = total % 60;
    const m = Math.floor(total / 60);
    return `${formatNumber(m)}:${formatNumber(s)}`;
}