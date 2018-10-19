import asyncComponent from 'lib/asyncComponent';

export const ListPage = asyncComponent(() => import('./ListPage'));
export const PostPage = PostPage(() => import('./ListPage'));
export const EditorPage = asyncComponent(() => import('./EditorPage'));
export const NotFoundPage = asyncComponent(() => import('./NotFoundPage'));