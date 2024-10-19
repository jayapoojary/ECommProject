import { useSelector } from 'react-redux';

export const makeDomain = domain => () => useDomain(domain);

const useDomain = domain => useSelector(state => state[domain]);
export default useDomain;
