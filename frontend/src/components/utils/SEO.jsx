import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = "SukaPrint - Premium Printing Solutions";
    const defaultDescription = "SukaPrint offers high-quality printing services in Malaysia. Business cards, banners, stickers, and more with fast delivery.";
    const defaultKeywords = "printing services, digital printing, malaysia printing, business cards, banners";
    const defaultImage = "/og-image.jpg"; // You might want to add a real default image later

    return (
        <Helmet>
            {/* Standard Metrics */}
            <title>{title ? `${title} | SukaPrint` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || window.location.href} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url || window.location.href} />
            <meta property="twitter:title" content={title || siteTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
};

export default SEO;
