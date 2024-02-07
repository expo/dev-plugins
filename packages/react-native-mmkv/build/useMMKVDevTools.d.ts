/**
 * This hook registers a devtools plugin for AsyncStorage.
 *
 * The plugin provides you with the ability to view, add, edit, and remove AsyncStorage entries.
 *
 * @param props
 * @param props.errorHandler - A function that will be called with any errors that occur while communicating
 * with the devtools, if not provided errors will be ignored. Setting this is highly recommended.
 */
export declare function useMMKVDevTools({ errorHandler, }?: {
    errorHandler?: (error: Error) => void;
}): void;
//# sourceMappingURL=useMMKVDevTools.d.ts.map