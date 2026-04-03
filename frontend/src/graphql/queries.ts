import { gql } from '@apollo/client';

// Vendor Queries
export const VENDORS_QUERY = gql`
  query Vendors($category: VendorCategory) {
    vendors(category: $category) {
      id
      name
      category
      location {
        city
        state
        lat
        lng
      }
      googlePlaceId
      logoUrl
      website
      socialAccounts {
        instagram
        facebook
        tiktok
        youtube
        website
      }
    }
  }
`;

export const VENDOR_QUERY = gql`
  query Vendor($id: ID!) {
    vendor(id: $id) {
      id
      name
      category
      location {
        city
        state
        lat
        lng
        zip
      }
      googlePlaceId
      logoUrl
      website
      socialAccounts {
        instagram
        facebook
        tiktok
        youtube
        website
      }
      createdAt
      updatedAt
    }
  }
`;

export const DISCOVER_VENDORS_QUERY = gql`
  query DiscoverVendors($input: DiscoverVendorsInput!) {
    discoverVendors(input: $input) {
      vendors {
        placeId
        name
        address
        city
        state
        lat
        lng
        rating
        reviewCount
        photos
        website
        phone
        category
      }
      nextPageToken
      totalResults
    }
  }
`;

export const SEARCH_NEARBY_VENDORS_QUERY = gql`
  query SearchNearbyVendors($lat: Int!, $lng: Int!, $category: VendorCategory!, $radius: Int) {
    searchNearbyVendors(lat: $lat, lng: $lng, category: $category, radius: $radius) {
      vendors {
        placeId
        name
        address
        city
        state
        lat
        lng
        rating
        reviewCount
        photos
        website
        category
      }
      totalResults
    }
  }
`;

// Video Queries
export const VIDEOS_QUERY = gql`
  query Videos($vendorId: ID, $status: VideoStatus) {
    videos(vendorId: $vendorId, status: $status) {
      id
      vendorId
      reviewIds
      status
      outputUrl
      templateStyle
      duration
      socialPostUrls {
        platform
        url
        postedAt
        postId
      }
      error
      createdAt
      updatedAt
    }
  }
`;

export const VIDEO_QUERY = gql`
  query Video($id: ID!) {
    video(id: $id) {
      id
      vendorId
      reviewIds
      status
      outputUrl
      templateStyle
      duration
      socialPostUrls {
        platform
        url
        postedAt
        postId
      }
      error
      createdAt
      updatedAt
    }
  }
`;

// Review Queries
export const REVIEWS_QUERY = gql`
  query Reviews($vendorId: ID!) {
    reviews(vendorId: $vendorId) {
      id
      vendorId
      reviewerName
      rating
      text
      date
      sentimentScore
      usedInVideo
      createdAt
    }
  }
`;

// Social Account Queries
export const SOCIAL_ACCOUNTS_QUERY = gql`
  query SocialAccounts($vendorId: ID!) {
    socialAccounts(vendorId: $vendorId) {
      id
      vendorId
      platform
      accountName
      accountId
      expiresAt
      createdAt
    }
  }
`;
