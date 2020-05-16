import io from 'socket.io-client';
import { ENDPOINT } from './requests';

export const socket = io(ENDPOINT);
