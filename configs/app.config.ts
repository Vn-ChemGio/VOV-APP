export type AppConfig = {
  apiPrefix: string
  mediaHost: string
  authenticatedEntryPath: string
  unAuthenticatedEntryPath: string
  locale: string
  accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies'
  enableMock: boolean
}

const appConfig: AppConfig = {
  apiPrefix: `${process.env.EXPO_PUBLIC_BACKEND_URL}`,
  mediaHost: `${process.env.EXPO_PUBLIC_MEDIA_HOST}`,
  authenticatedEntryPath: '/customizations',
  unAuthenticatedEntryPath: '/sign-in',
  locale: 'en',
  accessTokenPersistStrategy: 'sessionStorage',
  enableMock: true,
};

export default appConfig;
