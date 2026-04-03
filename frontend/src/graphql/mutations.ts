import { gql } from '@apollo/client';

// Vendor Mutations
export const CREATE_VENDOR_MUTATION = gql`
  mutation CreateVendor($input: CreateVendorInput!) {
    createVendor(input: $input) {
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
    }
  }
`;

export const IMPORT_VENDOR_MUTATION = gql`
  mutation ImportVendorFromGooglePlace($placeId: String!, $category: VendorCategory!) {
    importVendorFromGooglePlace(placeId: $placeId, category: $category) {
      id
      name
      category
      googlePlaceId
      location {
        city
        state
      }
    }
  }
`;

export const UPDATE_VENDOR_MUTATION = gql`
  mutation UpdateVendor($id: ID!, $input: UpdateVendorInput!) {
    updateVendor(id: $id, input: $input) {
      id
      name
      category
      location {
        city
        state
      }
      logoUrl
      website
    }
  }
`;

export const DELETE_VENDOR_MUTATION = gql`
  mutation DeleteVendor($id: ID!) {
    deleteVendor(id: $id)
  }
`;

// Video Mutations
export const GENERATE_VIDEO_MUTATION = gql`
  mutation GenerateVideo($input: GenerateVideoInput!) {
    generateVideo(input: $input) {
      id
      vendorId
      reviewIds
      status
      outputUrl
      templateStyle
      duration
      error
    }
  }
`;

export const POST_TO_SOCIAL_MUTATION = gql`
  mutation PostToSocial($videoId: ID!, $input: PostToSocialInput!) {
    postToSocial(videoId: $videoId, input: $input) {
      id
      status
      socialPostUrls {
        platform
        url
        postedAt
        postId
      }
    }
  }
`;

// Review Mutations
export const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      vendorId
      reviewerName
      rating
      text
      date
    }
  }
`;

// Social Account Mutations
export const CONNECT_SOCIAL_MUTATION = gql`
  mutation ConnectSocial($input: ConnectSocialInput!) {
    connectSocial(input: $input) {
      id
      vendorId
      platform
      accountName
      accountId
    }
  }
`;

export const DISCONNECT_SOCIAL_MUTATION = gql`
  mutation DisconnectSocial($id: ID!) {
    disconnectSocial(id: $id)
  }
`;
