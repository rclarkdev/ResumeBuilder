import 'quill';
export * from 'quill';
import * as QuillImplementation from 'quill';
import { default as QuillTypescriptClass } from 'quill';
export type QuillType = QuillTypescriptClass
export const Quill: typeof QuillTypescriptClass = QuillImplementation as any;