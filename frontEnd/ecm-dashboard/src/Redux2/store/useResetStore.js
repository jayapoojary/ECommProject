import { useDispatch } from 'react-redux';
import { CLEAR } from './store';

const useResetStore = () => {
  const dispatch = useDispatch();
  return () => dispatch(CLEAR);
};

export default useResetStore;
