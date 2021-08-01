import { useEffect } from 'react';
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(key: string, action: () => void) {
    useEffect(() => {
        function onKeyup(e: any) {
            if (e.key === key) action()
        }
        window.addEventListener('keyup', onKeyup);
        return () => window.removeEventListener('keyup', onKeyup);
        // eslint-disable-next-line
    }, []);
}