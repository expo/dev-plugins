import { MMKV } from 'react-native-mmkv';
/**
 * This hook registers a devtools plugin for react-native-mmkv.
 *
 * The plugin provides you with the ability to view, add, edit, and remove react-native-mmkv entries.
 *
 * @param props
 * @param props.errorHandler - A function that will be called with any errors that occur while communicating
 * with the devtools, if not provided errors will be ignored. Setting this is highly recommended.
 * @param props.storage - A MMKV storage instance to use, if not provided the default storage will be used.
 */
export declare function useMMKVDevTools({ errorHandler, storage }?: {
    errorHandler?: (error: Error) => void;
    storage?: MMKV;
}): void;
//# sourceMappingURL=useMMKVDevTools.d.ts.map