import  {Helmet, HelmetProvider}  from 'react-helmet-async';

const MetaInfo = () => {
  return (
    <HelmetProvider>
      <Helmet>
          <title>Авторизация — Guitar-shop</title>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
          <meta name="description" content="Guitar-shop — описание"/>
          <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png"/>
          <link rel="manifest" href="favicon/site.webmanifest"/>
          <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#131212"/>
          <meta name="msapplication-TileColor" content="#131212"/>
          <meta name="theme-color" content="#131212"/>
          <link rel="preload" href="fonts/open-sans.woff2" as="font" crossOrigin="anonymous"/>
          <link rel="preload" href="fonts/open-sans-700.woff2" as="font" crossOrigin="anonymous"/>
          <link rel="preload" href="fonts/droid-sans-700.woff2" as="font" crossOrigin="anonymous"/>
          <link rel="preload" href="fonts/droid-sans.woff2" as="font" crossOrigin="anonymous"/>
          <link rel="stylesheet" href="css/style.min.css"/>
      </Helmet>
      </HelmetProvider>
  );
};

export default MetaInfo;
