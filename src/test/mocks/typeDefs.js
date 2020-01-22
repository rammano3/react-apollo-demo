export const typeDefs = `
directive @principalField on FIELD

input AddAssetToConsignmentSubmissionInput {
  """The type of the asset"""
  asset_type: String!

  """The token provided by Gemini for your asset"""
  gemini_token: String!

  """The id of the submission you want to attach an asset to"""
  submission_id: String!
  clientMutationId: String
}

type AddAssetToConsignmentSubmissionPayload {
  asset: Asset
  clientMutationId: String
}

input AddInitialOfferToOrderInput {
  """ID of order"""
  orderId: ID!

  """Offer price"""
  offerPrice: MoneyInput

  """Offer note"""
  note: String
  clientMutationId: String
}

type AddInitialOfferToOrderPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

"""One item in an aggregation"""
type AggregationCount {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID."""
  id: ID!
  count: Int
  name: String
  sortable_id: String
}

type AnalyticsArtist {
  entityId: String!
}

type AnalyticsArtwork {
  entityId: String!
}

"""Publish artwork Series Stats"""
type AnalyticsArtworksPublishedStats {
  percentageChanged: Int!
  period: AnalyticsQueryPeriodEnum!
  timeSeries: [AnalyticsPartnerTimeSeriesStats!]!
  totalCount: Int!
}

"""An ISO 8601 datetime"""
scalar AnalyticsDateTime

"""Visitor countries, device, referals and session page"""
type AnalyticsGroupedStats {
  groupedEntity: AnalyticsGroupedStatsUnion!
  period: AnalyticsQueryPeriodEnum!
}

"""The connection type for GroupedStats."""
type AnalyticsGroupedStatsConnection {
  """A list of edges."""
  edges: [AnalyticsGroupedStatsEdge]

  """A list of nodes."""
  nodes: [AnalyticsGroupedStats]

  """Information to aid in pagination."""
  pageInfo: AnalyticsPageInfo!
}

"""An edge in a connection."""
type AnalyticsGroupedStatsEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of the edge."""
  node: AnalyticsGroupedStats
}

enum AnalyticsGroupedStatsMetricEnum {
  """visitor_by_device"""
  VISITOR_BY_DEVICE

  """visitor_by_landing_page"""
  VISITOR_BY_LANDING_PAGE

  """visitor_by_location"""
  VISITOR_BY_LOCATION

  """visitor_by_referral"""
  VISITOR_BY_REFERRAL
}

enum AnalyticsGroupedStatsObjectTypeEnum {
  """country"""
  COUNTRY

  """device type"""
  DEVICE

  """landing page"""
  LANDING_PAGE

  """referral"""
  REFERRAL
}

"""A grouped stat item: country or device etc."""
union AnalyticsGroupedStatsUnion = AnalyticsVisitorsByCountry | AnalyticsVisitorsByDevice | AnalyticsVisitorsByLandingPage | AnalyticsVisitorsByReferral

"""A histogram bin"""
type AnalyticsHistogramBin {
  maxPriceCents: Int!
  minPriceCents: Int!
  numArtworks: Int!
  minPrice(decimal: String = ".", format: String = "%s%v", precision: Int = 0, symbol: String, thousand: String = ","): String
  maxPrice(decimal: String = ".", format: String = "%s%v", precision: Int = 0, symbol: String, thousand: String = ","): String
}

"""Information about pagination in a connection."""
type AnalyticsPageInfo {
  """When paginating forwards, the cursor to continue."""
  endCursor: String

  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String
}

"""Stats for pageviews of partner content"""
type AnalyticsPageviewStats {
  artworkViews: Int
  galleryViews: Int
  percentageChanged: Int!
  period: AnalyticsQueryPeriodEnum!
  showViews: Int
  timeSeries: [AnalyticsPartnerTimeSeriesStats!]!
  totalCount: Int!
  uniqueVisitors: Int
}

"""Audience stats of a partner"""
type AnalyticsPartnerAudienceStats {
  commercialVisitors: Int!
  partnerId: String!
  period: AnalyticsQueryPeriodEnum!
  uniqueVisitors: Int!
}

"""Inquiry count time series data of a partner"""
type AnalyticsPartnerInquiryCountTimeSeriesStats {
  count: Int
  endTime: AnalyticsDateTime
  startTime: AnalyticsDateTime
}

"""Inquiry stats of a partner"""
type AnalyticsPartnerInquiryStats {
  inquiryCount: Int!
  inquiryResponseTime: Int
  partnerId: String!
  period: AnalyticsQueryPeriodEnum!

  """Partner inquiry count time series"""
  timeSeries(cumulative: Boolean = false): [AnalyticsPartnerInquiryCountTimeSeriesStats!]
}

"""Sales stats of a partner"""
type AnalyticsPartnerSalesStats {
  orderCount: Int!
  orderResponseTime: Int
  partnerId: String!
  period: AnalyticsQueryPeriodEnum!

  """Partner sales time series"""
  timeSeries(cumulative: Boolean = false): [AnalyticsPartnerSalesTimeSeriesStats!]
  totalCents: Int!
  total(decimal: String = ".", format: String = "%s%v", precision: Int = 0, symbol: String, thousand: String = ","): String
}

"""Sales time series data of a partner"""
type AnalyticsPartnerSalesTimeSeriesStats {
  count: Int
  endTime: AnalyticsDateTime
  startTime: AnalyticsDateTime
  totalCents: Int!
  total(decimal: String = ".", format: String = "%s%v", precision: Int = 0, symbol: String, thousand: String = ","): String
}

"""Partner Stats"""
type AnalyticsPartnerStats {
  """Time series data on number of artworks published"""
  artworksPublished(period: AnalyticsQueryPeriodEnum!): AnalyticsArtworksPublishedStats

  """Audience stats"""
  audience(period: AnalyticsQueryPeriodEnum!): AnalyticsPartnerAudienceStats

  """Visitor countries, device, referals and session page"""
  groupedStats(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
    metric: AnalyticsGroupedStatsMetricEnum!
    objectType: AnalyticsGroupedStatsObjectTypeEnum!
    period: AnalyticsQueryPeriodEnum!
  ): AnalyticsGroupedStatsConnection

  """Inquiry stats"""
  inquiry(period: AnalyticsQueryPeriodEnum!): AnalyticsPartnerInquiryStats

  """Different types of partner pageviews"""
  pageviews(period: AnalyticsQueryPeriodEnum!): AnalyticsPageviewStats
  partnerId: String!

  """
  Artworks, shows, or artists ranked by views. Capped at 20 by the underlying sql query.
  """
  rankedStats(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
    objectType: AnalyticsRankedStatsObjectTypeEnum!
    period: AnalyticsQueryPeriodEnum!
  ): AnalyticsRankedStatsConnection

  """Sales stats"""
  sales(period: AnalyticsQueryPeriodEnum!): AnalyticsPartnerSalesStats

  """Top artworks ranked by views"""
  topArtworks(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
  ): AnalyticsRankedStatsConnection @deprecated(reason: "Use rankedStats(objectType: ) instead")

  """Number of unique visitors"""
  uniqueVisitors(period: AnalyticsQueryPeriodEnum!): Int @deprecated(reason: "Use audience() { uniqueVisitors } instead")
}

"""Partner Time Series Stats"""
type AnalyticsPartnerTimeSeriesStats {
  count: Int
  endTime: AnalyticsDateTime
  startTime: AnalyticsDateTime
}

"""Price Context Filter Type"""
type AnalyticsPriceContextFilterType {
  category: AnalyticsPricingContextCategoryEnum
  dimension: AnalyticsPricingContextDimensionEnum
}

"""Pricing Context Histogram"""
type AnalyticsPricingContext {
  appliedFilters: AnalyticsPriceContextFilterType!
  bins: [AnalyticsHistogramBin!]!
  appliedFiltersDisplay: String
}

enum AnalyticsPricingContextCategoryEnum {
  """Architecture"""
  ARCHITECTURE

  """Books and Portfolios"""
  BOOKS_AND_PORTFOLIOS

  """Design/Decorative Art"""
  DESIGN_DECORATIVE_ART

  """Drawing, Collage or other Work on Paper"""
  DRAWING_COLLAGE_OTHER_WORK_ON_PAPER

  """Fashion Design and Wearable Art"""
  FASHION

  """Installation"""
  INSTALLATION

  """Jewelry"""
  JEWELRY

  """Mixed Media"""
  MIXED_MEDIA

  """Other"""
  OTHER

  """Painting"""
  PAINTING

  """Performance Art"""
  PERFORMANCE

  """Photography"""
  PHOTOGRAPHY

  """Posters"""
  POSTERS

  """Print"""
  PRINT

  """Sculpture"""
  SCULPTURE

  """Sound"""
  SOUND

  """Textile Arts"""
  TEXTILE

  """Video/Film/Animation"""
  VIDEO_FILM_ANIMATION

  """Work on Paper"""
  WORK_ON_PAPER
}

enum AnalyticsPricingContextDimensionEnum {
  """Large"""
  LARGE

  """Medium"""
  MEDIUM

  """Small"""
  SMALL
}

enum AnalyticsQueryPeriodEnum {
  """Four weeks"""
  FOUR_WEEKS

  """One year"""
  ONE_YEAR

  """Sixteen weeks"""
  SIXTEEN_WEEKS
}

union AnalyticsRankedEntityUnion = Artwork | Show | Artist

"""Top artworks, shows, or artists from a partner"""
type AnalyticsRankedStats {
  period: AnalyticsQueryPeriodEnum!
  rankedEntity: AnalyticsRankedStatsUnion!
  value: Int!
  entity: AnalyticsRankedEntityUnion
}

"""The connection type for RankedStats."""
type AnalyticsRankedStatsConnection {
  """A list of edges."""
  edges: [AnalyticsRankedStatsEdge]

  """A list of nodes."""
  nodes: [AnalyticsRankedStats]

  """Information to aid in pagination."""
  pageInfo: AnalyticsPageInfo!
}

"""An edge in a connection."""
type AnalyticsRankedStatsEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of the edge."""
  node: AnalyticsRankedStats
}

enum AnalyticsRankedStatsObjectTypeEnum {
  """Artist"""
  ARTIST

  """Artwork"""
  ARTWORK

  """Show"""
  SHOW
}

"""An artwork, artist, or show"""
union AnalyticsRankedStatsUnion = AnalyticsArtist | AnalyticsArtwork | AnalyticsShow

type AnalyticsShow {
  entityId: String!
}

type AnalyticsVisitorsByCountry {
  metric: String!
  name: String!
  percent: Float!
  type: String!
  value: Int!
}

type AnalyticsVisitorsByDevice {
  metric: String!
  name: String!
  percent: Float!
  type: String!
  value: Int!
}

type AnalyticsVisitorsByLandingPage {
  metric: String!
  name: String!
  percent: Float!
  type: String!
  value: Int!
}

type AnalyticsVisitorsByReferral {
  metric: String!
  name: String!
  percent: Float!
  type: String!
  value: Int!
}

input ApproveOrderInput {
  """Order ID"""
  orderId: String!
  clientMutationId: String
}

type ApproveOrderPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

type Article implements Node {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID."""
  id: ID!
  cached: Int
  author: Author
  channel_id: String
  contributing_authors: [Author]
  href: String
  published_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  slug: String
  thumbnail_title: String
  thumbnail_teaser: String
  thumbnail_image: Image
  tier: Int
  title: String
  updated_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
}

"""A connection to a list of items."""
type ArticleConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ArticleEdge]
  pageCursors: PageCursors
  totalCount: Int
}

"""An edge in a connection."""
type ArticleEdge {
  """The item at the end of the edge"""
  node: Article

  """A cursor for use in pagination"""
  cursor: String!
}

enum ArticleSorts {
  PUBLISHED_AT_ASC
  PUBLISHED_AT_DESC
}

type Artist implements Node & Searchable {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  alternate_names: [String]
  articlesConnection(sort: ArticleSorts, limit: Int, in_editorial_feed: Boolean, after: String, first: Int, before: String, last: Int): ArticleConnection
  articles(sort: ArticleSorts, limit: Int, in_editorial_feed: Boolean): [Article]
  artists(
    """The number of Artists to return"""
    size: Int
    exclude_artists_without_artworks: Boolean = true
  ): [Artist]
  artworks(
    """The number of Artworks to return"""
    size: Int
    page: Int
    sort: ArtworkSorts
    published: Boolean = true
    filter: [ArtistArtworksFilters]
    exclude: [String]
  ): [Artwork]
  artworks_connection(
    """List of artwork IDs to exclude from the response."""
    exclude: [String]
    filter: [ArtistArtworksFilters]
    published: Boolean = true
    sort: ArtworkSorts
    after: String
    first: Int
    before: String
    last: Int
  ): ArtworkConnection
  auctionResults(
    sort: AuctionResultSorts

    """When true, will only return records for allowed artists."""
    recordsTrusted: Boolean = false
    after: String
    first: Int
    before: String
    last: Int
  ): AuctionResultConnection
  bio: String

  """The Artist biography article written by Artsy"""
  biography: Article
  biography_blurb(
    """If true, will return featured bio over Artsy one."""
    partner_bio: Boolean = false
    format: Format
  ): ArtistBlurb
  birthday: String
  blurb(format: Format): String
  carousel: ArtistCarousel
  collections: [String]
  contemporary(
    """The number of Artists to return"""
    size: Int
    exclude_artists_without_artworks: Boolean = true
  ): [Artist]
  consignable: Boolean @deprecated(reason: "Prefer to use \`is_*\`. [Will be removed in v2]")
  counts: ArtistCounts
  currentEvent: CurrentEvent
  deathday: String
  disablePriceContext: Boolean
  display_auction_link: Boolean @deprecated(reason: "Prefer to use \`is_*\`. [Will be removed in v2]")

  """Custom-sorted list of shows for an artist, in order of significance."""
  exhibition_highlights(
    """The number of Shows to return"""
    size: Int = 5
  ): [Show]

  """Artworks Elastic Search results"""
  filtered_artworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks

  """A string showing the total number of works and those for sale"""
  formatted_artworks_count: String

  """
  A string of the form "Nationality, Birthday (or Birthday-Deathday)"
  """
  formatted_nationality_and_birthday: String

  """A list of genes associated with an artist"""
  genes: [Gene]
  gender: String
  href: String
  has_metadata: Boolean
  hometown: String
  image: Image
  imageUrl: String
  initials(length: Int = 3): String
  insights: [ArtistInsight]
  is_consignable: Boolean

  """Only specific Artists should show a link to auction results."""
  is_display_auction_link: Boolean
  is_followed: Boolean
  is_public: Boolean
  is_shareable: Boolean
  displayLabel: String
  location: String
  meta: ArtistMeta
  nationality: String
  name: String
  partners(represented_by: Boolean, partner_category: [String], after: String, first: Int, before: String, last: Int): PartnerArtistConnection
  partner_artists(
    """The number of PartnerArtists to return"""
    size: Int
  ): [PartnerArtist]
  partner_shows(
    active: Boolean
    at_a_fair: Boolean
    is_reference: Boolean

    """The number of PartnerShows to return"""
    size: Int
    solo_show: Boolean
    status: String
    top_tier: Boolean
    visible_to_public: Boolean
    sort: PartnerShowSorts
  ): [PartnerShow] @deprecated(reason: "Prefer to use \`shows\`. [Will be removed in v2]")
  public: Boolean @deprecated(reason: "Prefer to use \`is_*\`. [Will be removed in v2]")
  related: ArtistRelatedData
  sales(
    live: Boolean
    is_auction: Boolean

    """The number of Sales to return"""
    size: Int
    sort: SaleSorts
  ): [Sale]
  shows(
    active: Boolean
    at_a_fair: Boolean
    is_reference: Boolean

    """The number of PartnerShows to return"""
    size: Int
    solo_show: Boolean
    status: String
    top_tier: Boolean
    visible_to_public: Boolean
    sort: PartnerShowSorts
  ): [Show]
  showsConnection(
    active: Boolean
    at_a_fair: Boolean
    is_reference: Boolean

    """The number of PartnerShows to return"""
    size: Int
    solo_show: Boolean
    status: String
    top_tier: Boolean
    visible_to_public: Boolean
    sort: PartnerShowSorts
    after: String
    first: Int
    before: String
    last: Int
  ): ShowConnection

  """Use this attribute to sort by when sorting a collection of Artists"""
  sortable_id: String
  statuses: ArtistStatuses
  highlights: ArtistHighlights
  years: String
  marketingCollections(size: Int): [MarketingCollection]
}

type ArtistArtworkGrid implements ArtworkContextGrid {
  title: String
  ctaTitle: String
  ctaHref: String
  artworks(after: String, first: Int, before: String, last: Int): ArtworkConnection
}

enum ArtistArtworksFilters {
  IS_FOR_SALE
  IS_NOT_FOR_SALE
}

type ArtistBlurb {
  credit: String
  text: String

  """The partner id of the partner who submitted the featured bio."""
  partner_id: String
}

type ArtistCarousel {
  images: [Image]
}

"""A connection to a list of items."""
type ArtistConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ArtistEdge]
  pageCursors: PageCursors
  totalCount: Int
}

type ArtistCounts {
  artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  follows(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  for_sale_artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  partner_shows(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  related_artists: Int
  articles: Int
  ecommerce_artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  has_make_offer_artworks: Boolean
  auction_artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
}

"""An edge in a connection."""
type ArtistEdge {
  """The item at the end of the edge"""
  node: Artist

  """A cursor for use in pagination"""
  cursor: String!
}

type ArtistGroup {
  """Letter artists group belongs to"""
  letter: String

  """Artists sorted by last name"""
  items: [Artist]
}

type ArtistHighlights {
  partners(represented_by: Boolean, partner_category: [String], display_on_partner_profile: Boolean, after: String, first: Int, before: String, last: Int): PartnerArtistConnection
}

type ArtistInsight {
  """The type of insight."""
  type: String

  """Label to use when displaying the insight."""
  label: String

  """List of entities relevant to the insight."""
  entities: [String]
}

type ArtistItem implements Node & Searchable {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  alternate_names: [String]
  articlesConnection(sort: ArticleSorts, limit: Int, in_editorial_feed: Boolean, after: String, first: Int, before: String, last: Int): ArticleConnection
  articles(sort: ArticleSorts, limit: Int, in_editorial_feed: Boolean): [Article]
  artists(
    """The number of Artists to return"""
    size: Int
    exclude_artists_without_artworks: Boolean = true
  ): [Artist]
  artworks(
    """The number of Artworks to return"""
    size: Int
    page: Int
    sort: ArtworkSorts
    published: Boolean = true
    filter: [ArtistArtworksFilters]
    exclude: [String]
  ): [Artwork]
  artworks_connection(
    """List of artwork IDs to exclude from the response."""
    exclude: [String]
    filter: [ArtistArtworksFilters]
    published: Boolean = true
    sort: ArtworkSorts
    after: String
    first: Int
    before: String
    last: Int
  ): ArtworkConnection
  auctionResults(
    sort: AuctionResultSorts

    """When true, will only return records for allowed artists."""
    recordsTrusted: Boolean = false
    after: String
    first: Int
    before: String
    last: Int
  ): AuctionResultConnection
  bio: String

  """The Artist biography article written by Artsy"""
  biography: Article
  biography_blurb(
    """If true, will return featured bio over Artsy one."""
    partner_bio: Boolean = false
    format: Format
  ): ArtistBlurb
  birthday: String
  blurb(format: Format): String
  carousel: ArtistCarousel
  collections: [String]
  contemporary(
    """The number of Artists to return"""
    size: Int
    exclude_artists_without_artworks: Boolean = true
  ): [Artist]
  consignable: Boolean @deprecated(reason: "Prefer to use \`is_*\`. [Will be removed in v2]")
  counts: ArtistCounts
  currentEvent: CurrentEvent
  deathday: String
  disablePriceContext: Boolean
  display_auction_link: Boolean @deprecated(reason: "Prefer to use \`is_*\`. [Will be removed in v2]")

  """Custom-sorted list of shows for an artist, in order of significance."""
  exhibition_highlights(
    """The number of Shows to return"""
    size: Int = 5
  ): [Show]

  """Artworks Elastic Search results"""
  filtered_artworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks

  """A string showing the total number of works and those for sale"""
  formatted_artworks_count: String

  """
  A string of the form "Nationality, Birthday (or Birthday-Deathday)"
  """
  formatted_nationality_and_birthday: String

  """A list of genes associated with an artist"""
  genes: [Gene]
  gender: String
  href: String
  has_metadata: Boolean
  hometown: String
  image: Image
  imageUrl: String
  initials(length: Int = 3): String
  insights: [ArtistInsight]
  is_consignable: Boolean

  """Only specific Artists should show a link to auction results."""
  is_display_auction_link: Boolean
  is_followed: Boolean
  is_public: Boolean
  is_shareable: Boolean
  displayLabel: String
  location: String
  meta: ArtistMeta
  nationality: String
  name: String
  partners(represented_by: Boolean, partner_category: [String], after: String, first: Int, before: String, last: Int): PartnerArtistConnection
  partner_artists(
    """The number of PartnerArtists to return"""
    size: Int
  ): [PartnerArtist]
  partner_shows(
    active: Boolean
    at_a_fair: Boolean
    is_reference: Boolean

    """The number of PartnerShows to return"""
    size: Int
    solo_show: Boolean
    status: String
    top_tier: Boolean
    visible_to_public: Boolean
    sort: PartnerShowSorts
  ): [PartnerShow] @deprecated(reason: "Prefer to use \`shows\`. [Will be removed in v2]")
  public: Boolean @deprecated(reason: "Prefer to use \`is_*\`. [Will be removed in v2]")
  related: ArtistRelatedData
  sales(
    live: Boolean
    is_auction: Boolean

    """The number of Sales to return"""
    size: Int
    sort: SaleSorts
  ): [Sale]
  shows(
    active: Boolean
    at_a_fair: Boolean
    is_reference: Boolean

    """The number of PartnerShows to return"""
    size: Int
    solo_show: Boolean
    status: String
    top_tier: Boolean
    visible_to_public: Boolean
    sort: PartnerShowSorts
  ): [Show]
  showsConnection(
    active: Boolean
    at_a_fair: Boolean
    is_reference: Boolean

    """The number of PartnerShows to return"""
    size: Int
    solo_show: Boolean
    status: String
    top_tier: Boolean
    visible_to_public: Boolean
    sort: PartnerShowSorts
    after: String
    first: Int
    before: String
    last: Int
  ): ShowConnection

  """Use this attribute to sort by when sorting a collection of Artists"""
  sortable_id: String
  statuses: ArtistStatuses
  highlights: ArtistHighlights
  years: String
}

type ArtistMeta {
  description: String
  title: String
}

type ArtistRelatedData {
  genes(after: String, first: Int, before: String, last: Int): GeneConnection
  artists(exclude_artists_without_artworks: Boolean = true, min_forsale_artworks: Int, kind: RelatedArtistsKind, after: String, first: Int, before: String, last: Int): ArtistConnection

  """
  A list of the current user’s suggested artists, based on a single artist
  """
  suggested(
    """The slug or ID of an artist"""
    artist_id: String

    """Exclude artists without for sale works"""
    exclude_artists_without_forsale_artworks: Boolean

    """Exclude artists without any artworks"""
    exclude_artists_without_artworks: Boolean

    """Exclude artists the user already follows"""
    exclude_followed_artists: Boolean

    """
    Exclude these ids from results, may result in all artists being excluded.
    """
    exclude_artist_ids: [String]

    """Pagination, need I say more?"""
    page: Int

    """Amount of artists to return"""
    size: Int
    after: String
    first: Int
    before: String
    last: Int
  ): ArtistConnection
}

enum ArtistSorts {
  sortable_id_asc @deprecated(reason: "Prefer to use \`SORTABLE_ID_ASC\`. [Will be removed in v2]")
  sortable_id_desc @deprecated(reason: "Prefer to use \`SORTABLE_ID_DESC\`. [Will be removed in v2]")
  trending_desc @deprecated(reason: "Prefer to use \`TRENDING_DESC\`. [Will be removed in v2]")
  SORTABLE_ID_ASC
  SORTABLE_ID_DESC
  TRENDING_DESC
}

type ArtistStatuses {
  artists: Boolean
  articles: Boolean
  artworks: Boolean
  auction_lots: Boolean
  biography: Boolean
  contemporary: Boolean
  cv(
    """Suppress the cv tab when artist show count is less than this."""
    minShowCount: Int = 15
  ): Boolean
  shows: Boolean
}

type Artwork implements Node & Searchable & Sellable {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  additional_information(format: Format): String
  artist(
    """Use whatever is in the original response instead of making a request"""
    shallow: Boolean
  ): Artist
  artists(
    """Use whatever is in the original response instead of making a request"""
    shallow: Boolean
  ): [Artist]
  artist_names: String
  articles(size: Int): [Article]
  availability: String
  can_share_image: Boolean @deprecated(reason: "Prefer to use \`is_*\`. [Will be removed in v2]")
  category: String

  """Attribution class object"""
  attribution_class: AttributionClass
  collecting_institution: String
  contact_label: String

  """Pre-filled inquiry text"""
  contact_message: String

  """Returns the associated Fair/Sale/PartnerShow"""
  context: ArtworkContext
  contextGrids: [ArtworkContextGrid]
  cultural_maker: String
  date: String
  description(format: Format): String
  dimensions: dimensions

  """Returns an HTML string representing the embedded content (video)"""
  embed(width: Int = 853, height: Int = 450, autoplay: Boolean = false): String
  edition_of: String
  edition_sets(sort: EditionSetSorts): [EditionSet]
  exhibition_history(format: Format): String
  fair: Fair

  """
  Formatted artwork metadata, including artist, title, date and partner; e.g., 'Andy Warhol, Truck, 1980, Westward Gallery'.
  """
  formattedMetadata: String
  height: String @deprecated(reason: "Prefer to use \`dimensions\`. [Will be removed in v2]")

  """Returns the highlighted shows and articles"""
  highlights: [Highlighted]
  href: String
  image: Image
  imageUrl: String
  image_rights: String
  image_title: String
  images(size: Int): [Image]

  """Private text field for partner use"""
  inventoryId: String

  """Whether a work can be purchased through e-commerce"""
  is_acquireable: Boolean

  """Whether a user can make an offer on a work"""
  is_offerable: Boolean

  """Is this artwork part of an auction that is currently running?"""
  is_biddable: Boolean

  """When in an auction, can the work be bought immediately"""
  is_buy_nowable: Boolean
  is_comparable_with_auction_results: Boolean

  """Are we able to display a contact form on artwork pages?"""
  is_contactable: Boolean @deprecated(reason: "Prefer to use \`is_inquireable\`. [Will be removed in v2]")
  is_downloadable: Boolean
  is_embeddable_video: Boolean
  is_ecommerce: Boolean @deprecated(reason: "Should not be used to determine anything UI-level. [Will be removed in v2]")
  is_for_sale: Boolean
  is_hangable: Boolean

  """Do we want to encourage inquiries on this work?"""
  is_inquireable: Boolean

  """Is this artwork part of an auction?"""
  is_in_auction: Boolean

  """Is this artwork part of a current show"""
  is_in_show: Boolean
  is_not_for_sale: String
  is_on_hold: String
  is_price_hidden: Boolean
  is_price_range: Boolean
  is_purchasable: Boolean @deprecated(reason: "Purchase requests are not supported. Replaced by buy now. [Will be removed in v2]")
  is_saved: Boolean
  is_shareable: Boolean
  is_sold: Boolean
  is_unique: Boolean
  displayLabel: String
  layer(id: String): ArtworkLayer
  layers: [ArtworkLayer]
  literature(format: Format): String
  manufacturer(format: Format): String
  medium: String
  metric: String @deprecated(reason: "Prefer to use \`dimensions\`. [Will be removed in v2]")
  meta: ArtworkMeta
  myLotStanding(live: Boolean = null): [LotStanding!]

  """[DO NOT USE] Weekly pageview data (static)."""
  pageviews: Int @deprecated(reason: "This is for an AB test and will be imminently deprecated. [Will be removed in v2]")
  partner(
    """Use whatever is in the original response instead of making a request"""
    shallow: Boolean
  ): Partner
  pickup_available: Boolean
  price: String @deprecated(reason: "Prefer to use \`listPrice\`. [Will be removed in v2]")
  priceCents: PriceCents @deprecated(reason: "Prefer to use \`listPrice\`. [Will be removed in v2]")
  listPrice: ListPrice
  price_currency: String
  priceIncludesTax: Boolean
  priceIncludesTaxDisplay: String

  """Is this work available for shipping only within the Contenental US?"""
  shipsToContinentalUSOnly: Boolean @deprecated(reason: "Prefer to use \`onlyShipsDomestically\`. [Will be removed in v2]")

  """Is this work only available for shipping domestically?"""
  onlyShipsDomestically: Boolean

  """The string that describes domestic and international shipping."""
  shippingInfo: String

  """
  Minimal location information describing from where artwork will be shipped.
  """
  shippingOrigin: String

  """The country an artwork will be shipped from."""
  shippingCountry: String
  provenance(format: Format): String
  publisher(format: Format): String
  related(size: Int): [Artwork]
  sale: Sale
  sale_artwork(sale_id: String = null): SaleArtwork
  sale_message: String
  series(format: Format): String
  show(size: Int, active: Boolean, at_a_fair: Boolean, sort: PartnerShowSorts): PartnerShow
  v2_shows(size: Int, active: Boolean, at_a_fair: Boolean, sort: ShowSort): [Show]
  shows(size: Int, active: Boolean, at_a_fair: Boolean, sort: PartnerShowSorts): [PartnerShow]
  signature(format: Format): String
  title: String

  """
  Formatted artwork metadata, including artist, title, date and partner; e.g., 'Andy Warhol, Truck, 1980, Westward Gallery'.
  """
  to_s: String @deprecated(reason: "Prefer to use \`formattedMetadata\`. [Will be removed in v2]")

  """Whether this Artwork is Published of not"""
  published: Boolean!

  """
  If the category is video, then it returns the href for the (youtube/vimeo) video, otherwise returns the website from CMS
  """
  website: String
  width: String @deprecated(reason: "Prefer to use \`dimensions\`. [Will be removed in v2]")
  framed: ArtworkInfoRow
  signatureInfo: ArtworkInfoRow
  conditionDescription: ArtworkInfoRow

  """Returns true when artwork has a certificate of authenticity"""
  hasCertificateOfAuthenticity: Boolean

  """
  Returns the display label and detail for artwork certificate of authenticity
  """
  certificateOfAuthenticity: ArtworkInfoRow

  """
  If you need to render artwork dimensions as a string, prefer the \`Artwork#dimensions\` field
  """
  widthCm: Float

  """
  If you need to render artwork dimensions as a string, prefer the \`Artwork#dimensions\` field
  """
  heightCm: Float

  """score assigned to an artwork based on its dimensions"""
  sizeScore: Float
  pricingContext: AnalyticsPricingContext
}

enum ArtworkAggregation {
  COLOR
  DIMENSION_RANGE
  FOLLOWED_ARTISTS
  MAJOR_PERIOD
  MEDIUM
  MERCHANDISABLE_ARTISTS
  GALLERY
  INSTITUTION
  PARTNER_CITY
  PERIOD
  PRICE_RANGE
  TOTAL
}

"""A connection to a list of items."""
type ArtworkConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ArtworkEdge]
  pageCursors: PageCursors
  totalCount: Int
}

union ArtworkContext = ArtworkContextAuction | ArtworkContextFair | ArtworkContextPartnerShow | ArtworkContextSale

type ArtworkContextAuction implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  artworks(
    page: Int = 1
    size: Int = 25
    all: Boolean = false

    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
  ): [Artwork]

  """Returns a connection of artworks for a sale."""
  artworksConnection(
    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
    after: String
    first: Int
    before: String
    last: Int
  ): ArtworkConnection
  associated_sale: Sale
  auction_state: String @deprecated(reason: "Prefer to use \`status\`. [Will be removed in v2]")

  """A bid increment policy that explains minimum bids in ranges."""
  bid_increments: [BidIncrement]

  """Auction's buyer's premium policy."""
  buyers_premium: [BuyersPremium]
  cover_image: Image
  currency: String
  description: String
  display_timely_at: String
  eligible_sale_artworks_count: Int
  end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  event_start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  event_end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """
  A formatted description of when the auction starts or ends or if it has ended
  """
  formattedStartDateTime: String
  href: String
  name: String
  initials(length: Int = 3): String
  is_auction: Boolean
  is_benefit: Boolean @deprecated(reason: "Prefer to use \`isBenefit\`. [Will be removed in v2]")
  isBenefit: Boolean
  isGalleryAuction: Boolean
  is_auction_promo: Boolean
  is_closed: Boolean
  is_open: Boolean
  is_live_open: Boolean
  is_preview: Boolean
  is_preliminary: Boolean
  is_registration_closed: Boolean
  is_with_buyers_premium: Boolean
  live_start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """
  Returns a live auctions url if the sale is open and start time is after now
  """
  live_url_if_open: String
  partner: Partner
  profile: Profile
  promoted_sale: Sale
  registration_ends_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """A registration for this sale or null"""
  registrationStatus: Bidder
  require_bidder_approval: Boolean
  sale_artworks(page: Int = 1, size: Int = 25, all: Boolean = false): [SaleArtwork]
  sale_artworks_connection(
    """List of sale artwork IDs to fetch"""
    ids: [ID]
    after: String
    first: Int
    before: String
    last: Int
  ): SaleArtworkConnection
  sale_type: String
  start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  status: String
  sale_artwork(id: String!): SaleArtwork
  symbol: String
  timeZone: String
}

type ArtworkContextFair {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  about: String
  followed_content: FollowedContent
  artists(
    """Sorts for artists in a fair"""
    sort: FairArtistSorts
    after: String
    first: Int
    before: String
    last: Int
  ): ArtistConnection
  cached: Int
  banner_size: String
  counts: FairCounts

  """A formatted description of the start to end dates"""
  exhibition_period: String

  """
  A formatted description of when the fair starts or closes or if it is closed
  """
  formattedOpeningHours: String
  has_full_feature: Boolean
  has_homepage_section: Boolean
  has_large_banner: Boolean
  has_listing: Boolean
  hours: String
  href: String
  image: Image
  is_active: Boolean @deprecated(reason: "Prefer to use \`isActive\`. [Will be removed in v2]")

  """Are we currently in the fair's active period?"""
  isActive: Boolean
  links: String
  mobile_image: Image
  is_published: Boolean
  location: Location
  name: String
  profile: Profile

  """
  This connection only supports forward pagination. We're replacing Relay's default cursor with one from Gravity.
  """
  shows_connection(
    """Number of artworks to return"""
    section: String

    """Sorts for shows in a fair"""
    sort: ShowSort
    after: String
    first: Int
    before: String
    last: Int
  ): ShowConnection
  start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  active_start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  organizer: organizer
  published: Boolean @deprecated(reason: "Prefer to use \`is_published\`. [Will be removed in v2]")
  tagline: String
  ticketsLink: String

  """The exhibitors with booths in this fair with letter."""
  exhibitors_grouped_by_name: [FairExhibitorsGroup]

  """Artworks Elastic Search results"""
  filteredArtworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks
  sponsoredContent: FairSponsoredContent
}

"""A specific grid."""
interface ArtworkContextGrid {
  title: String
  ctaTitle: String
  ctaHref: String
  artworks(after: String, first: Int, before: String, last: Int): ArtworkConnection
}

type ArtworkContextPartnerShow implements Node {
  """A globally unique ID."""
  __id: ID! @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """A slug ID."""
  id: ID! @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """A type-specific ID likely used as a database ID."""
  _id: ID! @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  cached: Int @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  artists: [Artist] @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """The artworks featured in the show"""
  artworks(
    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
    for_sale: Boolean = false
    published: Boolean = true
    all: Boolean
    page: Int = 1

    """Number of artworks to return"""
    size: Int = 25
  ): [Artwork] @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """A connection of artworks featured in the show"""
  artworksConnection(
    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
    for_sale: Boolean = false
    published: Boolean = true
    after: String
    first: Int
    before: String
    last: Int
  ): ArtworkConnection @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  counts: PartnerShowCounts @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  cover_image: Image @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  created_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  description: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  displayable: Boolean @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  events: [PartnerShowEventType] @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """A formatted description of the start to end dates"""
  exhibition_period: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  fair: Fair @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  href: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  images(
    """Number of images to return"""
    size: Int

    """Pass true/false to include cover or not"""
    default: Boolean
    page: Int
  ): [Image] @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """Flag showing if show has any location."""
  has_location: Boolean @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """
  Gravity doesn’t expose the \`active\` flag. Temporarily re-state its logic.
  """
  is_active: Boolean @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  is_displayable: Boolean @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  is_fair_booth: Boolean @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  kind: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  location: Location @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  meta_image: Image @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """The exhibition title"""
  name: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  partner: Partner @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  press_release(format: Format): String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  status: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """A formatted update on upcoming status changes"""
  status_update(
    """Before this many days no update will be generated"""
    max_days: Int
  ): String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  type: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
}

type ArtworkContextSale implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  artworks(
    page: Int = 1
    size: Int = 25
    all: Boolean = false

    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
  ): [Artwork]

  """Returns a connection of artworks for a sale."""
  artworksConnection(
    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
    after: String
    first: Int
    before: String
    last: Int
  ): ArtworkConnection
  associated_sale: Sale
  auction_state: String @deprecated(reason: "Prefer to use \`status\`. [Will be removed in v2]")

  """A bid increment policy that explains minimum bids in ranges."""
  bid_increments: [BidIncrement]

  """Auction's buyer's premium policy."""
  buyers_premium: [BuyersPremium]
  cover_image: Image
  currency: String
  description: String
  display_timely_at: String
  eligible_sale_artworks_count: Int
  end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  event_start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  event_end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """
  A formatted description of when the auction starts or ends or if it has ended
  """
  formattedStartDateTime: String
  href: String
  name: String
  initials(length: Int = 3): String
  is_auction: Boolean
  is_benefit: Boolean @deprecated(reason: "Prefer to use \`isBenefit\`. [Will be removed in v2]")
  isBenefit: Boolean
  isGalleryAuction: Boolean
  is_auction_promo: Boolean
  is_closed: Boolean
  is_open: Boolean
  is_live_open: Boolean
  is_preview: Boolean
  is_preliminary: Boolean
  is_registration_closed: Boolean
  is_with_buyers_premium: Boolean
  live_start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """
  Returns a live auctions url if the sale is open and start time is after now
  """
  live_url_if_open: String
  partner: Partner
  profile: Profile
  promoted_sale: Sale
  registration_ends_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """A registration for this sale or null"""
  registrationStatus: Bidder
  require_bidder_approval: Boolean
  sale_artworks(page: Int = 1, size: Int = 25, all: Boolean = false): [SaleArtwork]
  sale_artworks_connection(
    """List of sale artwork IDs to fetch"""
    ids: [ID]
    after: String
    first: Int
    before: String
    last: Int
  ): SaleArtworkConnection
  sale_type: String
  start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  status: String
  sale_artwork(id: String!): SaleArtwork
  symbol: String
  timeZone: String
}

"""An edge in a connection."""
type ArtworkEdge {
  """The item at the end of the edge"""
  node: Artwork

  """A cursor for use in pagination"""
  cursor: String!
}

union ArtworkFilterFacet = ArtworkFilterTag | ArtworkFilterGene

type ArtworkFilterGene implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  description: String
  name: String
  href: String
  image: Image
  count: Int

  """Artworks Elastic Search results"""
  filtered_artworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks
}

type ArtworkFilterTag implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  description: String
  name: String
  href: String
  image: Image
  count: Int

  """Artworks Elastic Search results"""
  filtered_artworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks
}

type ArtworkInfoRow {
  """Label for information row"""
  label: String

  """Additional details about given attribute"""
  details: String
}

"""An inquiry on an Artwork"""
type ArtworkInquiry {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!
  artwork: Artwork!
  impulse_conversation_id: String
}

"""A connection to a list of items."""
type ArtworkInquiryConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ArtworkInquiryEdge]
}

"""An edge in a connection."""
type ArtworkInquiryEdge {
  """The item at the end of the edge"""
  node: ArtworkInquiry

  """A cursor for use in pagination"""
  cursor: String!
}

type ArtworkItem implements Node & Searchable & Sellable {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  additional_information(format: Format): String
  artist(
    """Use whatever is in the original response instead of making a request"""
    shallow: Boolean
  ): Artist
  artists(
    """Use whatever is in the original response instead of making a request"""
    shallow: Boolean
  ): [Artist]
  artist_names: String
  articles(size: Int): [Article]
  availability: String
  can_share_image: Boolean @deprecated(reason: "Prefer to use \`is_*\`. [Will be removed in v2]")
  category: String

  """Attribution class object"""
  attribution_class: AttributionClass
  collecting_institution: String
  contact_label: String

  """Pre-filled inquiry text"""
  contact_message: String

  """Returns the associated Fair/Sale/PartnerShow"""
  context: ArtworkContext
  contextGrids: [ArtworkContextGrid]
  cultural_maker: String
  date: String
  description(format: Format): String
  dimensions: dimensions

  """Returns an HTML string representing the embedded content (video)"""
  embed(width: Int = 853, height: Int = 450, autoplay: Boolean = false): String
  edition_of: String
  edition_sets(sort: EditionSetSorts): [EditionSet]
  exhibition_history(format: Format): String
  fair: Fair

  """
  Formatted artwork metadata, including artist, title, date and partner; e.g., 'Andy Warhol, Truck, 1980, Westward Gallery'.
  """
  formattedMetadata: String
  height: String @deprecated(reason: "Prefer to use \`dimensions\`. [Will be removed in v2]")

  """Returns the highlighted shows and articles"""
  highlights: [Highlighted]
  href: String
  image: Image
  imageUrl: String
  image_rights: String
  image_title: String
  images(size: Int): [Image]

  """Private text field for partner use"""
  inventoryId: String

  """Whether a work can be purchased through e-commerce"""
  is_acquireable: Boolean

  """Whether a user can make an offer on a work"""
  is_offerable: Boolean

  """Is this artwork part of an auction that is currently running?"""
  is_biddable: Boolean

  """When in an auction, can the work be bought immediately"""
  is_buy_nowable: Boolean
  is_comparable_with_auction_results: Boolean

  """Are we able to display a contact form on artwork pages?"""
  is_contactable: Boolean @deprecated(reason: "Prefer to use \`is_inquireable\`. [Will be removed in v2]")
  is_downloadable: Boolean
  is_embeddable_video: Boolean
  is_ecommerce: Boolean @deprecated(reason: "Should not be used to determine anything UI-level. [Will be removed in v2]")
  is_for_sale: Boolean
  is_hangable: Boolean

  """Do we want to encourage inquiries on this work?"""
  is_inquireable: Boolean

  """Is this artwork part of an auction?"""
  is_in_auction: Boolean

  """Is this artwork part of a current show"""
  is_in_show: Boolean
  is_not_for_sale: String
  is_on_hold: String
  is_price_hidden: Boolean
  is_price_range: Boolean
  is_purchasable: Boolean @deprecated(reason: "Purchase requests are not supported. Replaced by buy now. [Will be removed in v2]")
  is_saved: Boolean
  is_shareable: Boolean
  is_sold: Boolean
  is_unique: Boolean
  displayLabel: String
  layer(id: String): ArtworkLayer
  layers: [ArtworkLayer]
  literature(format: Format): String
  manufacturer(format: Format): String
  medium: String
  metric: String @deprecated(reason: "Prefer to use \`dimensions\`. [Will be removed in v2]")
  meta: ArtworkMeta
  myLotStanding(live: Boolean = null): [LotStanding!]

  """[DO NOT USE] Weekly pageview data (static)."""
  pageviews: Int @deprecated(reason: "This is for an AB test and will be imminently deprecated. [Will be removed in v2]")
  partner(
    """Use whatever is in the original response instead of making a request"""
    shallow: Boolean
  ): Partner
  pickup_available: Boolean
  price: String @deprecated(reason: "Prefer to use \`listPrice\`. [Will be removed in v2]")
  priceCents: PriceCents @deprecated(reason: "Prefer to use \`listPrice\`. [Will be removed in v2]")
  listPrice: ListPrice
  price_currency: String
  priceIncludesTax: Boolean
  priceIncludesTaxDisplay: String

  """Is this work available for shipping only within the Contenental US?"""
  shipsToContinentalUSOnly: Boolean @deprecated(reason: "Prefer to use \`onlyShipsDomestically\`. [Will be removed in v2]")

  """Is this work only available for shipping domestically?"""
  onlyShipsDomestically: Boolean

  """The string that describes domestic and international shipping."""
  shippingInfo: String

  """
  Minimal location information describing from where artwork will be shipped.
  """
  shippingOrigin: String

  """The country an artwork will be shipped from."""
  shippingCountry: String
  provenance(format: Format): String
  publisher(format: Format): String
  related(size: Int): [Artwork]
  sale: Sale
  sale_artwork(sale_id: String = null): SaleArtwork
  sale_message: String
  series(format: Format): String
  show(size: Int, active: Boolean, at_a_fair: Boolean, sort: PartnerShowSorts): PartnerShow
  v2_shows(size: Int, active: Boolean, at_a_fair: Boolean, sort: ShowSort): [Show]
  shows(size: Int, active: Boolean, at_a_fair: Boolean, sort: PartnerShowSorts): [PartnerShow]
  signature(format: Format): String
  title: String

  """
  Formatted artwork metadata, including artist, title, date and partner; e.g., 'Andy Warhol, Truck, 1980, Westward Gallery'.
  """
  to_s: String @deprecated(reason: "Prefer to use \`formattedMetadata\`. [Will be removed in v2]")

  """Whether this Artwork is Published of not"""
  published: Boolean!

  """
  If the category is video, then it returns the href for the (youtube/vimeo) video, otherwise returns the website from CMS
  """
  website: String
  width: String @deprecated(reason: "Prefer to use \`dimensions\`. [Will be removed in v2]")
  framed: ArtworkInfoRow
  signatureInfo: ArtworkInfoRow
  conditionDescription: ArtworkInfoRow

  """Returns true when artwork has a certificate of authenticity"""
  hasCertificateOfAuthenticity: Boolean

  """
  Returns the display label and detail for artwork certificate of authenticity
  """
  certificateOfAuthenticity: ArtworkInfoRow

  """
  If you need to render artwork dimensions as a string, prefer the \`Artwork#dimensions\` field
  """
  widthCm: Float

  """
  If you need to render artwork dimensions as a string, prefer the \`Artwork#dimensions\` field
  """
  heightCm: Float

  """score assigned to an artwork based on its dimensions"""
  sizeScore: Float
}

type ArtworkLayer {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID."""
  id: ID!
  artworks: [Artwork]

  """A connection of artworks from a Layer."""
  artworksConnection(after: String, first: Int, before: String, last: Int): ArtworkConnection
  description: String
  href: String
  name: String
  type: String
}

type ArtworkMeta {
  description(limit: Int = 155): String
  image: String
  share: String
  title: String
}

"""The results for one of the requested aggregations"""
type ArtworksAggregationResults {
  counts: [AggregationCount]
  slice: ArtworkAggregation
}

enum ArtworkSorts {
  availability_desc @deprecated(reason: "Prefer to use \`AVAILABILITY_DESC\`. [Will be removed in v2]")
  created_at_asc @deprecated(reason: "Prefer to use \`CREATED_AT_ASC\`. [Will be removed in v2]")
  created_at_desc @deprecated(reason: "Prefer to use \`CREATED_AT_DESC\`. [Will be removed in v2]")
  deleted_at_asc @deprecated(reason: "Prefer to use \`DELETED_AT_ASC\`. [Will be removed in v2]")
  deleted_at_desc @deprecated(reason: "Prefer to use \`DELETED_AT_DESC\`. [Will be removed in v2]")
  iconicity_desc @deprecated(reason: "Prefer to use \`ICONICITY_DESC\`. [Will be removed in v2]")
  merchandisability_desc @deprecated(reason: "Prefer to use \`MERCHANDISABILITY_DESC\`. [Will be removed in v2]")
  published_at_asc @deprecated(reason: "Prefer to use \`PUBLISHED_AT_ASC\`. [Will be removed in v2]")
  published_at_desc @deprecated(reason: "Prefer to use \`PUBLISHED_AT_DESC\`. [Will be removed in v2]")
  partner_updated_at_desc @deprecated(reason: "Prefer to use \`PARTNER_UPDATED_AT_DESC\`. [Will be removed in v2]")
  title_asc @deprecated(reason: "Prefer to use \`TITLE_ASC\`. [Will be removed in v2]")
  title_desc @deprecated(reason: "Prefer to use \`TITLE_DESC\`. [Will be removed in v2]")
  AVAILABILITY_DESC
  CREATED_AT_ASC
  CREATED_AT_DESC
  DELETED_AT_ASC
  DELETED_AT_DESC
  ICONICITY_DESC
  MERCHANDISABILITY_DESC
  PARTNER_UPDATED_AT_DESC
  PUBLISHED_AT_ASC
  PUBLISHED_AT_DESC
  TITLE_ASC
  TITLE_DESC
}

type ArtworkVersion {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Artwork title"""
  title: String

  """The Image id"""
  defaultImageID: String

  """The artists related to this Artwork Version"""
  artists: String

  """The names for the artists related to this Artwork Version"""
  artistNames: String

  """The image representing the Artwork Version"""
  image: Image
}

"""An asset which is assigned to a consignment submission"""
type Asset {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """The convection submission ID"""
  submission_id: String

  """The gemini token for the asset"""
  gemini_token: String

  """The type of the asset"""
  asset_type: String
}

"""Fields of an attachment (currently from Radiation)"""
type Attachment {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Content type of file."""
  content_type: String!

  """File name."""
  file_name: String!
  download_url: String!
}

"""Collection of fields that describe attribution class"""
type AttributionClass {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Shortest form of attribution class display"""
  name: String

  """
  Descriptive phrase used as companion for attribution class name display
  """
  info: String

  """Longer version of attribution class display"""
  short_description: String @deprecated(reason: "Prefer to use \`shortDescription\`. [Will be removed in v2]")

  """Long descriptive phrase used as companion for short_description"""
  long_description: String @deprecated(reason: "Prefer to use \`longDescription\`. [Will be removed in v2]")

  """Longer version of attribution class display"""
  shortDescription: String

  """Long descriptive phrase used as companion for short_description"""
  longDescription: String
}

type AuctionArtworkGrid implements ArtworkContextGrid {
  title: String
  ctaTitle: String
  ctaHref: String
  artworks(after: String, first: Int, before: String, last: Int): ArtworkConnection
}

"""In centimeters."""
type AuctionLotDimensions {
  width: Float
  height: Float
  depth: Float
}

type AuctionLotEstimate {
  low: Float
  high: Float
  display: String
}

type AuctionLotImages {
  larger: Image
  thumbnail: Image
}

type AuctionResult implements Node {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!
  title: String
  artist_id: String!
  date(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  date_text: String
  medium_text: String
  category_text: String
  dimension_text: String
  dimensions: AuctionLotDimensions
  organization: String
  sale_date(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  sale_date_text: String
  sale_title: String
  currency: String
  description: String
  external_url: String
  images: AuctionLotImages
  estimate: AuctionLotEstimate
  price_realized: AuctionResultPriceRealized
}

"""A connection to a list of items."""
type AuctionResultConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [AuctionResultEdge]
  pageCursors: PageCursors
  totalCount: Int
}

"""An edge in a connection."""
type AuctionResultEdge {
  """The item at the end of the edge"""
  node: AuctionResult

  """A cursor for use in pagination"""
  cursor: String!
}

type AuctionResultPriceRealized {
  cents: Float
  cents_usd: Float
  display(
    """Passes in to numeral, such as \`'0.00'\`"""
    format: String = ""
  ): String
}

enum AuctionResultSorts {
  DATE_DESC
  PRICE_AND_DATE_DESC
  ESTIMATE_AND_DATE_DESC
}

type Author {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID."""
  id: ID!
  name: String
  href: String @deprecated(reason: "Profiles have been removed and thus author hrefs don't exist anymore. [Will be removed in v2]")
  profile_handle: String
}

type Bidder {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!
  created_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  pin: String
  qualified_for_bidding: Boolean
  user: User
  sale: Sale
}

type BidderPosition {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!
  created_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  updated_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  processed_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  display_max_bid_amount_dollars: String @deprecated(reason: "Prefer to use \`max_bid\`. [Will be removed in v2]")
  display_suggested_next_bid_dollars: String @deprecated(reason: "Prefer to use \`suggested_next_bid\`. [Will be removed in v2]")
  highest_bid: HighestBid
  is_active: Boolean
  is_retracted: Boolean
  is_with_bid_max: Boolean
  is_winning: Boolean
  max_bid: BidderPositionMaxBid
  max_bid_amount_cents: Int @deprecated(reason: "Prefer to use \`max_bid\`. [Will be removed in v2]")
  sale_artwork: SaleArtwork
  suggested_next_bid: BidderPositionSuggestedNextBid
  suggested_next_bid_cents: Int @deprecated(reason: "Prefer to use \`suggested_next_bid\`. [Will be removed in v2]")
}

input BidderPositionInput {
  sale_id: String!
  artwork_id: String!
  max_bid_amount_cents: Float!
  clientMutationId: String
}

type BidderPositionMaxBid {
  """A formatted price with various currency formatting options."""
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """An amount of money expressed in cents."""
  cents: Float

  """A pre-formatted price."""
  display: String
}

type BidderPositionPayload {
  result: BidderPositionResult
  clientMutationId: String
}

type BidderPositionResult {
  status: String!
  message_header: String
  message_description_md: String
  position: BidderPosition
}

type BidderPositionSuggestedNextBid {
  """A formatted price with various currency formatting options."""
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """An amount of money expressed in cents."""
  cents: Float

  """A pre-formatted price."""
  display: String
}

type BidIncrement {
  amount: Int
  from: Int
  to: Int
}

type BidIncrementsFormatted {
  cents: Float
  display: String
}

input buyerAcceptOfferInput {
  """Offer ID"""
  offerId: String!
  clientMutationId: String
}

type buyerAcceptOfferPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

input buyerCounterOfferInput {
  """The ID of the offer to counter"""
  offerId: String!

  """Offer price"""
  offerPrice: MoneyInput

  """Offer note"""
  note: String
  clientMutationId: String
}

type buyerCounterOfferPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

input buyerRejectOfferInput {
  """Offer ID"""
  offerId: String!

  """Reason for rejecting offer"""
  rejectReason: CancelReasonType
  clientMutationId: String
}

type buyerRejectOfferPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

type BuyersPremium {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!

  """A formatted price with various currency formatting options."""
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  cents: Int
  percent: Float
}

type BuyOrder implements Order {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Order Mode"""
  mode: OrderModeEnum

  """Currency code of this order"""
  currencyCode: String

  """State of the order"""
  state: String

  """Reason for current state"""
  stateReason: String

  """Uniq user-friendly code of the order"""
  code: String

  """Order Requested Fulfillment"""
  requestedFulfillment: RequestedFulfillment

  """Item total in cents"""
  itemsTotalCents: Int

  """A formatted price with various currency formatting options."""
  itemsTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Total list price in cents"""
  totalListPriceCents: Int

  """A formatted price with various currency formatting options."""
  totalListPrice(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Shipping total in cents"""
  shippingTotalCents: Int

  """A formatted price with various currency formatting options."""
  shippingTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Tax total in cents"""
  taxTotalCents: Int

  """A formatted price with various currency formatting options."""
  taxTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Transaction fee in cents"""
  transactionFeeCents: Int

  """A formatted price with various currency formatting options."""
  transactionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Commission fee in cents"""
  commissionFeeCents: Int

  """A formatted price with various currency formatting options."""
  commissionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Partner commission rate used to calculate commission fee"""
  commissionRate: Float

  """Partner commission rate formatted into percentage"""
  displayCommissionRate: String

  """Buyer total in cents"""
  buyerTotalCents: Int

  """A formatted price with various currency formatting options."""
  buyerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Seller total in cents"""
  sellerTotalCents: Int

  """A formatted price with various currency formatting options."""
  sellerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """List of order line items"""
  lineItems: OrderLineItemConnection

  """Seller of this order"""
  seller: OrderParty

  """Buyer of this order"""
  buyer: OrderParty

  """Credit card on this order"""
  creditCard: CreditCard

  """Whether or not the last attempt to charge the buyer failed"""
  lastTransactionFailed: Boolean
  lastApprovedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  lastSubmittedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  updatedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  createdAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  stateUpdatedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  stateExpiresAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """Buyer phone number"""
  buyerPhoneNumber: String
}

type CalculatedCost {
  bidAmount: Money
  buyersPremium: Money
  subtotal: Money
}

enum CancelReasonType {
  BUYER_REJECTED
  SELLER_LAPSED
  SELLER_REJECTED
  SELLER_REJECTED_OFFER_TOO_LOW
  SELLER_REJECTED_SHIPPING_UNAVAILABLE
  SELLER_REJECTED_ARTWORK_UNAVAILABLE
  SELLER_REJECTED_OTHER
}

"""Autogenerated input type of CaptureHold"""
input CaptureHoldInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """Globally unique ID for the hold."""
  inventoryHoldId: ID!

  """
  Globally unique ID for the requester of the hold. Ex. Exchange Order ID.
  """
  referenceId: String!
}

"""Autogenerated return type of CaptureHold"""
type CaptureHoldPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  holdOrError: InventoryHoldOrErrorUnion!
}

"""Fields of partner category (currently from Gravity)."""
type Category {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  category_type: String
  internal: Boolean
  name: String
}

enum CategoryType {
  GALLERY
  INSTITUTION
}

type City {
  slug: String
  name: String
  coordinates: LatLng
  shows(
    sort: PartnerShowSorts

    """Filter shows by chronological event status"""
    status: EventStatus = CURRENT

    """Filter shows by partner type"""
    partnerType: PartnerShowPartnerType

    """
    Only used when status is CLOSING_SOON or UPCOMING. Number of days used to filter upcoming and closing soon shows
    """
    dayThreshold: Int

    """Whether to include local discovery stubs"""
    includeStubShows: Boolean

    """
    [DEPRECATED: prefer includeStubShows] Whether to include stub shows or not
    """
    discoverable: Boolean
    after: String
    first: Int
    before: String
    last: Int
  ): ShowConnection
  fairs(sort: FairSorts, status: EventStatus, after: String, first: Int, before: String, last: Int): FairConnection
  sponsoredContent: CitySponsoredContent
}

type CitySponsoredContent {
  introText: String
  artGuideUrl: String
  featuredShows: [Show]
  shows(sort: PartnerShowSorts, status: EventStatus, after: String, first: Int, before: String, last: Int): ShowConnection
}

type Collection implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  artworks_connection(after: String, first: Int, before: String, last: Int, private: Boolean = false, sort: CollectionSorts): ArtworkConnection
  description: String!
  default: Boolean!
  name: String!
  private: Boolean!
  slug: String!
}

enum CollectionSorts {
  POSITION_ASC
  POSITION_DESC
}

type CollectorProfileType {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!
  email: String
  name: String
  confirmed_buyer_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  collector_level: Int
  self_reported_purchases: String
  loyalty_applicant_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  professional_buyer_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  professional_buyer_applied_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  intents: [String]
}

"""Autogenerated input type of AddInitialOfferToOrder"""
input CommerceAddInitialOfferToOrderInput {
  amountCents: Int!

  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  note: String
  orderId: ID!
}

"""Autogenerated return type of AddInitialOfferToOrder"""
type CommerceAddInitialOfferToOrderPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""An generic error type for mutations"""
type CommerceApplicationError {
  """Code of this error"""
  code: String!

  """What caused the error"""
  data: String

  """Type of this error"""
  type: String!
}

"""Autogenerated input type of ApproveOrder"""
input CommerceApproveOrderInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  id: ID!
}

"""Autogenerated return type of ApproveOrder"""
type CommerceApproveOrderPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of BuyerAcceptOffer"""
input CommerceBuyerAcceptOfferInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  offerId: ID!
}

"""Autogenerated return type of BuyerAcceptOffer"""
type CommerceBuyerAcceptOfferPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of BuyerCounterOffer"""
input CommerceBuyerCounterOfferInput {
  amountCents: Int!

  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  note: String
  offerId: ID!
}

"""Autogenerated return type of BuyerCounterOffer"""
type CommerceBuyerCounterOfferPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of BuyerRejectOffer"""
input CommerceBuyerRejectOfferInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  offerId: ID!
  rejectReason: CommerceCancelReasonTypeEnum
}

"""Autogenerated return type of BuyerRejectOffer"""
type CommerceBuyerRejectOfferPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

type CommerceBuyOrder implements CommerceOrder {
  buyer: CommerceOrderPartyUnion!
  buyerPhoneNumber: String
  buyerTotalCents: Int
  code: String!
  commissionFeeCents: Int
  commissionRate: Float
  createdAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String!
  creditCardId: String
  currencyCode: String!
  displayCommissionRate: String
  id: ID!
  internalID: ID!

  """
  Item total in cents, for Offer Orders this field reflects current offer
  """
  itemsTotalCents: Int
  lastApprovedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  lastSubmittedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  lastTransactionFailed: Boolean
  lineItems(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
  ): CommerceLineItemConnection
  mode: CommerceOrderModeEnum
  requestedFulfillment: CommerceRequestedFulfillmentUnion
  seller: CommerceOrderPartyUnion!
  sellerTotalCents: Int
  shippingTotalCents: Int
  state: CommerceOrderStateEnum!
  stateExpiresAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  stateReason: String
  stateUpdatedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  taxTotalCents: Int
  totalListPriceCents: Int!
  transactionFeeCents: Int
  updatedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String!
  buyerDetails: OrderParty
  sellerDetails: OrderParty
  creditCard: CreditCard
  itemsTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  sellerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  commissionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  totalListPrice(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  buyerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  taxTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  shippingTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  transactionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
}

enum CommerceCancelReasonTypeEnum {
  """cancelation reason is: admin_canceled"""
  ADMIN_CANCELED

  """cancelation reason is: buyer_lapsed"""
  BUYER_LAPSED

  """cancelation reason is: buyer_rejected"""
  BUYER_REJECTED

  """cancelation reason is: seller_lapsed"""
  SELLER_LAPSED

  """cancelation reason is: seller_rejected"""
  SELLER_REJECTED

  """cancelation reason is: seller_rejected_artwork_unavailable"""
  SELLER_REJECTED_ARTWORK_UNAVAILABLE

  """cancelation reason is: seller_rejected_offer_too_low"""
  SELLER_REJECTED_OFFER_TOO_LOW

  """cancelation reason is: seller_rejected_other"""
  SELLER_REJECTED_OTHER

  """cancelation reason is: seller_rejected_shipping_unavailable"""
  SELLER_REJECTED_SHIPPING_UNAVAILABLE
}

"""Autogenerated input type of ConfirmFulfillment"""
input CommerceConfirmFulfillmentInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  id: ID!
}

"""Autogenerated return type of ConfirmFulfillment"""
type CommerceConfirmFulfillmentPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of ConfirmPickup"""
input CommerceConfirmPickupInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  id: ID!
}

"""Autogenerated return type of ConfirmPickup"""
type CommerceConfirmPickupPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of CreateOfferOrderWithArtwork"""
input CommerceCreateOfferOrderWithArtworkInput {
  """Artwork Id"""
  artworkId: String!

  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """EditionSet Id"""
  editionSetId: String

  """
  When set to false, we will create a new order. Otherwise if current user has
  pending/submitted orders on same artwork/edition with same quantity, we will return that
  """
  findActiveOrCreate: Boolean = true

  """Number of items in the line item, default is 1"""
  quantity: Int
}

"""Autogenerated return type of CreateOfferOrderWithArtwork"""
type CommerceCreateOfferOrderWithArtworkPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """
  A union of success/failure. If find_active_or_create is not false, it will
  return existing pending/submitted order for current user if exists, otherwise
  it will return newly created order
  """
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of CreateOrderWithArtwork"""
input CommerceCreateOrderWithArtworkInput {
  """Artwork Id"""
  artworkId: String!

  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """EditionSet Id"""
  editionSetId: String

  """Number of items in the line item"""
  quantity: Int
}

"""Autogenerated return type of CreateOrderWithArtwork"""
type CommerceCreateOrderWithArtworkPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Date in YYYY-MM-DD format"""
scalar CommerceDate

"""An ISO 8601 datetime"""
scalar CommerceDateTime

"""Autogenerated input type of FixFailedPayment"""
input CommerceFixFailedPaymentInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  creditCardId: String!
  offerId: ID!
}

"""Autogenerated return type of FixFailedPayment"""
type CommerceFixFailedPaymentPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of FulfillAtOnce"""
input CommerceFulfillAtOnceInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  fulfillment: CommerceFulfillmentAttributes!
  id: ID!
}

"""Autogenerated return type of FulfillAtOnce"""
type CommerceFulfillAtOncePayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""A Fulfillment for an order"""
type CommerceFulfillment {
  courier: String!
  createdAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String!
  estimatedDelivery(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  id: ID!
  internalID: ID!
  notes: String
  trackingId: String
  updatedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String!
}

"""Attributes of a Fulfillment"""
input CommerceFulfillmentAttributes {
  courier: String!
  estimatedDelivery: CommerceDate
  notes: String
  trackingId: String
}

"""The connection type for Fulfillment."""
type CommerceFulfillmentConnection {
  """A list of edges."""
  edges: [CommerceFulfillmentEdge]

  """A list of nodes."""
  nodes: [CommerceFulfillment]

  """Information to aid in pagination."""
  pageInfo: CommercePageInfo!
}

"""An edge in a connection."""
type CommerceFulfillmentEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of the edge."""
  node: CommerceFulfillment
}

"""A Line Item"""
type CommerceLineItem {
  artworkId: String!
  artworkVersionId: String!
  commissionFeeCents: Int
  createdAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String!
  editionSetId: String
  fulfillments(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
  ): CommerceFulfillmentConnection
  id: ID!
  internalID: ID!
  listPriceCents: Int!
  order: CommerceOrder!
  priceCents: Int! @deprecated(reason: "switch to use listPriceCents")
  quantity: Int!
  shippingTotalCents: Int
  updatedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String!
  artwork: Artwork
  artworkVersion: ArtworkVersion
  shippingTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  listPrice(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  commissionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
}

"""The connection type for LineItem."""
type CommerceLineItemConnection {
  """A list of edges."""
  edges: [CommerceLineItemEdge]

  """A list of nodes."""
  nodes: [CommerceLineItem]

  """Information to aid in pagination."""
  pageInfo: CommercePageInfo!
}

"""An edge in a connection."""
type CommerceLineItemEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of the edge."""
  node: CommerceLineItem
}

"""An Offer"""
type CommerceOffer {
  amountCents: Int!
  buyerTotalCents: Int
  createdAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String!
  creatorId: String!
  currencyCode: String!
  from: CommerceOrderPartyUnion!
  fromParticipant: CommerceOrderParticipantEnum
  id: ID!
  internalID: ID!
  note: String
  order: CommerceOrder!
  respondsTo: CommerceOffer
  shippingTotalCents: Int
  submittedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  taxTotalCents: Int
  fromDetails: OrderParty
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  taxTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  shippingTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  buyerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
}

"""The connection type for Offer."""
type CommerceOfferConnection {
  """A list of edges."""
  edges: [CommerceOfferEdge]

  """A list of nodes."""
  nodes: [CommerceOffer]

  """Information to aid in pagination."""
  pageInfo: CommercePageInfo!
}

"""An edge in a connection."""
type CommerceOfferEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of the edge."""
  node: CommerceOffer
}

type CommerceOfferOrder implements CommerceOrder {
  awaitingResponseFrom: CommerceOrderParticipantEnum
  buyer: CommerceOrderPartyUnion!
  buyerPhoneNumber: String
  buyerTotalCents: Int
  code: String!
  commissionFeeCents: Int
  commissionRate: Float
  createdAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String!
  creditCardId: String
  currencyCode: String!
  displayCommissionRate: String
  id: ID!
  internalID: ID!

  """
  Item total in cents, for Offer Orders this field reflects current offer
  """
  itemsTotalCents: Int
  lastApprovedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """Last submitted offer"""
  lastOffer: CommerceOffer
  lastSubmittedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  lastTransactionFailed: Boolean
  lineItems(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
  ): CommerceLineItemConnection
  mode: CommerceOrderModeEnum
  myLastOffer: CommerceOffer
  offers(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int
    fromId: String
    fromType: String

    """Returns the last _n_ elements from the list."""
    last: Int
  ): CommerceOfferConnection
  requestedFulfillment: CommerceRequestedFulfillmentUnion
  seller: CommerceOrderPartyUnion!
  sellerTotalCents: Int
  shippingTotalCents: Int
  state: CommerceOrderStateEnum!
  stateExpiresAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  stateReason: String
  stateUpdatedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  taxTotalCents: Int
  totalListPriceCents: Int!
  transactionFeeCents: Int
  updatedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String!
  buyerDetails: OrderParty
  sellerDetails: OrderParty
  creditCard: CreditCard
  itemsTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  sellerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  commissionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  totalListPrice(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  buyerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  taxTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  shippingTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  transactionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  offerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
}

"""Order"""
interface CommerceOrder {
  buyer: CommerceOrderPartyUnion!
  buyerPhoneNumber: String
  buyerTotalCents: Int
  code: String!
  commissionFeeCents: Int
  commissionRate: Float
  createdAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String!
  creditCardId: String
  currencyCode: String!
  displayCommissionRate: String
  id: ID!
  internalID: ID!

  """
  Item total in cents, for Offer Orders this field reflects current offer
  """
  itemsTotalCents: Int
  lastApprovedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  lastSubmittedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  lastTransactionFailed: Boolean
  lineItems(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
  ): CommerceLineItemConnection
  mode: CommerceOrderModeEnum
  requestedFulfillment: CommerceRequestedFulfillmentUnion
  seller: CommerceOrderPartyUnion!
  sellerTotalCents: Int
  shippingTotalCents: Int
  state: CommerceOrderStateEnum!
  stateExpiresAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  stateReason: String
  stateUpdatedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  taxTotalCents: Int
  totalListPriceCents: Int!
  transactionFeeCents: Int
  updatedAt(
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String!
  buyerDetails: OrderParty
  sellerDetails: OrderParty
  creditCard: CreditCard
  itemsTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  sellerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  commissionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  totalListPrice(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  buyerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  taxTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  shippingTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  transactionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
}

"""Order Action data"""
type CommerceOrderActionData {
  clientSecret: String!
}

"""Fields to sort by"""
enum CommerceOrderConnectionSortEnum {
  """
  Sort by the timestamp the state of the order expires at in ascending order
  """
  STATE_EXPIRES_AT_ASC

  """
  Sort by the timestamp the state of the order expires at in descending order
  """
  STATE_EXPIRES_AT_DESC

  """
  Sort by the timestamp the state of order was last updated in ascending order
  """
  STATE_UPDATED_AT_ASC

  """
  Sort by the timestamp the state of order was last updated in descending order
  """
  STATE_UPDATED_AT_DESC

  """Sort by the timestamp the order was last updated in ascending order"""
  UPDATED_AT_ASC

  """Sort by the timestamp the order was last updated in descending order"""
  UPDATED_AT_DESC
}

"""The connection type for Order."""
type CommerceOrderConnectionWithTotalCount {
  """A list of edges."""
  edges: [CommerceOrderEdge]

  """A list of nodes."""
  nodes: [CommerceOrder]
  pageCursors: CommercePageCursors

  """Information to aid in pagination."""
  pageInfo: CommercePageInfo!
  totalCount: Int
  totalPages: Int
}

"""An edge in a connection."""
type CommerceOrderEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of the edge."""
  node: CommerceOrder
}

enum CommerceOrderFulfillmentTypeEnum {
  """fulfillment type is: pickup"""
  PICKUP

  """fulfillment type is: ship"""
  SHIP
}

enum CommerceOrderModeEnum {
  """Buy Order"""
  BUY

  """Offer Order"""
  OFFER
}

"""Represents either a resolved Order or a potential failure"""
union CommerceOrderOrFailureUnion = CommerceOrderRequiresAction | CommerceOrderWithMutationFailure | CommerceOrderWithMutationSuccess

enum CommerceOrderParticipantEnum {
  """Participant on the buyer side"""
  BUYER

  """Participant on the seller side"""
  SELLER
}

"""Represents either a partner or a user"""
union CommerceOrderPartyUnion = CommercePartner | CommerceUser

"""Data reflecting actions required"""
type CommerceOrderRequiresAction {
  """Data related to action needed"""
  actionData: CommerceOrderActionData!
}

enum CommerceOrderStateEnum {
  """order is abandoned by buyer and never submitted"""
  ABANDONED

  """order is approved by seller"""
  APPROVED

  """order is canceled"""
  CANCELED

  """order is fulfilled by seller"""
  FULFILLED

  """order is still pending submission by buyer"""
  PENDING

  """order is refunded after being approved or fulfilled"""
  REFUNDED

  """order is submitted by buyer"""
  SUBMITTED
}

"""An error response for changes to an order"""
type CommerceOrderWithMutationFailure {
  error: CommerceApplicationError!
}

"""A successfully returned order type"""
type CommerceOrderWithMutationSuccess {
  order: CommerceOrder!
}

type CommercePageCursor {
  """first cursor on the page"""
  cursor: String!

  """is this the current page?"""
  isCurrent: Boolean!

  """page number out of totalPages"""
  page: Int!
}

type CommercePageCursors {
  around: [CommercePageCursor!]!

  """optional, may be included in field around"""
  first: CommercePageCursor

  """optional, may be included in field around"""
  last: CommercePageCursor
  previous: CommercePageCursor
}

"""Information about pagination in a connection."""
type CommercePageInfo {
  """When paginating forwards, the cursor to continue."""
  endCursor: String

  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String
}

type CommercePartner {
  id: String!
  type: String!
}

type CommercePickup {
  fulfillmentType: String!
  phoneNumber: String
}

"""Autogenerated input type of RejectOrder"""
input CommerceRejectOrderInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  id: ID!
}

"""Autogenerated return type of RejectOrder"""
type CommerceRejectOrderPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Represents either a shipping information or pickup"""
union CommerceRequestedFulfillmentUnion = CommercePickup | CommerceShip

"""Autogenerated input type of SellerAcceptOffer"""
input CommerceSellerAcceptOfferInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  offerId: ID!
}

"""Autogenerated return type of SellerAcceptOffer"""
type CommerceSellerAcceptOfferPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of SellerCounterOffer"""
input CommerceSellerCounterOfferInput {
  amountCents: Int!

  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  note: String
  offerId: ID!
}

"""Autogenerated return type of SellerCounterOffer"""
type CommerceSellerCounterOfferPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of SellerRejectOffer"""
input CommerceSellerRejectOfferInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  offerId: ID!
  rejectReason: CommerceCancelReasonTypeEnum
}

"""Autogenerated return type of SellerRejectOffer"""
type CommerceSellerRejectOfferPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of SetPayment"""
input CommerceSetPaymentInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  creditCardId: String!
  id: ID!
}

"""Autogenerated return type of SetPayment"""
type CommerceSetPaymentPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of SetShipping"""
input CommerceSetShippingInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  fulfillmentType: CommerceOrderFulfillmentTypeEnum!
  id: ID!
  phoneNumber: String
  shipping: CommerceShippingAttributes
}

"""Autogenerated return type of SetShipping"""
type CommerceSetShippingPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

type CommerceShip {
  addressLine1: String
  addressLine2: String
  city: String
  country: String
  name: String
  phoneNumber: String
  postalCode: String
  region: String
}

"""Shipping information"""
input CommerceShippingAttributes {
  addressLine1: String
  addressLine2: String
  city: String
  country: String
  name: String
  phoneNumber: String
  postalCode: String
  region: String
}

"""Autogenerated input type of SubmitOrder"""
input CommerceSubmitOrderInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  id: ID!
}

"""Autogenerated return type of SubmitOrder"""
type CommerceSubmitOrderPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of SubmitOrderWithOffer"""
input CommerceSubmitOrderWithOfferInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  confirmedSetupIntentId: String
  offerId: ID!
}

"""Autogenerated return type of SubmitOrderWithOffer"""
type CommerceSubmitOrderWithOfferPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

"""Autogenerated input type of SubmitPendingOffer"""
input CommerceSubmitPendingOfferInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  offerId: ID!
}

"""Autogenerated return type of SubmitPendingOffer"""
type CommerceSubmitPendingOfferPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """A union of success/failure"""
  orderOrError: CommerceOrderOrFailureUnion!
}

type CommerceUser {
  id: String!
}

type ConditionReportRequest {
  internalID: ID!
  saleArtworkID: ID
  userID: ID
}

input ConfirmPickupInput {
  """Order ID"""
  orderId: String!
  clientMutationId: String
}

type ConfirmPickupPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

"""A work to be consigned to the user"""
type ConsignmentSubmission {
  """An optional type-specific ID."""
  id: ID

  """The gravity ID for an Artist"""
  artist_id: String!

  """Does the artwork come with an certificate of authenticity?"""
  authenticity_certificate: Boolean

  """The set in which to put the work"""
  category: SubmissionCategoryAggregation

  """The depth of the work"""
  depth: String

  """A string, either CM or IN"""
  dimensions_metric: SubmissionDimensionAggregation

  """Is the work a part of an edition"""
  edition: Boolean

  """The number of the individual work if in a set"""
  edition_number: String

  """The whole size of the set of works"""
  edition_size: String

  """The height of the work"""
  height: String

  """The city where the work currently resides"""
  location_city: String

  """The country where the work currently resides"""
  location_country: String

  """The state where the work currently resides"""
  location_state: String

  """The materials in which the work is created"""
  medium: String

  """The history of an work"""
  provenance: String

  """Is this work signed?"""
  signature: Boolean

  """The name of the work"""
  title: String

  """The internal state of the work, e.g. draft/submitted"""
  state: SubmissionStateAggregation

  """The width of the work"""
  width: String

  """The year the work was created"""
  year: String

  """The user who submitted the work"""
  user_id: ID
  artist: Artist
}

"""A connection to a list of items."""
type ConsignmentSubmissionConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ConsignmentSubmissionEdge]
}

"""An edge in a connection."""
type ConsignmentSubmissionEdge {
  """The item at the end of the edge"""
  node: ConsignmentSubmission

  """A cursor for use in pagination"""
  cursor: String!
}

type Convection {
  geminiTemplateKey: String!
}

"""A conversation."""
type Conversation implements Node {
  """A globally unique ID."""
  __id: ID!

  """An optional type-specific ID."""
  id: ID

  """Gravity inquiry id."""
  inquiry_id: String

  """The participant who initiated the conversation"""
  from: ConversationInitiator!

  """The participant(s) responding to the conversation"""
  to: ConversationResponder!
  buyer_outcome: String
  buyer_outcome_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  created_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  purchase_request: Boolean @deprecated(reason: "Purchase requests are not supported. Replaced by buy now. [Will be removed in v2]")
  from_last_viewed_message_id: String
  initial_message: String!

  """This is a snippet of text from the last message."""
  last_message: String
  last_message_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """Impulse id of the last message."""
  last_message_id: String

  """True if user/conversation initiator is a recipient."""
  is_last_message_to_user: Boolean

  """Timestamp if the user opened the last message, null in all other cases"""
  last_message_open: String @deprecated(reason: "Prefer to use \`unread\`. [Will be removed in v2]")

  """
  Delivery id if the user is a recipient of the last message, null otherwise.
  """
  last_message_delivery_id: String

  """Only the artworks discussed in the conversation."""
  artworks: [Artwork]

  """The artworks and/or partner shows discussed in the conversation."""
  items: [ConversationItem]

  """A connection for all messages in a single conversation"""
  messages(sort: sort, after: String, first: Int, before: String, last: Int): MessageConnection

  """True if there is an unread message by the user."""
  unread: Boolean
}

"""A connection to a list of items."""
type ConversationConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ConversationEdge]
  totalUnreadCount: Int
}

"""An edge in a connection."""
type ConversationEdge {
  """The item at the end of the edge"""
  node: Conversation

  """A cursor for use in pagination"""
  cursor: String!
}

"""The participant who started the conversation, currently always a User"""
type ConversationInitiator {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """The type of participant, e.g. Partner or User"""
  type: String!
  name: String!
  email: String!
  initials(length: Int = 3): String
}

type ConversationItem {
  item: ConversationItemType
  title: String
  permalink: String
}

union ConversationItemType = Artwork | Show

"""
The participant responding to the conversation, currently always a Partner
"""
type ConversationResponder {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """The type of participant, e.g. Partner or User"""
  type: String!
  name: String!

  """
  An array of Impulse IDs that correspond to all email addresses that messages should be sent to
  """
  reply_to_impulse_ids: [String]!
  initials(length: Int = 3): String
}

input CreateBidderInput {
  sale_id: String!
  clientMutationId: String
}

type CreateBidderPayload {
  bidder: Bidder
  clientMutationId: String
}

input CreateGeminiEntryForAssetInput {
  """The path to the file"""
  source_key: String!

  """The template key, this is \`name\` in the asset request"""
  template_key: String!

  """The S3 bucket where the file was uploaded"""
  source_bucket: String!

  """
  Additional JSON data to pass through gemini, should definitely contain an \`id\` and a \`_type\`
  """
  metadata: JSON!
  clientMutationId: String
}

type CreateGeminiEntryForAssetPayload {
  asset: GeminiEntry
  clientMutationId: String
}

input CreateOfferOrderWithArtworkInput {
  """BSON ID of artwork"""
  artworkId: String!

  """ID of artwork's edition set"""
  editionSetId: String

  """quantity of artwork"""
  quantity: Int

  """
  When set to true, we will not reuse existing pending/submitted order.
  Otherwise if current user has pending/submitted orders on same artwork/edition
  with same quantity, we will return that
  """
  find_active_or_create: Boolean
  clientMutationId: String
}

type CreateOfferOrderWithArtworkPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

input CreateOrderWithArtworkInput {
  """BSON ID of artwork"""
  artworkId: String!

  """ID of artwork's edition set"""
  editionSetId: String

  """quantity of artwork"""
  quantity: Int
  clientMutationId: String
}

type CreateOrderWithArtworkPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

input CreateSubmissionMutationInput {
  """The gravity ID for an Artist"""
  artist_id: String!

  """Does the artwork come with an certificate of authenticity?"""
  authenticity_certificate: Boolean

  """The set in which to put the work"""
  category: SubmissionCategoryAggregation

  """The depth of the work"""
  depth: String

  """A string, either CM or IN"""
  dimensions_metric: SubmissionDimensionAggregation

  """Is the work a part of an edition"""
  edition: Boolean

  """The number of the individual work if in a set"""
  edition_number: String

  """The whole size of the set of works"""
  edition_size: String

  """The height of the work"""
  height: String

  """The city where the work currently resides"""
  location_city: String

  """The country where the work currently resides"""
  location_country: String

  """The state where the work currently resides"""
  location_state: String

  """The materials in which the work is created"""
  medium: String

  """The history of an work"""
  provenance: String

  """Is this work signed?"""
  signature: Boolean

  """The name of the work"""
  title: String

  """The internal state of the work, e.g. draft/submitted"""
  state: SubmissionStateAggregation

  """The width of the work"""
  width: String

  """The year the work was created"""
  year: String

  """The user who submitted the work"""
  user_id: ID
  clientMutationId: String
}

type CreateSubmissionMutationPayload {
  consignment_submission: ConsignmentSubmission
  clientMutationId: String
}

"""An asset which is assigned to a consignment submission"""
type Credentials {
  """The key to use with S3."""
  credentials: String!

  """A base64 encoded version of the S3 policy"""
  policy_encoded: String!

  """The s3 policy document for your request"""
  policy_document: S3PolicyDocumentType!

  """The signature for your asset."""
  signature: String!
}

type CreditCard {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Brand of credit card"""
  brand: String!

  """Name on the credit card"""
  name: String

  """Last four digits on the credit card"""
  last_digits: String!

  """Credit card's expiration month"""
  expiration_month: Int!

  """Credit card's expiration year"""
  expiration_year: Int!

  """Billing address street1"""
  street1: String

  """Billing address street2"""
  street2: String

  """Billing address city"""
  city: String

  """Billing address state"""
  state: String

  """Billing address country code"""
  country: String

  """Billing address postal code"""
  postal_code: String
}

"""A connection to a list of items."""
type CreditCardConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [CreditCardEdge]
}

"""An edge in a connection."""
type CreditCardEdge {
  """The item at the end of the edge"""
  node: CreditCard

  """A cursor for use in pagination"""
  cursor: String!
}

input CreditCardInput {
  token: String!
  oneTimeUse: Boolean = false
  clientMutationId: String
}

type CreditCardMutationFailure {
  mutationError: GravityMutationError
}

type CreditCardMutationSuccess {
  creditCard: CreditCard
  creditCardEdge: CreditCardEdge
}

union CreditCardMutationType = CreditCardMutationSuccess | CreditCardMutationFailure

type CreditCardPayload {
  credit_card: CreditCard @deprecated(reason: "Prefer to use \`creditCardOrError\`. [Will be removed in v2]")
  creditCardOrError: CreditCardMutationType
  clientMutationId: String
}

type CroppedImageUrl {
  width: Int
  height: Int
  url: String
}

type CurrentEvent {
  event: UnderlyingCurrentEvent!
  image: Image

  """The state of the event"""
  status: String

  """Name of the partner associated to the event"""
  partner: String

  """Location and date of the event if available"""
  details: String

  """Name of the event"""
  name: String

  """Link to the event"""
  href: String
}

type DaySchedule {
  start_time: Int
  end_time: Int
  day_of_week: String
}

type DeepZoom {
  Image: DeepZoomImage
}

type DeepZoomImage {
  Format: String
  Overlap: Int
  Size: DeepZoomImageSize
  TileSize: Int
  Url: String
  xmlns: String
}

type DeepZoomImageSize {
  Width: Int
  Height: Int
}

input DeleteCreditCardInput {
  id: String!
  clientMutationId: String
}

type DeleteCreditCardPayload {
  creditCardOrError: CreditCardMutationType
  clientMutationId: String
}

"""Fields of a delivery (currently from Radiation)"""
type Delivery {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Masked email w/ display name."""
  full_transformed_email: String!
  delivered_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  bounced_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  opened_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  clicked_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
}

type dimensions {
  in: String
  cm: String
}

type DoNotUseThisPartner {
  displayName: String
  display_name: String @deprecated(reason: "Use displayName")
  givenName: String
  given_name: String @deprecated(reason: "Use givenName")
  id: ID!
  relativeSize: Int
  relative_size: Int @deprecated(reason: "Use relativeSize")
  slug: String
  subscriptionState: String
  subscription_state: String @deprecated(reason: "Use subscriptionState")
}

type EcommerceError {
  """The error message"""
  type: String!

  """The error message"""
  code: String!

  """
  A data object in JSON format providing additional context about the error.
  """
  data: String
}

input EditableLocation {
  """First line of an address"""
  address: String

  """Second line of an address"""
  address_2: String

  """The city the location is based in"""
  city: String

  """The county the location is based in"""
  country: String

  """An optional display string for the location"""
  summary: String

  """Postal code for a string"""
  postal_code: String

  """The (optional) name of the state for location"""
  state: String

  """The (optional) state code of the state for location"""
  state_code: String
}

type EditionSet implements Sellable {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!
  dimensions: dimensions
  edition_of: String
  is_acquireable: Boolean
  is_offerable: Boolean
  is_for_sale: Boolean
  is_sold: Boolean
  price: String @deprecated(reason: "Prefer to use \`sale_message\`. [Will be removed in v2]")
  listPrice: ListPrice

  """score assigned to an artwork based on its dimensions"""
  sizeScore: Float
  sale_message: String

  """
  If you need to render artwork dimensions as a string, prefer the \`Artwork#dimensions\` field
  """
  widthCm: Float

  """
  If you need to render artwork dimensions as a string, prefer the \`Artwork#dimensions\` field
  """
  heightCm: Float
}

enum EditionSetSorts {
  PRICE_ASC
}

input EndSaleInput {
  sale_id: String
  clientMutationId: String
}

type EndSalePayload {
  sale: Sale
  clientMutationId: String
}

"""A user-readable error"""
type Error {
  """Error code"""
  code: String!

  """Extra data about error."""
  data: JSON

  """A description of the error"""
  message: String!

  """Which input value this error came from"""
  path: [String!]
}

"""A user-readable list of errors"""
type Errors {
  """List of Errors."""
  errors: [Error!]!
}

enum EventStatus {
  closed @deprecated(reason: "Prefer to use \`CLOSED\`. [Will be removed in v2]")
  current @deprecated(reason: "Prefer to use \`CURRENT\`. [Will be removed in v2]")
  running @deprecated(reason: "Prefer to use \`RUNNING\`. [Will be removed in v2]")
  upcoming @deprecated(reason: "Prefer to use \`UPCOMING\`. [Will be removed in v2]")

  """End date is in the past"""
  CLOSED

  """Start date or end date is in the future"""
  CURRENT

  """Start date is in the past and end date is in the future"""
  RUNNING

  """Start date is in the future"""
  UPCOMING

  """End date is in near future"""
  CLOSING_SOON

  """
  Special filtering option which is used to show running and upcoming shows
  """
  RUNNING_AND_UPCOMING
}

type ExternalPartner {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID."""
  id: ID!
  city: String
  name: String
}

type Fair {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  about: String
  followed_content: FollowedContent
  artists(
    """Sorts for artists in a fair"""
    sort: FairArtistSorts
    after: String
    first: Int
    before: String
    last: Int
  ): ArtistConnection
  cached: Int
  banner_size: String
  counts: FairCounts

  """A formatted description of the start to end dates"""
  exhibition_period: String

  """
  A formatted description of when the fair starts or closes or if it is closed
  """
  formattedOpeningHours: String
  has_full_feature: Boolean
  has_homepage_section: Boolean
  has_large_banner: Boolean
  has_listing: Boolean
  hours: String
  href: String
  image: Image
  is_active: Boolean @deprecated(reason: "Prefer to use \`isActive\`. [Will be removed in v2]")

  """Are we currently in the fair's active period?"""
  isActive: Boolean
  links: String
  mobile_image: Image
  is_published: Boolean
  location: Location
  name: String
  profile: Profile

  """
  This connection only supports forward pagination. We're replacing Relay's default cursor with one from Gravity.
  """
  shows_connection(
    """Number of artworks to return"""
    section: String

    """Sorts for shows in a fair"""
    sort: ShowSort
    after: String
    first: Int
    before: String
    last: Int
  ): ShowConnection
  start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  active_start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  organizer: organizer
  published: Boolean @deprecated(reason: "Prefer to use \`is_published\`. [Will be removed in v2]")
  tagline: String
  ticketsLink: String

  """The exhibitors with booths in this fair with letter."""
  exhibitors_grouped_by_name: [FairExhibitorsGroup]

  """Artworks Elastic Search results"""
  filteredArtworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks
  sponsoredContent: FairSponsoredContent
}

enum FairArtistSorts {
  NAME_ASC
  NAME_DESC
}

"""A connection to a list of items."""
type FairConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [FairEdge]
  pageCursors: PageCursors
  totalCount: Int
}

type FairCounts {
  artists(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  partners(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  partner_shows(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
}

"""An edge in a connection."""
type FairEdge {
  """The item at the end of the edge"""
  node: Fair

  """A cursor for use in pagination"""
  cursor: String!
}

type FairExhibitor {
  """A slug ID."""
  id: ID!

  """Exhibitor name"""
  name: String

  """Exhibitors _id"""
  partner_id: String

  """Partner default profile id"""
  profile_id: String
}

type FairExhibitorsGroup {
  """Letter exhibitors group belongs to"""
  letter: String

  """The exhibitor data."""
  exhibitors: [FairExhibitor]
}

enum FairSorts {
  CREATED_AT_ASC
  CREATED_AT_DESC
  NAME_ASC
  NAME_DESC
  START_AT_ASC
  START_AT_DESC
}

type FairSponsoredContent {
  activationText: String
  pressReleaseUrl: String
}

type FeaturedLinkItem {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: String
  href: String
  image: Image
  initials(length: Int = 3): String
  subtitle: String
  title: String
}

type Feedback {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Feedback message"""
  message: String!
}

type FilterArtworks implements Node {
  """The ID of the object."""
  __id: ID!

  """Returns aggregation counts for the given filter query."""
  aggregations: [ArtworksAggregationResults]
  artworks_connection(sort: String, after: String, first: Int, before: String, last: Int): ArtworkConnection
  counts: FilterArtworksCounts
  followed_artists_total: Int @deprecated(reason: "Prefer to use \`counts.followed_artists\`. [Will be removed in v2]")

  """Artwork results."""
  hits: [Artwork]

  """Returns a list of merchandisable artists sorted by merch score."""
  merchandisable_artists: [Artist]
  total: Int @deprecated(reason: "Prefer to use \`counts.total\`. [Will be removed in v2]")
  facet: ArtworkFilterFacet
}

type FilterArtworksCounts {
  total(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  followed_artists(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
}

type FilterPartners {
  aggregations: [PartnersAggregationResults]
  hits: [Partner]
  total: Int
}

type FilterSaleArtworks {
  """Returns aggregation counts for the given filter query."""
  aggregations: [SaleArtworksAggregationResults]
  counts: FilterSaleArtworksCounts

  """Sale Artwork results."""
  hits: [SaleArtwork]
}

type FilterSaleArtworksCounts {
  total(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  followed_artists(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
}

input FixFailedPaymentInput {
  """Offer ID"""
  offerId: ID!

  """Credit card ID"""
  creditCardId: String!
  clientMutationId: String
}

type FixFailedPaymentPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

type FollowArtist {
  artist: Artist
  auto: Boolean

  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!
}

"""A connection to a list of items."""
type FollowArtistConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [FollowArtistEdge]
}

type FollowArtistCounts {
  artists: Int
}

"""An edge in a connection."""
type FollowArtistEdge {
  """The item at the end of the edge"""
  node: FollowArtist

  """A cursor for use in pagination"""
  cursor: String!
}

input FollowArtistInput {
  artist_id: String
  unfollow: Boolean = false
  clientMutationId: String
}

type FollowArtistPayload {
  artist: Artist

  """Popular artists"""
  popular_artists(
    """If true, will exclude followed artists for the user"""
    exclude_followed_artists: Boolean

    """
    Exclude these ids from results, may result in all artists being excluded.
    """
    exclude_artist_ids: [String]

    """Number of results to return"""
    size: Int
  ): PopularArtists
  clientMutationId: String
}

type FollowArtists {
  artists: [Artist]
  counts: FollowArtistCounts
}

type FollowedArtistsArtworksGroup implements Node {
  """A globally unique ID."""
  __id: ID!
  href: String

  """List of artworks in this group."""
  artworks: [Artwork]
  artworksConnection(after: String, first: Int, before: String, last: Int): ArtworkConnection
  artists: String
  summary: String
  image: Image
  published_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
}

"""A connection to a list of items."""
type FollowedArtistsArtworksGroupConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [FollowedArtistsArtworksGroupEdge]
}

"""An edge in a connection."""
type FollowedArtistsArtworksGroupEdge {
  """The item at the end of the edge"""
  node: FollowedArtistsArtworksGroup

  """A cursor for use in pagination"""
  cursor: String!
}

type FollowedContent {
  artists: [Artist]
  galleries: [Partner]
}

"""A connection to a list of items."""
type FollowedFairConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [FollowedFairEdge]
}

"""An edge in a connection."""
type FollowedFairEdge {
  """The item at the end of the edge"""
  node: Fair

  """A cursor for use in pagination"""
  cursor: String!
}

"""A connection to a list of items."""
type FollowedShowConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [FollowedShowEdge]
}

"""An edge in a connection."""
type FollowedShowEdge {
  """The item at the end of the edge"""
  node: Show

  """A cursor for use in pagination"""
  cursor: String!
}

type FollowGene {
  gene: Gene

  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!
}

"""A connection to a list of items."""
type FollowGeneConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [FollowGeneEdge]
}

"""An edge in a connection."""
type FollowGeneEdge {
  """The item at the end of the edge"""
  node: FollowGene

  """A cursor for use in pagination"""
  cursor: String!
}

input FollowGeneInput {
  gene_id: String
  clientMutationId: String
}

type FollowGenePayload {
  gene: Gene
  clientMutationId: String
}

input FollowProfileInput {
  profile_id: String
  unfollow: Boolean = false
  clientMutationId: String
}

type FollowProfilePayload {
  profile: Profile
  clientMutationId: String
}

type FollowsAndSaves {
  """
  A list of published artworks by followed artists (grouped by date and artists).
  """
  bundledArtworksByArtist(sort: ArtworkSorts, for_sale: Boolean, after: String, first: Int, before: String, last: Int): FollowedArtistsArtworksGroupConnection

  """A list of the current user’s currently followed shows"""
  shows(
    status: EventStatus

    """
    Number of days which will be used to filter upcoming and closing soon shows
    """
    dayThreshold: Int

    """
    A string representing one of the supported cities in the City Guide, which
    are: new-york-ny-usa, los-angeles-ca-usa, london-united-kingdom,
    berlin-germany, paris-france, hong-kong-hong-kong
    """
    city: String
    after: String
    first: Int
    before: String
    last: Int
  ): FollowedShowConnection

  """A list of the current user’s currently followed fair profiles"""
  fairs(after: String, first: Int, before: String, last: Int): FollowedFairConnection
}

input FollowShowInput {
  partner_show_id: String
  unfollow: Boolean = false
  clientMutationId: String
}

type FollowShowPayload {
  show: Show
  clientMutationId: String
}

enum Format {
  HTML
  PLAIN
  markdown @deprecated(reason: "Deprecated when we deprecated lower-case enum entries, but no alternative was provided. Add an alternative to MP if this is still needed. [Will be removed in v2]")
}

type FormattedDaySchedules {
  days: String
  hours: String
}

"""
The \`FormattedNumber\` type represents a number that can optionally be returnedas
a formatted String. It does not try to coerce the type.
"""
scalar FormattedNumber

input FulfillmentInputType {
  """Courier of the fulfiller"""
  courier: String!

  """Courier's Tracking ID of this fulfillment"""
  trackingId: String

  """Estimated delivery in YY-MM-DD format"""
  estimatedDelivery: String
}

input FulfillOrderAtOnceInput {
  """ID of the order"""
  orderId: String!

  """Fulfillment information of this order"""
  fulfillment: FulfillmentInputType!
  clientMutationId: String
}

type FulfillOrderAtOncePayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

"""An entry from gemini"""
type GeminiEntry {
  """The token that represents the gemini entry."""
  token: String!
}

type Gene implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  artists: [Artist]
  artists_connection(after: String, first: Int, before: String, last: Int): ArtistConnection
  artworks_connection(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
    after: String
    first: Int
    before: String
    last: Int
  ): GeneArtworksConnection
  description: String
  display_name: String

  """Artworks Elastic Search results"""
  filtered_artworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks
  href: String
  image: Image
  is_published: Boolean
  is_followed: Boolean
  mode: String
  name: String

  """A list of genes similar to the specified gene"""
  similar(
    """
    Array of gene ids (not slugs) to exclude, may result in all genes being excluded.
    """
    exclude_gene_ids: [String]
    after: String
    first: Int
    before: String
    last: Int
  ): GeneConnection
  trending_artists(sample: Int): [Artist]
}

"""A connection to a list of items."""
type GeneArtworksConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [GeneArtworksEdge]

  """Returns aggregation counts for the given filter query."""
  aggregations: [ArtworksAggregationResults]
  counts: FilterArtworksCounts
}

"""An edge in a connection."""
type GeneArtworksEdge {
  """The item at the end of the edge"""
  node: Artwork

  """A cursor for use in pagination"""
  cursor: String!
}

"""A connection to a list of items."""
type GeneConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [GeneEdge]
}

"""An edge in a connection."""
type GeneEdge {
  """The item at the end of the edge"""
  node: Gene

  """A cursor for use in pagination"""
  cursor: String!
}

type GeneFamily {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  name: String!
  genes: [Gene]
}

"""A connection to a list of items."""
type GeneFamilyConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [GeneFamilyEdge]
}

"""An edge in a connection."""
type GeneFamilyEdge {
  """The item at the end of the edge"""
  node: GeneFamily

  """A cursor for use in pagination"""
  cursor: String!
}

type GeneItem implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  artists: [Artist]
  artists_connection(after: String, first: Int, before: String, last: Int): ArtistConnection
  artworks_connection(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
    after: String
    first: Int
    before: String
    last: Int
  ): GeneArtworksConnection
  description: String
  display_name: String

  """Artworks Elastic Search results"""
  filtered_artworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks
  href: String
  image: Image
  is_published: Boolean
  is_followed: Boolean
  mode: String
  name: String

  """A list of genes similar to the specified gene"""
  similar(
    """
    Array of gene ids (not slugs) to exclude, may result in all genes being excluded.
    """
    exclude_gene_ids: [String]
    after: String
    first: Int
    before: String
    last: Int
  ): GeneConnection
  trending_artists(sample: Int): [Artist]
}

type GravityMutationError {
  type: String
  message: String
  detail: String
  error: String
}

type HighestBid {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!
  created_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  number: Int
  is_cancelled: Boolean

  """A formatted price with various currency formatting options."""
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  cents: Int
  display: String
  amount_cents: Int @deprecated(reason: "Prefer to use \`cents\`. [Will be removed in v2]")
  display_amount_dollars: String @deprecated(reason: "Prefer to use \`display\`. [Will be removed in v2]")
}

union Highlighted = HighlightedShow | HighlightedArticle

type HighlightedArticle implements Node {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID."""
  id: ID!
  cached: Int
  author: Author
  channel_id: String
  contributing_authors: [Author]
  href: String
  published_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  slug: String
  thumbnail_title: String
  thumbnail_teaser: String
  thumbnail_image: Image
  tier: Int
  title: String
  updated_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
}

type HighlightedShow implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int

  """The Artists presenting in this show"""
  artists: [Artist]

  """The artworks featured in this show"""
  artworks(
    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
    for_sale: Boolean = false
    published: Boolean = true
    all: Boolean
    page: Int = 1

    """Number of artworks to return"""
    size: Int = 25
  ): [Artwork] @deprecated(reason: "Prefer to use \`artworks_connection\`. [Will be removed in v2]")

  """The artworks featured in the show"""
  artworks_connection(
    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
    for_sale: Boolean = false
    published: Boolean = true
    after: String
    first: Int
    before: String
    last: Int
  ): ArtworkConnection

  """Artists inside the show who do not have artworks present"""
  artists_without_artworks: [Artist]

  """Artists in the show grouped by last name"""
  artists_grouped_by_name: [ArtistGroup]

  """
  The general city, derived from a fair location, a show location or a potential city
  """
  city: String

  """The image you should use to represent this show"""
  cover_image: Image

  """
  An object that represents some of the numbers you might want to highlight
  """
  counts: ShowCounts

  """A description of the show"""
  description: String
  displayable: Boolean @deprecated(reason: "Prefer to use \`is_displayable\`. [Will be removed in v2]")
  end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """Events from the partner that runs this show"""
  events: [PartnerShowEventType]

  """A formatted description of the start to end dates"""
  exhibition_period: String

  """If the show is in a Fair, then that fair"""
  fair: Fair

  """Artworks Elastic Search results"""
  filteredArtworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks

  """A path to the show on Artsy"""
  href: String

  """
  Images that represent the show, you may be interested in meta_image or cover_image for a definitive thumbnail
  """
  images(
    """Number of images to return"""
    size: Int

    """Pass true/false to include cover or not"""
    default: Boolean
    page: Int
  ): [Image]

  """Flag showing if show has any location."""
  has_location: Boolean

  """
  Gravity doesn’t expose the \`active\` flag. Temporarily re-state its logic.
  """
  is_active: Boolean

  """Is this something we can display to the front-end?"""
  is_displayable: Boolean

  """Does the show exist as a fair booth?"""
  is_fair_booth: Boolean

  """Is it a show provided for historical reference?"""
  is_reference: Boolean
  is_local_discovery: Boolean @deprecated(reason: "Prefer to use \`isStubShow\`. [Will be removed in v2]")

  """Is it an outsourced local discovery stub show?"""
  isStubShow: Boolean

  """Whether the show is in a fair, group or solo"""
  kind: String

  """Where the show is located (Could also be a fair location)"""
  location: Location

  """
  An image representing the show, or a sharable image from an artwork in the show
  """
  meta_image: Image

  """Is the user following this show"""
  is_followed: Boolean

  """The exhibition title"""
  name: String

  """Shows that are near (~75km) from this show"""
  nearbyShows(
    sort: PartnerShowSorts

    """By default show only current shows"""
    status: EventStatus = CURRENT

    """Whether to include local discovery stubs as well as displayable shows"""
    discoverable: Boolean
    after: String
    first: Int
    before: String
    last: Int
  ): ShowConnection

  """
  Alternate Markdown-supporting free text representation of the opening reception event’s date/time
  """
  openingReceptionText: String

  """The partner that represents this show, could be a non-Artsy partner"""
  partner: PartnerTypes

  """The press release for this show"""
  press_release(format: Format): String

  """Link to the press release for this show"""
  pressReleaseUrl: String

  """When this show starts"""
  start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """Is this show running, upcoming or closed?"""
  status: String

  """A formatted update on upcoming status changes"""
  status_update(
    """Before this many days no update will be generated"""
    max_days: Int
  ): String

  """Is it a fair booth or a show?"""
  type: String

  """A Connection of followed artists by current user for this show"""
  followedArtists(after: String, first: Int, before: String, last: Int): ShowFollowArtistConnection
}

"""Autogenerated input type of HoldInventory"""
input HoldInventoryInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  expiresInSeconds: Int
  items: [InventoryHoldItemAttributes!]!

  """
  Globally unique ID for the requester of this hold. Ex. Exchange Order ID.
  """
  referenceId: String!
}

"""Autogenerated return type of HoldInventory"""
type HoldInventoryPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  holdOrErrors: InventoryHoldOrErrorsUnion!
}

type HomePage {
  """Single artist module to show on the home screen."""
  artist_module(
    """Module identifier."""
    key: HomePageArtistModuleTypes
  ): HomePageArtistModule

  """Artist modules to show on the home screen"""
  artist_modules: [HomePageArtistModule]

  """Single artwork module to show on the home screen"""
  artwork_module(
    """ID of followed artist to target for related artist rails"""
    followed_artist_id: String

    """
    [DEPRECATED: Favor more specific \`generic_gene_id\`] ID of generic gene rail to target
    """
    generic_gene_id: String

    """ID of generic gene rail to target"""
    id: String

    """Module key"""
    key: String

    """ID of related artist to target for related artist rails"""
    related_artist_id: String
  ): HomePageArtworkModule

  """Artwork modules to show on the home screen"""
  artwork_modules(
    """
    Maximum number of followed genes to return, disable with a negative number
    """
    max_followed_gene_rails: Int = 1

    """
    Maximum number of modules to return, disable limit with a negative number
    """
    max_rails: Int = 8

    """The preferred order of modules, defaults to order returned by Gravity"""
    order: [HomePageArtworkModuleTypes]

    """Exclude certain modules"""
    exclude: [HomePageArtworkModuleTypes] = []
  ): [HomePageArtworkModule]

  """A list of enabled hero units to show on the requested platform"""
  hero_units(platform: HomePageHeroUnitPlatform!): [HomePageHeroUnit]
  fairs_module: HomePageFairsModule
}

type HomePageArtistModule implements Node {
  """A globally unique ID."""
  __id: ID!

  """Module identifier."""
  key: String
  results: [Artist]
}

enum HomePageArtistModuleTypes {
  """Artists recommended for the specific user."""
  SUGGESTED

  """The trending artists."""
  TRENDING

  """The most searched for artists."""
  POPULAR
}

type HomePageArtworkModule implements Node {
  """A globally unique ID."""
  __id: ID!
  context: HomePageModuleContext
  display: String @deprecated(reason: "Prefer to use \`is_displayable\`. [Will be removed in v2]")
  is_displayable: Boolean
  key: String
  params: HomePageModulesParams
  results: [Artwork]
  title: String
}

enum HomePageArtworkModuleTypes {
  FOLLOWED_GENES
  GENERIC_GENES
  ACTIVE_BIDS
  CURRENT_FAIRS
  FOLLOWED_ARTIST
  FOLLOWED_ARTISTS
  FOLLOWED_GALLERIES
  LIVE_AUCTIONS
  POPULAR_ARTISTS
  RECOMMENDED_WORKS
  RELATED_ARTISTS
  SAVED_WORKS
  RECENTLY_VIEWED_WORKS
  SIMILAR_TO_RECENTLY_VIEWED
  SIMILAR_TO_SAVED_WORKS
}

type HomePageFairsModule {
  results: [Fair]!
}

type HomePageHeroUnit {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  mode: HomePageHeroUnitMode
  heading: String
  href: String
  title: String
  title_image_url(retina: Boolean): String
  subtitle: String
  link_text: String
  credit_line: String

  """The image to show, on desktop this defaults to the wide version."""
  background_image_url(version: HomePageHeroUnitImageVersion): String
}

enum HomePageHeroUnitImageVersion {
  WIDE
  NARROW
}

enum HomePageHeroUnitMode {
  LEFT_DARK
  LEFT_LIGHT
  CENTERED_DARK
  CENTERED_LIGHT
  RIGHT_DARK
  RIGHT_LIGHT
}

enum HomePageHeroUnitPlatform {
  MOBILE
  DESKTOP
  MARTSY
}

union HomePageModuleContext = HomePageModuleContextFair | HomePageModuleContextFollowArtists | HomePageModuleContextFollowedArtist | HomePageModuleContextGene | HomePageModuleContextRelatedArtist | HomePageModuleContextSale | HomePageModuleContextTrending

type HomePageModuleContextFair {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  about: String
  followed_content: FollowedContent
  artists(
    """Sorts for artists in a fair"""
    sort: FairArtistSorts
    after: String
    first: Int
    before: String
    last: Int
  ): ArtistConnection
  cached: Int
  banner_size: String
  counts: FairCounts

  """A formatted description of the start to end dates"""
  exhibition_period: String

  """
  A formatted description of when the fair starts or closes or if it is closed
  """
  formattedOpeningHours: String
  has_full_feature: Boolean
  has_homepage_section: Boolean
  has_large_banner: Boolean
  has_listing: Boolean
  hours: String
  href: String
  image: Image
  is_active: Boolean @deprecated(reason: "Prefer to use \`isActive\`. [Will be removed in v2]")

  """Are we currently in the fair's active period?"""
  isActive: Boolean
  links: String
  mobile_image: Image
  is_published: Boolean
  location: Location
  name: String
  profile: Profile

  """
  This connection only supports forward pagination. We're replacing Relay's default cursor with one from Gravity.
  """
  shows_connection(
    """Number of artworks to return"""
    section: String

    """Sorts for shows in a fair"""
    sort: ShowSort
    after: String
    first: Int
    before: String
    last: Int
  ): ShowConnection
  start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  active_start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  organizer: organizer
  published: Boolean @deprecated(reason: "Prefer to use \`is_published\`. [Will be removed in v2]")
  tagline: String
  ticketsLink: String

  """The exhibitors with booths in this fair with letter."""
  exhibitors_grouped_by_name: [FairExhibitorsGroup]

  """Artworks Elastic Search results"""
  filteredArtworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks
  sponsoredContent: FairSponsoredContent
}

type HomePageModuleContextFollowArtists {
  artists: [Artist]
  counts: FollowArtistCounts
}

type HomePageModuleContextFollowedArtist {
  artist: Artist
}

type HomePageModuleContextGene implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  artists: [Artist]
  artists_connection(after: String, first: Int, before: String, last: Int): ArtistConnection
  artworks_connection(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
    after: String
    first: Int
    before: String
    last: Int
  ): GeneArtworksConnection
  description: String
  display_name: String

  """Artworks Elastic Search results"""
  filtered_artworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks
  href: String
  image: Image
  is_published: Boolean
  is_followed: Boolean
  mode: String
  name: String

  """A list of genes similar to the specified gene"""
  similar(
    """
    Array of gene ids (not slugs) to exclude, may result in all genes being excluded.
    """
    exclude_gene_ids: [String]
    after: String
    first: Int
    before: String
    last: Int
  ): GeneConnection
  trending_artists(sample: Int): [Artist]
}

type HomePageModuleContextRelatedArtist {
  artist: Artist
  based_on: Artist
}

type HomePageModuleContextSale implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  artworks(
    page: Int = 1
    size: Int = 25
    all: Boolean = false

    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
  ): [Artwork]

  """Returns a connection of artworks for a sale."""
  artworksConnection(
    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
    after: String
    first: Int
    before: String
    last: Int
  ): ArtworkConnection
  associated_sale: Sale
  auction_state: String @deprecated(reason: "Prefer to use \`status\`. [Will be removed in v2]")

  """A bid increment policy that explains minimum bids in ranges."""
  bid_increments: [BidIncrement]

  """Auction's buyer's premium policy."""
  buyers_premium: [BuyersPremium]
  cover_image: Image
  currency: String
  description: String
  display_timely_at: String
  eligible_sale_artworks_count: Int
  end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  event_start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  event_end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """
  A formatted description of when the auction starts or ends or if it has ended
  """
  formattedStartDateTime: String
  href: String
  name: String
  initials(length: Int = 3): String
  is_auction: Boolean
  is_benefit: Boolean @deprecated(reason: "Prefer to use \`isBenefit\`. [Will be removed in v2]")
  isBenefit: Boolean
  isGalleryAuction: Boolean
  is_auction_promo: Boolean
  is_closed: Boolean
  is_open: Boolean
  is_live_open: Boolean
  is_preview: Boolean
  is_preliminary: Boolean
  is_registration_closed: Boolean
  is_with_buyers_premium: Boolean
  live_start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """
  Returns a live auctions url if the sale is open and start time is after now
  """
  live_url_if_open: String
  partner: Partner
  profile: Profile
  promoted_sale: Sale
  registration_ends_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """A registration for this sale or null"""
  registrationStatus: Bidder
  require_bidder_approval: Boolean
  sale_artworks(page: Int = 1, size: Int = 25, all: Boolean = false): [SaleArtwork]
  sale_artworks_connection(
    """List of sale artwork IDs to fetch"""
    ids: [ID]
    after: String
    first: Int
    before: String
    last: Int
  ): SaleArtworkConnection
  sale_type: String
  start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  status: String
  sale_artwork(id: String!): SaleArtwork
  symbol: String
  timeZone: String
}

type HomePageModuleContextTrending {
  artists: [Artist]
}

type HomePageModulesParams {
  """An optional type-specific ID."""
  id: ID
  followed_artist_id: ID
  gene_id: String
  medium: String
  price_range: String
  related_artist_id: ID
}

type Image {
  """An optional type-specific ID."""
  id: ID
  aspect_ratio: Float!
  caption: String
  cropped(width: Int!, height: Int!, version: [String]): CroppedImageUrl
  deep_zoom: DeepZoom
  href: String
  height: Int
  image_url: String
  image_versions: [String]
  is_default: Boolean
  is_zoomable: Boolean
  max_tiled_height: Int
  max_tiled_width: Int
  original_height: Int
  original_width: Int
  orientation: String

  """Value to use when \`padding-bottom\` for fluid image placeholders"""
  placeholder: String
  position: Int
  resized(width: Int, height: Int, version: [String]): ResizedImageUrl
  tile_base_url: String
  tile_format: String
  tile_size: Int
  title: String
  width: Int
  url(version: [String]): String
  versions: [String]
}

enum Intents {
  BUY_ART_AND_DESIGN
  SELL_ART_AND_DESIGN
  RESEARCH_ART_PRICES
  LEARN_ABOUT_ART
  FIND_ART_EXHIBITS
  READ_ART_MARKET_NEWS
}

type InventoryHold {
  capturedAt: String
  id: ID!
  items(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
  ): InventoryHoldItemConnection
  referenceId: String!
}

type InventoryHoldItem {
  artworkId: String!
  editionSetId: String
  id: ID!
  quantity: Int!
}

"""Attributes for creating or updating an inventory hold item"""
input InventoryHoldItemAttributes {
  """ID of the artwork"""
  artworkId: String!

  """ID of edition set"""
  editionSetId: String
  quantity: Int!
}

"""The connection type for InventoryHoldItem."""
type InventoryHoldItemConnection {
  """A list of edges."""
  edges: [InventoryHoldItemEdge]

  """A list of nodes."""
  nodes: [InventoryHoldItem]

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

"""An edge in a connection."""
type InventoryHoldItemEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of the edge."""
  node: InventoryHoldItem
}

"""A hold or error object"""
union InventoryHoldOrErrorsUnion = Errors | InventoryHold

"""A hold or error object"""
union InventoryHoldOrErrorUnion = Error | InventoryHold

"""Fields of an invoice (currently from Lewitt)"""
type Invoice implements Node {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Lewitt's invoice id."""
  lewitt_invoice_id: String!

  """Link to public checkout page."""
  payment_url: String

  """Current state of invoice."""
  state: InvoiceState

  """A formatted price with various currency formatting options."""
  total(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
}

enum InvoiceState {
  UNPAID
  PAID
  VOID
  REFUNDED
}

union Item = ArtistItem | ArtworkItem | FeaturedLinkItem | GeneItem

"""Represents untyped JSON"""
scalar JSON

type LatLng {
  lat: Float
  lng: Float
}

union ListPrice = PriceRange | Money

type Location {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID."""
  id: ID!
  cached: Int
  address: String
  address_2: String
  city: String
  country: String
  coordinates: LatLng
  day_schedules: [DaySchedule]

  """
  Alternate Markdown-supporting free text representation of a location's opening hours
  """
  day_schedule_text: String
  displayDaySchedules: [FormattedDaySchedules] @deprecated(reason: "Prefer to use \`openingHours\`. [Will be removed in v2]")

  """Union returning opening hours in formatted structure or a string"""
  openingHours: OpeningHoursUnion
  display: String
  phone: String
  postal_code: String
  state: String
  summary: String
}

type LotStanding {
  """Your bid if it is currently winning"""
  active_bid: BidderPosition
  bidder: Bidder

  """You are winning and reserve is met"""
  is_highest_bidder: Boolean

  """You are the leading bidder without regard to reserve"""
  is_leading_bidder: Boolean

  """
  Your most recent bid—which is not necessarily winning (may be higher or lower)
  """
  most_recent_bid: BidderPosition
  sale: Sale
  sale_artwork: SaleArtwork
}

"""Object representing a collection page"""
type MarketingCollection {
  id: ID!
  internalID: ID!

  """
  slug version of title, used for pretty URLs (e.g. \`kaws-prints\` for Kaws Prints
  """
  slug: String!

  """Name of the collection"""
  title: String!

  """
  Description of the collection which can include links to other collections
  """
  description: String

  """Markdown alternate of description field contents."""
  descriptionMarkdown: String

  """Background image for the header of the collection page"""
  headerImage: String

  """URL for Thumbnail image to be used when this collection is displayed."""
  thumbnail: String

  """Set of keywords used for SEO purposes"""
  keywords: String!

  """Image credit for the header image"""
  credit: String

  """Category of the collection"""
  category: String!

  """Structured object used to build filtered artworks query"""
  query: MarketingCollectionQuery!
  createdAt: MarketingDateTime!
  updatedAt: MarketingDateTime!

  """Suggested average price for included works"""
  price_guidance: Float @deprecated(reason: "Prefer priceGuidance")

  """Suggested average price for included works"""
  priceGuidance: Float

  """Collection can be surfaced on editorial pages"""
  show_on_editorial: Boolean! @deprecated(reason: "Prefer showOnEditorial")

  """Collection can be surfaced on editorial pages"""
  showOnEditorial: Boolean!

  """Collection has prioritized connection to artist"""
  is_featured_artist_content: Boolean! @deprecated(reason: "Prefer isFeaturedArtistContent")

  """Collection has prioritized connection to artist"""
  isFeaturedArtistContent: Boolean!

  """CollectionGroups of this collection"""
  linkedCollections: [MarketingCollectionGroup!]!

  """
  IDs of artists that should be excluded from Featured Artists for this collection
  """
  featuredArtistExclusionIds: [String!]
  relatedCollections: [MarketingCollection!]!
  artworks(acquireable: Boolean, offerable: Boolean, aggregation_partner_cities: [String], aggregations: [ArtworkAggregation], artist_id: String, artist_ids: [String], at_auction: Boolean, attribution_class: [String], color: String, dimension_range: String, extra_aggregation_gene_ids: [String], include_artworks_by_followed_artists: Boolean, include_medium_filter_in_aggregation: Boolean, inquireable_only: Boolean, for_sale: Boolean, gene_id: String, gene_ids: [String], height: String, width: String, marketable: Boolean, medium: String, period: String, periods: [String], major_periods: [String], partner_id: ID, partner_cities: [String], price_range: String, page: Int, sale_id: ID, size: Int, sort: String, tag_id: String, keyword: String, keyword_match_exact: Boolean): FilterArtworks
}

type MarketingCollectionCategory {
  name: String!
  collections: [MarketingCollection!]!
}

type MarketingCollectionGroup {
  internalID: ID
  groupType: MarketingGroupTypes!
  name: String!
  members: [MarketingCollection!]!
}

type MarketingCollectionQuery {
  id: ID
  internalID: ID
  acquireable: Boolean
  aggregations: [String!]
  artist_ids: [String!] @deprecated(reason: "Prefer artistIDs")
  artistIDs: [String!]
  artist_id: String @deprecated(reason: "Prefer artistID")
  artistID: String
  at_auction: Boolean @deprecated(reason: "Prefer atAuction")
  atAuction: Boolean
  color: String
  dimension_range: String @deprecated(reason: "Prefer dimensionRange")
  dimensionRange: String
  extra_aggregation_gene_ids: [String!] @deprecated(reason: "prefer extraAggregationGeneIDs")
  extraAggregationGeneIDs: [String!]
  include_artworks_by_followed_artists: Boolean @deprecated(reason: "Prefer includeArtworksByFollowedArtists")
  includeArtworksByFollowedArtists: Boolean
  include_medium_filter_in_aggregation: Boolean @deprecated(reason: "Prefer includeMediumFilterInAggregation")
  includeMediumFilterInAggregation: Boolean
  inquireable_only: Boolean @deprecated(reason: "Prefer inquireableOnly")
  inquireableOnly: Boolean
  for_sale: Boolean @deprecated(reason: "Prefer forSale")
  forSale: Boolean
  gene_id: String @deprecated(reason: "Prefer geneID")
  geneID: String
  gene_ids: [String!] @deprecated(reason: "Prefer geneIDs")
  geneIDs: [String!]
  height: String
  width: String
  medium: String
  period: String
  periods: [String!]
  major_periods: [String!] @deprecated(reason: "Prefer majorPeriods")
  majorPeriods: [String!]
  partner_id: ID @deprecated(reason: "Prefer partnerID")
  partnerID: ID
  partner_cities: [String!] @deprecated(reason: "Prefer partnerCities")
  partnerCities: [String!]
  price_range: String @deprecated(reason: "Prefer priceRange")
  priceRange: String
  page: Int
  sale_id: ID @deprecated(reason: "Prefer saleID")
  saleID: ID
  size: Int
  sort: String
  tag_id: String @deprecated(reason: "Prefer tagID")
  tagID: String
  keyword: String
}

scalar MarketingDateTime

"""Available types of CollectionGroup"""
enum MarketingGroupTypes {
  ArtistSeries
  FeaturedCollections
  OtherCollections
}

type Me implements Node {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID."""
  id: ID!

  """A list of the current user’s consignment submissions"""
  consignment_submissions(after: String, first: Int, before: String, last: Int, completed: Boolean = true): ConsignmentSubmissionConnection

  """A list of the current user’s inquiry requests"""
  artwork_inquiries_connection(after: String, first: Int, before: String, last: Int): ArtworkInquiryConnection

  """A list of the current user’s bidder registrations"""
  bidders(
    """The slug or ID of a Sale"""
    sale_id: String
  ): [Bidder]

  """The current user's status relating to bids on artworks"""
  bidder_status(artwork_id: String!, sale_id: String!): LotStanding

  """A list of the current user's bidder positions"""
  bidder_positions(
    """Only the bidder positions on a specific artwork"""
    artwork_id: String

    """Only the most recent bidder positions per artwork."""
    current: Boolean

    """Only the bidder positions for a specific auction"""
    sale_id: String
  ): [BidderPosition]

  """Returns a single bidder position"""
  bidder_position(id: String!): BidderPositionResult

  """A collector profile."""
  collector_profile: CollectorProfileType

  """A conversation, usually between a user and a partner"""
  conversation(
    """The ID of the Conversation"""
    id: String!
  ): Conversation

  """Conversations, usually between a user and partner."""
  conversations(after: String, first: Int, before: String, last: Int): ConversationConnection
  created_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """A list of the current user’s credit cards"""
  creditCards(after: String, first: Int, before: String, last: Int): CreditCardConnection
  email: String

  """A list of the current user’s artist follows"""
  follow_artists(page: Int, size: Int): FollowArtists

  """A Connection of followed artists by current user"""
  followed_artists_connection(after: String, first: Int, before: String, last: Int): FollowArtistConnection

  """A list of the current user’s inquiry requests"""
  followed_genes(after: String, first: Int, before: String, last: Int): FollowGeneConnection
  followsAndSaves: FollowsAndSaves
  has_credit_cards: Boolean
  has_qualified_credit_cards: Boolean

  """An invoice"""
  invoice(
    """The ID of the Conversation"""
    conversationId: String!

    """The ID of the invoice"""
    invoiceId: String!
  ): Invoice

  """The current user's status relating to bids on artworks"""
  lot_standing(artwork_id: String, sale_id: String, sale_artwork_id: String): LotStanding

  """A list of the current user's auction standings for given lots"""
  lot_standings(
    """Only includes lots on which you have a leading bidder position."""
    active_positions: Boolean

    """Only the lot standings on a specific artwork"""
    artwork_id: String

    """Only the lot standings for currently open or closed auctions."""
    live: Boolean

    """Only the lot standings for a specific auction"""
    sale_id: String
    sale_artwork_id: String
  ): [LotStanding]
  name: String
  initials(length: Int = 3): String

  """
  A list of feed items, indicating published artworks (grouped by date and artists).
  """
  notifications_connection(after: String, first: Int, before: String, last: Int): NotificationsFeedItemConnection @deprecated(reason: "Prefer to use \`followsAndSaves\`. [Will be removed in v2]")
  paddle_number: String
  recentlyViewedArtworkIds: [String]!

  """A list of the current user’s recently viewed artworks."""
  recentlyViewedArtworks(after: String, first: Int, before: String, last: Int): ArtworkConnection
  sale_registrations(
    """Limit by auction."""
    is_auction: Boolean = true

    """
    
            Only return sales matching specified ids.
            Accepts list of ids.
          
    """
    ids: [String]

    """Limit by live status."""
    live: Boolean = true

    """Limit by published status."""
    published: Boolean = true
    size: Int
    sort: SaleSorts
  ): [SaleRegistration]
  saved_artworks: Collection

  """
  A list of the current user’s suggested artists, based on a single artist
  """
  suggested_artists(
    """The slug or ID of an artist"""
    artist_id: String

    """Exclude artists without for sale works"""
    exclude_artists_without_forsale_artworks: Boolean

    """Exclude artists without any artworks"""
    exclude_artists_without_artworks: Boolean

    """Exclude artists the user already follows"""
    exclude_followed_artists: Boolean

    """
    Exclude these ids from results, may result in all artists being excluded.
    """
    exclude_artist_ids: [String]

    """Pagination, need I say more?"""
    page: Int

    """Amount of artists to return"""
    size: Int
  ): [Artist]
  type: String
}

"""A message in a conversation."""
type Message implements Node {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Impulse message id."""
  impulse_id: String!

  """True if message is from the user to the partner."""
  is_from_user: Boolean
  from_email_address: String @deprecated(reason: "Prefer to use \`from\`. [Will be removed in v2]")
  from: MessageInitiator

  """Full unsanitized text."""
  raw_text: String! @deprecated(reason: "Prefer to use \`body\`. [Will be removed in v2]")

  """
  Unaltered text if possible, otherwise \`body\`: a parsed/sanitized version from Sendgrid.
  """
  body: String
  deliveries: [Delivery]
  attachments: [Attachment]
  invoice: Invoice

  """True if message is an invoice message"""
  is_invoice: Boolean
  created_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
}

"""A connection to a list of items."""
type MessageConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [MessageEdge]
}

"""An edge in a connection."""
type MessageEdge {
  """The item at the end of the edge"""
  node: Message

  """A cursor for use in pagination"""
  cursor: String!
}

"""The participant who sent the message."""
type MessageInitiator {
  name: String
  email: String
}

type Metaphysics {
  queryTracing: Boolean!
  heapDumps: Boolean!
  stitching: Boolean!
  stitchingConvection: Boolean!
  stitchingExchange: Boolean!
  stitchingGravity: Boolean!
  stitchingKaws: Boolean!
  environment: String!
}

type Money {
  """An amount of money expressed in minor units (like cents)."""
  minor: Int!

  """
  The ISO-4217 alphabetic currency code, as per https://en.wikipedia.org/wiki/ISO_4217
  """
  currencyCode: String!

  """A pre-formatted price."""
  display: String

  """An amount of money expressed in major units (like dollars)."""
  major: Float!
}

input MoneyInput {
  """amount in dollars or major unit"""
  amount: Float!

  """
  The ISO-4217 alphabetic currency code, as per https://en.wikipedia.org/wiki/ISO_4217
  """
  currencyCode: String!
}

type Mutation {
  """Create a bidder"""
  createBidder(input: CreateBidderInput!): CreateBidderPayload

  """Creates a bidder position"""
  createBidderPosition(input: BidderPositionInput!): BidderPositionPayload

  """Create a credit card"""
  createCreditCard(input: CreditCardInput!): CreditCardPayload

  """Remove a credit card"""
  deleteCreditCard(input: DeleteCreditCardInput!): DeleteCreditCardPayload

  """Follow (or unfollow) an artist"""
  followArtist(input: FollowArtistInput!): FollowArtistPayload

  """Follow (or unfollow) a profile"""
  followProfile(input: FollowProfileInput!): FollowProfilePayload

  """Follow (or unfollow) an gene"""
  followGene(input: FollowGeneInput!): FollowGenePayload

  """Follow (or unfollow) a show"""
  followShow(input: FollowShowInput!): FollowShowPayload

  """Updating a collector profile (loyalty applicant status)."""
  updateCollectorProfile(input: UpdateCollectorProfileInput!): UpdateCollectorProfilePayload

  """Update the current logged in user."""
  updateMyUserProfile(input: UpdateMyProfileInput!): UpdateMyProfilePayload

  """Update a conversation."""
  updateConversation(input: UpdateConversationMutationInput!): UpdateConversationMutationPayload

  """Appending a message to a conversation thread"""
  sendConversationMessage(input: SendConversationMessageMutationInput!): SendConversationMessageMutationPayload

  """Send a feedback message"""
  sendFeedback(input: SendFeedbackMutationInput!): SendFeedbackMutationPayload

  """Save (or remove) an artwork to (from) a users default collection."""
  saveArtwork(input: SaveArtworkInput!): SaveArtworkPayload

  """Mark sale as ended."""
  endSale(input: EndSaleInput!): EndSalePayload

  """Attach an gemini asset to a consignment submission"""
  requestCredentialsForAssetUpload(input: RequestCredentialsForAssetUploadInput!): RequestCredentialsForAssetUploadPayload

  """Attach an gemini asset to a consignment submission"""
  createGeminiEntryForAsset(input: CreateGeminiEntryForAssetInput!): CreateGeminiEntryForAssetPayload

  """Create a new consignment submission using Convection"""
  createConsignmentSubmission(input: CreateSubmissionMutationInput!): CreateSubmissionMutationPayload

  """Update a consignment using Convection"""
  updateConsignmentSubmission(input: UpdateSubmissionMutationInput!): UpdateSubmissionMutationPayload

  """Attach an gemini asset to a consignment submission"""
  addAssetToConsignmentSubmission(input: AddAssetToConsignmentSubmissionInput!): AddAssetToConsignmentSubmissionPayload

  """Creates an order with an artwork"""
  ecommerceCreateOrderWithArtwork(input: CreateOrderWithArtworkInput!): CreateOrderWithArtworkPayload

  """Creates an order with an artwork"""
  ecommerceCreateOfferOrderWithArtwork(input: CreateOfferOrderWithArtworkInput!): CreateOfferOrderWithArtworkPayload

  """Sets shipping information for an order"""
  ecommerceSetOrderShipping(input: SetOrderShippingInput!): SetOrderShippingPayload

  """Sets payment information on an order"""
  ecommerceSetOrderPayment(input: SetOrderPaymentInput!): SetOrderPaymentPayload

  """Approves an order with payment"""
  ecommerceApproveOrder(input: ApproveOrderInput!): ApproveOrderPayload

  """Buyer accepts a submitted offer from seller"""
  ecommerceBuyerAcceptOffer(input: buyerAcceptOfferInput!): buyerAcceptOfferPayload

  """Approves an order with payment"""
  ecommerceSellerAcceptOffer(input: sellerAcceptOfferInput!): sellerAcceptOfferPayload

  """Buyer counters sellers offer"""
  ecommerceBuyerCounterOffer(input: buyerCounterOfferInput!): buyerCounterOfferPayload

  """Submit pending offer"""
  ecommerceSubmitPendingOffer(input: submitPendingOfferInput!): submitPendingOfferPayload

  """Seller counters buyers offer"""
  ecommerceSellerCounterOffer(input: sellerCounterOfferInput!): sellerCounterOfferPayload

  """Buyer rejects a submitted offer from seller"""
  ecommerceBuyerRejectOffer(input: buyerRejectOfferInput!): buyerRejectOfferPayload

  """Rejects an offer"""
  ecommerceSellerRejectOffer(input: sellerRejectOfferInput!): sellerRejectOfferPayload

  """Confirms pickup for an ecommerce order"""
  ecommerceConfirmPickup(input: ConfirmPickupInput!): ConfirmPickupPayload

  """
  Fulfills an Order with one fulfillment by setting this fulfillment to all line items of this order
  """
  ecommerceFulfillOrderAtOnce(input: FulfillOrderAtOnceInput!): FulfillOrderAtOncePayload

  """Rejects an order"""
  ecommerceRejectOrder(input: RejectOrderInput!): RejectOrderPayload

  """Submits an order"""
  ecommerceSubmitOrder(input: SubmitOrderInput!): SubmitOrderPayload

  """Adds an offer to a pending order"""
  ecommerceAddInitialOfferToOrder(input: AddInitialOfferToOrderInput!): AddInitialOfferToOrderPayload

  """Submits an order with an offer"""
  ecommerceSubmitOrderWithOffer(input: SubmitOrderWithOfferInput!): SubmitOrderWithOfferPayload

  """Fix the failed payment on an offer order"""
  ecommerceFixFailedPayment(input: FixFailedPaymentInput!): FixFailedPaymentPayload

  """Creates an order with an artwork"""
  createOrderWithArtwork(input: CreateOrderWithArtworkInput!): CreateOrderWithArtworkPayload

  """Sets shipping information for an order"""
  setOrderShipping(input: SetOrderShippingInput!): SetOrderShippingPayload

  """Sets payment information on an order"""
  setOrderPayment(input: SetOrderPaymentInput!): SetOrderPaymentPayload

  """Approves an order with payment"""
  approveOrder(input: ApproveOrderInput!): ApproveOrderPayload

  """
  Fulfills an Order with one fulfillment by setting this fulfillment to all line items of this order
  """
  fulfillOrderAtOnce(input: FulfillOrderAtOnceInput!): FulfillOrderAtOncePayload

  """Rejects an order"""
  rejectOrder(input: RejectOrderInput!): RejectOrderPayload

  """Submits an order"""
  submitOrder(input: SubmitOrderInput!): SubmitOrderPayload
  captureHold(input: CaptureHoldInput!): CaptureHoldPayload
  holdInventory(input: HoldInventoryInput!): HoldInventoryPayload
  recordArtworkView(input: RecordArtworkViewInput!): RecordArtworkViewPayload
  requestConditionReport(input: RequestConditionReportInput!): RequestConditionReportPayload
  commerceAddInitialOfferToOrder(input: CommerceAddInitialOfferToOrderInput!): CommerceAddInitialOfferToOrderPayload
  commerceApproveOrder(input: CommerceApproveOrderInput!): CommerceApproveOrderPayload
  commerceBuyerAcceptOffer(input: CommerceBuyerAcceptOfferInput!): CommerceBuyerAcceptOfferPayload
  commerceBuyerCounterOffer(input: CommerceBuyerCounterOfferInput!): CommerceBuyerCounterOfferPayload
  commerceBuyerRejectOffer(input: CommerceBuyerRejectOfferInput!): CommerceBuyerRejectOfferPayload
  commerceConfirmFulfillment(input: CommerceConfirmFulfillmentInput!): CommerceConfirmFulfillmentPayload
  commerceConfirmPickup(input: CommerceConfirmPickupInput!): CommerceConfirmPickupPayload
  commerceCreateOfferOrderWithArtwork(input: CommerceCreateOfferOrderWithArtworkInput!): CommerceCreateOfferOrderWithArtworkPayload
  commerceCreateOrderWithArtwork(input: CommerceCreateOrderWithArtworkInput!): CommerceCreateOrderWithArtworkPayload
  commerceFixFailedPayment(input: CommerceFixFailedPaymentInput!): CommerceFixFailedPaymentPayload

  """
  Fulfill an order with one Fulfillment, it sets this fulfillment to each line item in order
  """
  commerceFulfillAtOnce(input: CommerceFulfillAtOnceInput!): CommerceFulfillAtOncePayload
  commerceRejectOrder(input: CommerceRejectOrderInput!): CommerceRejectOrderPayload
  commerceSellerAcceptOffer(input: CommerceSellerAcceptOfferInput!): CommerceSellerAcceptOfferPayload
  commerceSellerCounterOffer(input: CommerceSellerCounterOfferInput!): CommerceSellerCounterOfferPayload
  commerceSellerRejectOffer(input: CommerceSellerRejectOfferInput!): CommerceSellerRejectOfferPayload
  commerceSetPayment(input: CommerceSetPaymentInput!): CommerceSetPaymentPayload
  commerceSetShipping(input: CommerceSetShippingInput!): CommerceSetShippingPayload
  commerceSubmitOrder(input: CommerceSubmitOrderInput!): CommerceSubmitOrderPayload
  commerceSubmitOrderWithOffer(input: CommerceSubmitOrderWithOfferInput!): CommerceSubmitOrderWithOfferPayload
  commerceSubmitPendingOffer(input: CommerceSubmitPendingOfferInput!): CommerceSubmitPendingOfferPayload
}

input Near {
  lat: Float!
  lng: Float!
  max_distance: Float
}

"""An object with a Globally Unique ID"""
interface Node {
  """The ID of the object."""
  __id: ID!
}

type NotificationsFeedItem implements Node {
  """A globally unique ID."""
  __id: ID!
  artists: String

  """List of artworks in this notification bundle"""
  artworks: [Artwork]
  date(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  message: String
  status: NotificationsFeedItemStatus
  image: Image
}

"""A connection to a list of items."""
type NotificationsFeedItemConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [NotificationsFeedItemEdge]
}

"""An edge in a connection."""
type NotificationsFeedItemEdge {
  """The item at the end of the edge"""
  node: NotificationsFeedItem

  """A cursor for use in pagination"""
  cursor: String!
}

enum NotificationsFeedItemStatus {
  READ
  UNREAD
}

type Offer {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!
  createdAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """Id of the user who created the order"""
  creatorId: String

  """Creator of this order"""
  creator: User

  """The type of the party who made the offer"""
  from: OrderParty

  """the order participant who created the offer"""
  fromParticipant: OrderParticipantEnum

  """Offer amount in cents"""
  amountCents: Int

  """A formatted price with various currency formatting options."""
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Shipping total based on this offer in cents"""
  shippingTotalCents: Int

  """A formatted price with various currency formatting options."""
  shippingTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Tax total based on this offer in cents"""
  taxTotalCents: Int

  """A formatted price with various currency formatting options."""
  taxTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """The order on which the offer was made"""
  order: Order

  """Total of amount, shipping and tax in cents"""
  buyerTotalCents: Int

  """A formatted price with various currency formatting options."""
  buyerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """The order on which the offer was made"""
  respondsTo: Offer
  submittedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """Offer note"""
  note: String

  """Currency code of this order"""
  currencyCode: String
}

"""A connection to a list of items."""
type OfferConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [OfferEdge]
}

"""An edge in a connection."""
type OfferEdge {
  """The item at the end of the edge"""
  node: Offer

  """A cursor for use in pagination"""
  cursor: String!
}

type OfferOrder implements Order {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Order Mode"""
  mode: OrderModeEnum

  """Currency code of this order"""
  currencyCode: String

  """State of the order"""
  state: String

  """Reason for current state"""
  stateReason: String

  """Uniq user-friendly code of the order"""
  code: String

  """Order Requested Fulfillment"""
  requestedFulfillment: RequestedFulfillment

  """Item total in cents"""
  itemsTotalCents: Int

  """A formatted price with various currency formatting options."""
  itemsTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Total list price in cents"""
  totalListPriceCents: Int

  """A formatted price with various currency formatting options."""
  totalListPrice(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Shipping total in cents"""
  shippingTotalCents: Int

  """A formatted price with various currency formatting options."""
  shippingTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Tax total in cents"""
  taxTotalCents: Int

  """A formatted price with various currency formatting options."""
  taxTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Transaction fee in cents"""
  transactionFeeCents: Int

  """A formatted price with various currency formatting options."""
  transactionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Commission fee in cents"""
  commissionFeeCents: Int

  """A formatted price with various currency formatting options."""
  commissionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Partner commission rate used to calculate commission fee"""
  commissionRate: Float

  """Partner commission rate formatted into percentage"""
  displayCommissionRate: String

  """Buyer total in cents"""
  buyerTotalCents: Int

  """A formatted price with various currency formatting options."""
  buyerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Seller total in cents"""
  sellerTotalCents: Int

  """A formatted price with various currency formatting options."""
  sellerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """List of order line items"""
  lineItems: OrderLineItemConnection

  """Seller of this order"""
  seller: OrderParty

  """Buyer of this order"""
  buyer: OrderParty

  """Credit card on this order"""
  creditCard: CreditCard

  """Whether or not the last attempt to charge the buyer failed"""
  lastTransactionFailed: Boolean
  lastApprovedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  lastSubmittedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  updatedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  createdAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  stateUpdatedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  stateExpiresAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """Buyer phone number"""
  buyerPhoneNumber: String

  """Current User's latest offer"""
  myLastOffer: Offer

  """Waiting for one participants response"""
  awaitingResponseFrom: OrderParticipantEnum

  """Latest offer"""
  lastOffer: Offer

  """List of submitted offers made on this order so far"""
  offers: OfferConnection
}

type OpeningHoursArray {
  schedules: [FormattedDaySchedules]
}

type OpeningHoursText {
  text: String
}

union OpeningHoursUnion = OpeningHoursArray | OpeningHoursText

interface Order {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Order Mode"""
  mode: OrderModeEnum

  """Currency code of this order"""
  currencyCode: String

  """State of the order"""
  state: String

  """Reason for current state"""
  stateReason: String

  """Uniq user-friendly code of the order"""
  code: String

  """Order Requested Fulfillment"""
  requestedFulfillment: RequestedFulfillment

  """Item total in cents"""
  itemsTotalCents: Int

  """A formatted price with various currency formatting options."""
  itemsTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Total list price in cents"""
  totalListPriceCents: Int

  """A formatted price with various currency formatting options."""
  totalListPrice(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Shipping total in cents"""
  shippingTotalCents: Int

  """A formatted price with various currency formatting options."""
  shippingTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Tax total in cents"""
  taxTotalCents: Int

  """A formatted price with various currency formatting options."""
  taxTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Transaction fee in cents"""
  transactionFeeCents: Int

  """A formatted price with various currency formatting options."""
  transactionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Commission fee in cents"""
  commissionFeeCents: Int

  """A formatted price with various currency formatting options."""
  commissionFee(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Partner commission rate used to calculate commission fee"""
  commissionRate: Float

  """Partner commission rate formatted into percentage"""
  displayCommissionRate: String

  """Buyer total in cents"""
  buyerTotalCents: Int

  """A formatted price with various currency formatting options."""
  buyerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Seller total in cents"""
  sellerTotalCents: Int

  """A formatted price with various currency formatting options."""
  sellerTotal(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """List of order line items"""
  lineItems: OrderLineItemConnection

  """Seller of this order"""
  seller: OrderParty

  """Buyer of this order"""
  buyer: OrderParty

  """Credit card on this order"""
  creditCard: CreditCard

  """Whether or not the last attempt to charge the buyer failed"""
  lastTransactionFailed: Boolean
  lastApprovedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  lastSubmittedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  updatedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  createdAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  stateUpdatedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  stateExpiresAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """Buyer phone number"""
  buyerPhoneNumber: String
}

"""A connection to a list of items."""
type OrderConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [OrderEdge]
  totalCount: Int
  totalPages: Int
  pageCursors: PageCursors
}

"""An edge in a connection."""
type OrderEdge {
  """The item at the end of the edge"""
  node: Order

  """A cursor for use in pagination"""
  cursor: String!
}

type OrderedSet {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID."""
  id: ID!
  cached: Int
  description: String
  key: String
  item_type: String
  items: [Item]
  name: String
}

type OrderFulfillment {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Fulfillment Courier"""
  courier: String

  """Courier's tracking id"""
  trackingId: String
  estimatedDelivery(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
}

"""A connection to a list of items."""
type OrderFulfillmentConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [OrderFulfillmentEdge]
}

"""An edge in a connection."""
type OrderFulfillmentEdge {
  """The item at the end of the edge"""
  node: OrderFulfillment

  """A cursor for use in pagination"""
  cursor: String!
}

enum OrderFulfillmentType {
  SHIP
  PICKUP
}

type OrderLineItem {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!

  """Artwork that is being ordered"""
  artwork: Artwork

  """Artwork version that is being ordered"""
  artworkVersion: ArtworkVersion

  """ID of the selected Edition set from the artwork"""
  editionSetId: String

  """Unit price in cents"""
  priceCents: Int @deprecated(reason: "Prefer to use \`listPriceCents\`. [Will be removed in v2]")

  """A formatted price with various currency formatting options."""
  price(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """Unit list price in cents"""
  listPriceCents: Int

  """A formatted price with various currency formatting options."""
  listPrice(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  updatedAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  createdAt(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """Quantity of items in this line item"""
  quantity: Int

  """List of order line items"""
  fulfillments: OrderFulfillmentConnection
}

"""A connection to a list of items."""
type OrderLineItemConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [OrderLineItemEdge]
}

"""An edge in a connection."""
type OrderLineItemEdge {
  """The item at the end of the edge"""
  node: OrderLineItem

  """A cursor for use in pagination"""
  cursor: String!
}

enum OrderModeEnum {
  """Order initiated by Buy"""
  BUY

  """Order initiated by Offer"""
  OFFER
}

union OrderOrFailureUnionType = OrderWithMutationSuccess | OrderWithMutationFailure

enum OrderParticipantEnum {
  """Participant on the buyer side"""
  BUYER

  """Participant on the seller side"""
  SELLER
}

union OrderParty = Partner | User

enum OrdersSortMethodType {
  """Sort by the timestamp the order was last updated in ascending order"""
  UPDATED_AT_ASC

  """Sort by the timestamp the order was last updated in descending order"""
  UPDATED_AT_DESC

  """
  Sort by the timestamp the state of order was last updated in ascending order
  """
  STATE_UPDATED_AT_ASC

  """
  Sort by the timestamp the state of order was last updated in descending order
  """
  STATE_UPDATED_AT_DESC

  """
  Sort by the timestamp the state of the order expires at in ascending order
  """
  STATE_EXPIRES_AT_ASC

  """
  Sort by the timestamp the state of the order expires at in a descending order
  """
  STATE_EXPIRES_AT_DESC
}

type OrderWithMutationFailure {
  error: EcommerceError
}

type OrderWithMutationSuccess {
  order: Order
}

type organizer {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  profile_id: ID
  profile: Profile
  website: String
}

type PageCursor {
  cursor: String!
  page: Int!
  isCurrent: Boolean!
}

type PageCursors {
  """
  Optional, may be included in \`around\` (if current page is near the beginning).
  """
  first: PageCursor

  """
  Optional, may be included in \`around\` (if current page is near the end).
  """
  last: PageCursor

  """Always includes current page"""
  around: [PageCursor!]!
  previous: PageCursor
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, the cursor to continue."""
  endCursor: String

  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String
}

type Partner implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  artworks(for_sale: Boolean, sort: ArtworkSorts, exclude: [String], size: Int): [Artwork]

  """A connection of artworks from a Partner."""
  artworksConnection(for_sale: Boolean, sort: ArtworkSorts, exclude: [String], after: String, first: Int, before: String, last: Int): ArtworkConnection
  categories: [Category]
  collecting_institution: String
  contact_message: String @deprecated(reason: "Prefer to use \`Artwork.contact_message\`. [Will be removed in v2]")
  counts: PartnerCounts
  default_profile_id: String
  has_fair_partnership: Boolean
  href: String
  initials(length: Int = 3): String
  is_default_profile_public: Boolean
  is_limited_fair_partner: Boolean @deprecated(reason: "This field no longer exists, this is for backwards compatibility [Will be removed in v2]")
  is_linkable: Boolean
  is_pre_qualify: Boolean
  locations(size: Int = 25): [Location]
  name: String
  profile: Profile
  shows(
    at_a_fair: Boolean
    displayable: Boolean = true
    fair_id: String
    featured: Boolean

    """
    
            Only return shows matching specified ids.
            Accepts list of ids.
          
    """
    ids: [String]
    near: Near
    size: Int
    sort: PartnerShowSorts
    status: EventStatus
  ): [PartnerShow]
  type: String

  """The gallery partner's web address"""
  website: String

  """Indicates the partner is a trusted seller on Artsy"""
  isVerifiedSeller: Boolean
  analytics: AnalyticsPartnerStats
}

type PartnerArtist {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID."""
  id: ID!
  artist: Artist
  biography: String
  counts: PartnerArtistCounts
  is_display_on_partner_profile: Boolean
  is_represented_by: Boolean
  is_use_default_biography: Boolean
  partner: Partner
  sortable_id: String
}

"""A connection to a list of items."""
type PartnerArtistConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PartnerArtistEdge]
}

type PartnerArtistCounts {
  artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  for_sale_artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
}

"""An edge in a connection."""
type PartnerArtistEdge {
  """The item at the end of the edge"""
  node: Partner

  """A cursor for use in pagination"""
  cursor: String!

  """A globally unique ID."""
  __id: ID!

  """A type-specific ID."""
  id: ID!
  artist: Artist
  biography: String
  counts: PartnerArtistCounts
  is_display_on_partner_profile: Boolean
  is_represented_by: Boolean
  is_use_default_biography: Boolean
  partner: Partner
  sortable_id: String
}

type PartnerArtworkGrid implements ArtworkContextGrid {
  title: String
  ctaTitle: String
  ctaHref: String
  artworks(after: String, first: Int, before: String, last: Int): ArtworkConnection
}

type PartnerCategory {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  category_type: CategoryType
  name: String
  partners(
    default_profile_public: Boolean
    eligible_for_carousel: Boolean

    """Indicates an active subscription"""
    eligible_for_listing: Boolean

    """Indicates tier 1/2 for gallery, 1 for institution"""
    eligible_for_primary_bucket: Boolean

    """Indicates tier 3/4 for gallery, 2 for institution"""
    eligible_for_secondary_bucket: Boolean
    ids: [String]
    has_full_profile: Boolean

    """Coordinates to find partners closest to"""
    near: String
    page: Int

    """
    
            Only return partners of the specified partner categories.
            Accepts list of slugs.
          
    """
    partner_categories: [String]
    size: Int
    sort: PartnersSortType

    """term used for searching Partners"""
    term: String
    type: [PartnerClassification]
  ): [Partner]
}

enum PartnerClassification {
  AUCTION
  BRAND
  DEMO
  GALLERY
  INSTITUTION
  INSTITUTIONAL_SELLER
  PRIVATE_COLLECTOR
  PRIVATE_DEALER
}

type PartnerCounts {
  artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  artists(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  partner_artists(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  eligible_artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  published_for_sale_artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  published_not_for_sale_artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  shows(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  displayable_shows(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  current_displayable_shows(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  artist_documents(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  partner_show_documents(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
}

enum PartnersAggregation {
  CATEGORY
  LOCATION
  TOTAL
}

"""The results for one of the requested aggregations"""
type PartnersAggregationResults {
  counts: [AggregationCount]
  slice: PartnersAggregation
}

type PartnerShow implements Node {
  """A globally unique ID."""
  __id: ID! @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """A slug ID."""
  id: ID! @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """A type-specific ID likely used as a database ID."""
  _id: ID! @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  cached: Int @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  artists: [Artist] @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """The artworks featured in the show"""
  artworks(
    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
    for_sale: Boolean = false
    published: Boolean = true
    all: Boolean
    page: Int = 1

    """Number of artworks to return"""
    size: Int = 25
  ): [Artwork] @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """A connection of artworks featured in the show"""
  artworksConnection(
    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
    for_sale: Boolean = false
    published: Boolean = true
    after: String
    first: Int
    before: String
    last: Int
  ): ArtworkConnection @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  counts: PartnerShowCounts @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  cover_image: Image @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  created_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  description: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  displayable: Boolean @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  events: [PartnerShowEventType] @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """A formatted description of the start to end dates"""
  exhibition_period: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  fair: Fair @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  href: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  images(
    """Number of images to return"""
    size: Int

    """Pass true/false to include cover or not"""
    default: Boolean
    page: Int
  ): [Image] @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """Flag showing if show has any location."""
  has_location: Boolean @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """
  Gravity doesn’t expose the \`active\` flag. Temporarily re-state its logic.
  """
  is_active: Boolean @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  is_displayable: Boolean @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  is_fair_booth: Boolean @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  kind: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  location: Location @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  meta_image: Image @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """The exhibition title"""
  name: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  partner: Partner @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  press_release(format: Format): String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  status: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")

  """A formatted update on upcoming status changes"""
  status_update(
    """Before this many days no update will be generated"""
    max_days: Int
  ): String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
  type: String @deprecated(reason: "The \`PartnerShow\` type has been deprecated. Prefer to use the \`Show\` type instead. [Will be removed in v2]")
}

type PartnerShowCounts {
  artworks(
    """The slug or ID of an artist in the show."""
    artist_id: String
  ): Int
  eligible_artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
}

type PartnerShowEventType {
  event_type: String
  description: String
  title: String
  start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """A formatted description of the dates with hours"""
  dateTimeRange: String

  """A formatted description of the start to end dates"""
  exhibitionPeriod: String
}

enum PartnerShowPartnerType {
  GALLERY
  MUSEUM
}

enum PartnerShowSorts {
  created_at_asc @deprecated(reason: "Prefer to use \`CREATED_AT_ASC\`. [Will be removed in v2]")
  created_at_desc @deprecated(reason: "Prefer to use \`CREATED_AT_DESC\`. [Will be removed in v2]")
  end_at_asc @deprecated(reason: "Prefer to use \`END_AT_ASC\`. [Will be removed in v2]")
  end_at_desc @deprecated(reason: "Prefer to use \`END_AT_DESC\`. [Will be removed in v2]")
  name_asc @deprecated(reason: "Prefer to use \`NAME_ASC\`. [Will be removed in v2]")
  name_desc @deprecated(reason: "Prefer to use \`NAME_DESC\`. [Will be removed in v2]")
  publish_at_asc @deprecated(reason: "Prefer to use \`PUBLISH_AT_ASC\`. [Will be removed in v2]")
  publish_at_desc @deprecated(reason: "Prefer to use \`PUBLISH_AT_DESC\`. [Will be removed in v2]")
  start_at_asc @deprecated(reason: "Prefer to use \`START_AT_ASC\`. [Will be removed in v2]")
  start_at_desc @deprecated(reason: "Prefer to use \`START_AT_DESC\`. [Will be removed in v2]")
  CREATED_AT_ASC
  CREATED_AT_DESC
  END_AT_ASC
  END_AT_DESC
  NAME_ASC
  NAME_DESC
  PUBLISH_AT_ASC
  PUBLISH_AT_DESC
  START_AT_ASC
  START_AT_DESC
  PARTNER_ASC
}

enum PartnersSortType {
  CREATED_AT_ASC
  CREATED_AT_DESC
  SORTABLE_ID_ASC
  SORTABLE_ID_DESC
  RELATIVE_SIZE_ASC
  RELATIVE_SIZE_DESC
  PUBLISHED_AT_DESC
  RANDOM_SCORE_DESC
}

union PartnerTypes = Partner | ExternalPartner

type Pickup {
  """It will always be PICKUP"""
  fulfillmentType: String
}

type PopularArtists {
  artists: [Artist]
}

type PriceCents {
  min: Int
  max: Int
  exact: Boolean
}

type PriceRange {
  display: String
  minPrice: Money
  maxPrice: Money
}

type Profile {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  bio: String
  counts: ProfileCounts
  href: String
  icon: Image
  image: Image
  initials(length: Int = 3): String
  is_followed: Boolean
  is_published: Boolean
  name: String
  is_publically_visible: Boolean
}

type ProfileCounts {
  follows(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
}

type Query {
  """List of all artwork attribution classes"""
  artworkAttributionClasses: [AttributionClass]

  """An Article"""
  article(
    """The ID of the Article"""
    id: String!
  ): Article

  """A list of Articles"""
  articles(auction_id: String, published: Boolean = true, show_id: String, sort: ArticleSorts): [Article]

  """An Artwork"""
  artwork(
    """The slug or ID of the Artwork"""
    id: String!
  ): Artwork

  """A subset of the metadata for an artwork at a specific time"""
  artworkVersion(
    """The ID of the ArtworkVersion"""
    id: String!
  ): ArtworkVersion

  """A list of Artworks"""
  artworks(ids: [String]): [Artwork]

  """An Artist"""
  artist(
    """The slug or ID of the Artist"""
    id: String!
  ): Artist

  """A list of Artists"""
  artists(
    """
    
            Only return artists matching specified ids.
            Accepts list of ids.
          
    """
    ids: [String]

    """
    
            Only return artists matching specified slugs.
            Accepts list of slugs. (e.g. 'andy-warhol', 'banksy')
          
    """
    slugs: [String]
    page: Int = 1
    size: Int
    sort: ArtistSorts
  ): [Artist]

  """Creates, and authorizes, a JWT custom for Causality"""
  causality_jwt(
    role: Role

    """The id of the auction to participate in"""
    sale_id: String!
  ): String

  """A city-based entry point for local discovery"""
  city(
    """
    A slug for the city, conforming to Gravity's city slug naming conventions
    """
    slug: String

    """
    A point which will be used to locate the nearest local discovery city within a threshold
    """
    near: Near
  ): City
  collection(
    """The slug or ID of the Collection"""
    id: String!
  ): Collection

  """A user's credit card"""
  credit_card(
    """The ID of the Credit Card"""
    id: String!
  ): CreditCard

  """An External Partner not on the platform"""
  external_partner(
    """The ID of the Partner"""
    id: String!
  ): ExternalPartner

  """A Fair"""
  fair(
    """The slug or ID of the Fair"""
    id: String!
  ): Fair

  """A list of Fairs"""
  fairs(
    fair_organizer_id: String
    has_full_feature: Boolean
    has_homepage_section: Boolean
    has_listing: Boolean

    """
    
            Only return fairs matching specified ids.
            Accepts list of ids.
          
    """
    ids: [String]
    near: Near
    page: Int
    size: Int
    sort: FairSorts
    status: EventStatus
  ): [Fair]

  """Partners Elastic Search results"""
  filter_partners(
    default_profile_public: Boolean
    eligible_for_carousel: Boolean

    """Indicates an active subscription"""
    eligible_for_listing: Boolean

    """Indicates tier 1/2 for gallery, 1 for institution"""
    eligible_for_primary_bucket: Boolean

    """Indicates tier 3/4 for gallery, 2 for institution"""
    eligible_for_secondary_bucket: Boolean
    ids: [String]
    has_full_profile: Boolean

    """Coordinates to find partners closest to"""
    near: String
    page: Int

    """
    
            Only return partners of the specified partner categories.
            Accepts list of slugs.
          
    """
    partner_categories: [String]
    size: Int
    sort: PartnersSortType

    """term used for searching Partners"""
    term: String
    type: [PartnerClassification]
    aggregations: [PartnersAggregation]!
  ): FilterPartners

  """Artworks Elastic Search results"""
  filter_artworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks

  """Sale Artworks Elastic Search results"""
  filter_sale_artworks(aggregations: [SaleArtworkAggregation], artist_ids: [String], include_artworks_by_followed_artists: Boolean, live_sale: Boolean, is_auction: Boolean, gene_ids: [String], estimate_range: String, page: Int, sale_id: ID, size: Int, sort: String): FilterSaleArtworks @deprecated(reason: "Prefer to use \`sale_artworks\`. [Will be removed in v2]")
  gene(
    """The slug or ID of the Gene"""
    id: String!
  ): Gene

  """A list of Genes"""
  genes(
    size: Int

    """
    
            Only return genes matching specified slugs.
            Accepts list of slugs.
          
    """
    slugs: [String]
  ): [Gene]

  """List of curated genes with custom images"""
  suggested_genes: [Gene]

  """A list of Gene Families"""
  gene_families(after: String, first: Int, before: String, last: Int): GeneFamilyConnection
  gene_family: GeneFamily

  """Home screen content"""
  home_page: HomePage

  """A Search for Artists"""
  match_artist(
    """Your search term"""
    term: String!

    """Maximum number of items to retrieve. Default: 5."""
    size: Int

    """Page to retrieve. Default: 1."""
    page: Int

    """Exclude these MongoDB ids from results"""
    exclude_ids: [String]
  ): [Artist]

  """A Search for Genes"""
  match_gene(
    """Your search term"""
    term: String!

    """Maximum number of items to retrieve. Default: 5."""
    size: Int

    """Page to retrieve. Default: 1."""
    page: Int

    """Exclude these MongoDB ids from results"""
    exclude_ids: [String]
  ): [Gene]
  me: Me

  """Fetches an object given its Globally Unique ID"""
  node(
    """The ID of the object"""
    __id: ID!
  ): Node

  """An OrderedSet"""
  ordered_set(
    """The ID of the OrderedSet"""
    id: String!
  ): OrderedSet

  """A collection of OrderedSets"""
  ordered_sets(
    """Key to the OrderedSet or group of OrderedSets"""
    key: String!
    public: Boolean = true
    page: Int = 1
    size: Int = 10
  ): [OrderedSet]

  """A Partner"""
  partner(
    """The slug or ID of the Partner"""
    id: String!
  ): Partner

  """A list of PartnerCategories"""
  partner_categories(
    category_type: CategoryType

    """Filter by whether category is internal"""
    internal: Boolean = false
    size: Int
  ): [PartnerCategory]

  """A PartnerCategory"""
  partner_category(
    """The slug or ID of the PartnerCategory"""
    id: String!
  ): PartnerCategory

  """A Partner Show"""
  partner_show(
    """The slug or ID of the PartnerShow"""
    id: String!
  ): PartnerShow

  """A list of PartnerShows"""
  partner_shows(
    at_a_fair: Boolean
    displayable: Boolean = true
    fair_id: String
    featured: Boolean

    """
    
            Only return shows matching specified ids.
            Accepts list of ids.
          
    """
    ids: [String]
    near: Near
    partner_id: String
    size: Int
    sort: PartnerShowSorts
    status: EventStatus
  ): [PartnerShow]

  """A list of Partners"""
  partners(
    default_profile_public: Boolean
    eligible_for_carousel: Boolean

    """Indicates an active subscription"""
    eligible_for_listing: Boolean

    """Indicates tier 1/2 for gallery, 1 for institution"""
    eligible_for_primary_bucket: Boolean

    """Indicates tier 3/4 for gallery, 2 for institution"""
    eligible_for_secondary_bucket: Boolean
    ids: [String]
    has_full_profile: Boolean

    """Coordinates to find partners closest to"""
    near: String
    page: Int

    """
    
            Only return partners of the specified partner categories.
            Accepts list of slugs.
          
    """
    partner_categories: [String]
    size: Int
    sort: PartnersSortType

    """term used for searching Partners"""
    term: String
    type: [PartnerClassification]
  ): [Partner]

  """A Profile"""
  profile(
    """The slug or ID of the Profile"""
    id: String!
  ): Profile

  """A Sale"""
  sale(
    """The slug or ID of the Sale"""
    id: String!
  ): Sale

  """A Sale Artwork"""
  sale_artwork(
    """The slug or ID of the SaleArtwork"""
    id: String!
  ): SaleArtwork

  """Sale Artworks search results"""
  sale_artworks(aggregations: [SaleArtworkAggregation], artist_ids: [String], include_artworks_by_followed_artists: Boolean, live_sale: Boolean, is_auction: Boolean, gene_ids: [String], estimate_range: String, page: Int, sale_id: ID, size: Int, sort: String, after: String, first: Int, before: String, last: Int): SaleArtworksConnection

  """A list of Sales"""
  sales(
    """Limit by auction."""
    is_auction: Boolean = true

    """
    
            Only return sales matching specified ids.
            Accepts list of ids.
          
    """
    ids: [String]

    """Limit by live status."""
    live: Boolean = true

    """Limit by published status."""
    published: Boolean = true
    size: Int
    sort: SaleSorts
  ): [Sale]

  """Global search"""
  search(
    """Search query to perform. Required."""
    query: String!

    """Entities to include in search. Default: [ARTIST, ARTWORK]."""
    entities: [SearchEntity]

    """Mode of search to execute. Default: SITE."""
    mode: SearchMode
    aggregations: [SearchAggregation]

    """If present, will be used for pagination instead of cursors."""
    page: Int
    after: String
    first: Int
    before: String
    last: Int
  ): SearchableConnection

  """The schema for difference micro-service settings"""
  services: Services

  """A Show"""
  show(
    """The slug or ID of the Show"""
    id: String!
  ): Show
  status: Status

  """Content for a specific page or view"""
  staticContent(
    """The slug or id for the view"""
    id: String!
  ): StaticContent

  """Fields related to internal systems."""
  system: System
  tag(
    """The slug or ID of the Tag"""
    id: String!
  ): Tag

  """Trending artists"""
  trending_artists(
    """
    Fetch the top artists for each metric within double the base time period
    """
    double_time_period: Boolean = false

    """Trending method"""
    method: String = "fetch"

    """Trending metric name"""
    name: TrendingMetrics!

    """Number of results to return"""
    size: Int = 40
  ): TrendingArtists
  user(
    """Email to search for user by"""
    email: String

    """ID of the user"""
    id: String
  ): User

  """A list of Users"""
  users(ids: [String]): [User]

  """Popular artists"""
  popular_artists(
    """If true, will exclude followed artists for the user"""
    exclude_followed_artists: Boolean

    """
    Exclude these ids from results, may result in all artists being excluded.
    """
    exclude_artist_ids: [String]

    """Number of results to return"""
    size: Int
  ): PopularArtists

  """Returns a single Order"""
  ecommerceOrder(id: String!): Order

  """Returns list of orders"""
  ecommerceOrders(buyerId: String, buyerType: String, sellerId: String, sellerType: String, mode: OrderModeEnum, state: String, sort: OrdersSortMethodType, after: String, first: Int, before: String, last: Int): OrderConnection

  """Returns a single Order"""
  order(id: String!): Order

  """Returns list of orders"""
  orders(buyerId: String, buyerType: String, sellerId: String, sellerType: String, mode: OrderModeEnum, state: String, sort: OrdersSortMethodType, after: String, first: Int, before: String, last: Int): OrderConnection

  """A wildcard used to support complex root queries in Relay"""
  viewer: Viewer

  """Autocomplete resolvers."""
  _unused_gravity_matchPartners(matchType: String, page: Int = 1, size: Int = 5, term: String!): [DoNotUseThisPartner!]

  """Autocomplete resolvers."""
  _unused_gravity_match_partners(match_type: String, page: Int = 1, size: Int = 5, term: String!): [DoNotUseThisPartner!] @deprecated(reason: "Use matchPartners")

  """Find partners by IDs"""
  _unused_gravity_partners(ids: [ID!]!): [DoNotUseThisPartner!]

  """Find list of competing orders"""
  commerceCompetingOrders(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
    orderId: ID!
  ): CommerceOrderConnectionWithTotalCount
  commerceLineItems(
    """Returns the elements in the list that come after the specified cursor."""
    after: String
    artworkId: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String
    editionSetId: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
    orderStates: [CommerceOrderStateEnum!]
  ): CommerceLineItemConnection

  """Return my orders"""
  commerceMyOrders(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
    mode: CommerceOrderModeEnum
    sellerId: String
    sort: CommerceOrderConnectionSortEnum
    state: CommerceOrderStateEnum
  ): CommerceOrderConnectionWithTotalCount

  """Find an order by ID"""
  commerceOrder(code: String, id: ID): CommerceOrder

  """Find list of orders"""
  commerceOrders(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String
    buyerId: String
    buyerType: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
    mode: CommerceOrderModeEnum
    sellerId: String
    sellerType: String
    sort: CommerceOrderConnectionSortEnum
    state: CommerceOrderStateEnum
  ): CommerceOrderConnectionWithTotalCount

  """Find PartnerStats"""
  analyticsPartnerStats(partnerId: String!): AnalyticsPartnerStats
  marketingCollections(category: String, randomizationSeed: String, size: Int, isFeaturedArtistContent: Boolean, showOnEditorial: Boolean, artistID: String): [MarketingCollection!]!
  marketingCategories: [MarketingCollectionCategory!]!
  marketingCollection(slug: String!): MarketingCollection
  marketingHubCollections: [MarketingCollection!]!
}

"""Autogenerated input type of RecordArtworkView"""
input RecordArtworkViewInput {
  artwork_id: String!

  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
}

"""Autogenerated return type of RecordArtworkView"""
type RecordArtworkViewPayload {
  """Id of viewed artwork"""
  artworkId: String!

  """Id of viewed artwork"""
  artwork_id: String! @deprecated(reason: "Use artworkId")

  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
}

input RejectOrderInput {
  """Order ID"""
  orderId: String!
  clientMutationId: String
}

type RejectOrderPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

enum RelatedArtistsKind {
  MAIN
  CONTEMPORARY
}

type RelatedArtworkGrid implements ArtworkContextGrid {
  title: String
  ctaTitle: String
  ctaHref: String
  artworks(after: String, first: Int, before: String, last: Int): ArtworkConnection
}

"""Autogenerated input type of RequestConditionReport"""
input RequestConditionReportInput {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String

  """ID of the sale artwork."""
  saleArtworkID: String!
}

"""Autogenerated return type of RequestConditionReport"""
type RequestConditionReportPayload {
  """A unique identifier for the client performing the mutation."""
  clientMutationId: String
  conditionReportRequest: ConditionReportRequest!
}

input RequestCredentialsForAssetUploadInput {
  """The gemini template you want to request"""
  name: String!

  """The desired access control"""
  acl: String!
  clientMutationId: String
}

type RequestCredentialsForAssetUploadPayload {
  asset: Credentials
  clientMutationId: String
}

union RequestedFulfillment = Ship | Pickup

type ResizedImageUrl {
  factor: Float
  width: Int
  height: Int
  url: String
}

enum Role {
  PARTICIPANT
  OPERATOR
}

"""The conditions for uploading assets to media.artsy.net"""
type S3PolicyConditionsType {
  """The bucket to upload to."""
  bucket: String!

  """The assigned access control"""
  acl: String!

  """A key which is prefixed on your file"""
  gemini_key: String!

  """The returned status code, currently always 201"""
  success_action_status: String!
}

"""An policy for uploading assets to media.artsy.net"""
type S3PolicyDocumentType {
  """An expiration date string."""
  expiration: String!

  """The details for the upload"""
  conditions: S3PolicyConditionsType!
}

type Sale implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  artworks(
    page: Int = 1
    size: Int = 25
    all: Boolean = false

    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
  ): [Artwork]

  """Returns a connection of artworks for a sale."""
  artworksConnection(
    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
    after: String
    first: Int
    before: String
    last: Int
  ): ArtworkConnection
  associated_sale: Sale
  auction_state: String @deprecated(reason: "Prefer to use \`status\`. [Will be removed in v2]")

  """A bid increment policy that explains minimum bids in ranges."""
  bid_increments: [BidIncrement]

  """Auction's buyer's premium policy."""
  buyers_premium: [BuyersPremium]
  cover_image: Image
  currency: String
  description: String
  display_timely_at: String
  eligible_sale_artworks_count: Int
  end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  event_start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  event_end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """
  A formatted description of when the auction starts or ends or if it has ended
  """
  formattedStartDateTime: String
  href: String
  name: String
  initials(length: Int = 3): String
  is_auction: Boolean
  is_benefit: Boolean @deprecated(reason: "Prefer to use \`isBenefit\`. [Will be removed in v2]")
  isBenefit: Boolean
  isGalleryAuction: Boolean
  is_auction_promo: Boolean
  is_closed: Boolean
  is_open: Boolean
  is_live_open: Boolean
  is_preview: Boolean
  is_preliminary: Boolean
  is_registration_closed: Boolean
  is_with_buyers_premium: Boolean
  live_start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """
  Returns a live auctions url if the sale is open and start time is after now
  """
  live_url_if_open: String
  partner: Partner
  profile: Profile
  promoted_sale: Sale
  registration_ends_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """A registration for this sale or null"""
  registrationStatus: Bidder
  require_bidder_approval: Boolean
  sale_artworks(page: Int = 1, size: Int = 25, all: Boolean = false): [SaleArtwork]
  sale_artworks_connection(
    """List of sale artwork IDs to fetch"""
    ids: [ID]
    after: String
    first: Int
    before: String
    last: Int
  ): SaleArtworkConnection
  sale_type: String
  start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  status: String
  sale_artwork(id: String!): SaleArtwork
  symbol: String
  timeZone: String
}

type SaleArtwork {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  artwork: Artwork
  bidder_positions_count: Int @deprecated(reason: "Prefer to use \`counts.bidder_positions\`. [Will be removed in v2]")
  bid_increments: [Float] @deprecated(reason: "Prefer to use \`increments.cents\`. [Will be removed in v2]")
  counts: SaleArtworkCounts

  """Currency abbreviation (e.g. "USD")"""
  currency: String
  current_bid: SaleArtworkCurrentBid
  estimate: String

  """Singular estimate field, if specified"""
  estimate_cents: Int
  high_estimate: SaleArtworkHighEstimate
  high_estimate_cents: Float @deprecated(reason: "Prefer to use \`high_estimate\`. [Will be removed in v2]")
  highest_bid: SaleArtworkHighestBid
  increments(
    """Whether or not to start the increments at the user's latest bid"""
    useMyMaxBid: Boolean
  ): [BidIncrementsFormatted]
  is_bid_on: Boolean

  """Can bids be placed on the artwork?"""
  is_biddable: Boolean
  is_with_reserve: Boolean
  lot_label: String
  lot_number: String @deprecated(reason: "Prefer to use \`lot_label\`. [Will be removed in v2]")
  low_estimate: SaleArtworkLowEstimate
  low_estimate_cents: Float @deprecated(reason: "Prefer to use \`low_estimate\`. [Will be removed in v2]")
  minimum_next_bid: SaleArtworkMinimumNextBid
  minimum_next_bid_cents: Float @deprecated(reason: "Prefer to use \`minimum_next_bid\`. [Will be removed in v2]")
  opening_bid: SaleArtworkOpeningBid
  opening_bid_cents: Float @deprecated(reason: "Prefer to use \`opening_bid\`. [Will be removed in v2]")
  position: Float
  reserve: SaleArtworkReserve
  reserve_message: String
  reserve_status: String
  sale_id: String
  sale: Sale
  calculatedCost(
    """Max bid price for the sale artwork"""
    bidAmountMinor: Int!
  ): CalculatedCost

  """Currency symbol (e.g. "$")"""
  symbol: String
}

enum SaleArtworkAggregation {
  ARTIST
  FOLLOWED_ARTISTS
  MEDIUM
  TOTAL
}

"""A connection to a list of items."""
type SaleArtworkConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [SaleArtworkEdge]
}

type SaleArtworkCounts {
  bidder_positions(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
}

type SaleArtworkCurrentBid {
  """A formatted price with various currency formatting options."""
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """An amount of money expressed in cents."""
  cents: Float

  """A pre-formatted price."""
  display: String
}

"""An edge in a connection."""
type SaleArtworkEdge {
  """The item at the end of the edge"""
  node: SaleArtwork

  """A cursor for use in pagination"""
  cursor: String!
}

type SaleArtworkHighestBid {
  """An optional type-specific ID."""
  id: ID
  created_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  is_cancelled: Boolean

  """A formatted price with various currency formatting options."""
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String
  cents: Int
  display: String
  amount_cents: Float @deprecated(reason: "Prefer to use \`cents\`. [Will be removed in v2]")
}

type SaleArtworkHighEstimate {
  """A formatted price with various currency formatting options."""
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """An amount of money expressed in cents."""
  cents: Float

  """A pre-formatted price."""
  display: String
}

type SaleArtworkLowEstimate {
  """A formatted price with various currency formatting options."""
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """An amount of money expressed in cents."""
  cents: Float

  """A pre-formatted price."""
  display: String
}

type SaleArtworkMinimumNextBid {
  """A formatted price with various currency formatting options."""
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """An amount of money expressed in cents."""
  cents: Float

  """A pre-formatted price."""
  display: String
}

type SaleArtworkOpeningBid {
  """A formatted price with various currency formatting options."""
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """An amount of money expressed in cents."""
  cents: Float

  """A pre-formatted price."""
  display: String
}

type SaleArtworkReserve {
  """A formatted price with various currency formatting options."""
  amount(
    decimal: String = "."

    """Allows control of symbol position (%v = value, %s = symbol)"""
    format: String = "%s%v"
    precision: Int = 0
    symbol: String
    thousand: String = ","
  ): String

  """An amount of money expressed in cents."""
  cents: Float

  """A pre-formatted price."""
  display: String
}

"""The results for one of the requested aggregations"""
type SaleArtworksAggregationResults {
  counts: [AggregationCount]
  slice: SaleArtworkAggregation
}

"""A connection to a list of items."""
type SaleArtworksConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [SaleArtworksEdge]

  """Returns aggregation counts for the given filter query."""
  aggregations: [SaleArtworksAggregationResults]
  counts: FilterSaleArtworksCounts
}

"""An edge in a connection."""
type SaleArtworksEdge {
  """The item at the end of the edge"""
  node: SaleArtwork

  """A cursor for use in pagination"""
  cursor: String!
}

type SaleRegistration {
  bidder: Bidder
  is_registered: Boolean
  sale: Sale
}

enum SaleSorts {
  _ID_ASC
  _ID_DESC
  CREATED_AT_ASC
  CREATED_AT_DESC
  ELIGIBLE_SALE_ARTWORKS_COUNT_ASC
  ELIGIBLE_SALE_ARTWORKS_COUNT_DESC
  END_AT_ASC
  END_AT_DESC
  NAME_ASC
  NAME_DESC
  START_AT_ASC
  START_AT_DESC
  TIMELY_AT_NAME_ASC
  TIMELY_AT_NAME_DESC
}

input SaveArtworkInput {
  artwork_id: String
  remove: Boolean
  clientMutationId: String
}

type SaveArtworkPayload {
  artwork: Artwork
  clientMutationId: String
}

"""An object that may be searched for"""
interface Searchable {
  displayLabel: String
  imageUrl: String
  href: String
}

"""A connection to a list of items."""
type SearchableConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [SearchableEdge]
  pageCursors: PageCursors
  totalCount: Int

  """Returns aggregation counts for the given filter query."""
  aggregations: [SearchAggregationResults]
}

"""An edge in a connection."""
type SearchableEdge {
  """The item at the end of the edge"""
  node: Searchable

  """A cursor for use in pagination"""
  cursor: String!
}

type SearchableItem implements Node & Searchable {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  description: String
  displayLabel: String
  imageUrl: String
  href: String
  searchableType: String @deprecated(reason: "Prefer to use \`displayType\`. [Will be removed in v2]")
  displayType: String
}

enum SearchAggregation {
  TYPE
}

"""The results for a requested aggregations"""
type SearchAggregationResults {
  counts: [AggregationCount]
  slice: SearchAggregation
}

enum SearchEntity {
  ARTIST
  ARTWORK
  ARTICLE
  CITY
  COLLECTION
  FAIR
  FEATURE
  GALLERY
  GENE
  INSTITUTION
  PROFILE
  SALE
  SHOW
  TAG
}

enum SearchMode {
  AUTOSUGGEST
  SITE
}

"""A piece that can be sold"""
interface Sellable {
  dimensions: dimensions
  edition_of: String

  """Whether a piece can be purchased through e-commerce"""
  is_acquireable: Boolean

  """Whether a user can make an offer on the work"""
  is_offerable: Boolean
  is_for_sale: Boolean
  is_sold: Boolean
  price: String @deprecated(reason: "Prefer to use \`listPrice\`. [Will be removed in v2]")
  sale_message: String
}

input sellerAcceptOfferInput {
  """Offer ID"""
  offerId: String!
  clientMutationId: String
}

type sellerAcceptOfferPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

input sellerCounterOfferInput {
  """The ID of the offer to counter"""
  offerId: String!

  """Offer price"""
  offerPrice: MoneyInput

  """Offer note"""
  note: String
  clientMutationId: String
}

type sellerCounterOfferPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

input sellerRejectOfferInput {
  """Offer ID"""
  offerId: String!

  """Reason for rejecting offer"""
  rejectReason: CancelReasonType
  clientMutationId: String
}

type sellerRejectOfferPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

input SendConversationMessageMutationInput {
  """The id of the conversation to be updated"""
  id: String!

  """The email address of the message sender"""
  from: String!
  body_text: String!

  """The message being replied to"""
  reply_to_message_id: String!
  clientMutationId: String
}

type SendConversationMessageMutationPayload {
  conversation: Conversation
  messageEdge: MessageEdge
  clientMutationId: String
}

type SendFeedbackMutationFailure {
  mutationError: GravityMutationError
}

input SendFeedbackMutationInput {
  """Message to be sent."""
  message: String!

  """Email to associate with message (only used if logged out)."""
  email: String

  """Name to associate with message (only used if logged out)."""
  name: String

  """URL of page where feedback originated."""
  url: String
  clientMutationId: String
}

type SendFeedbackMutationPayload {
  feedbackOrError: SendFeedbackMutationType
  clientMutationId: String
}

type SendFeedbackMutationSuccess {
  feedback: Feedback
}

union SendFeedbackMutationType = SendFeedbackMutationSuccess | SendFeedbackMutationFailure

type Services {
  convection: Convection!
  metaphysics: Metaphysics!
}

input SetOrderPaymentInput {
  """Order ID"""
  orderId: String!

  """Gravity Credit Card Id"""
  creditCardId: String!
  clientMutationId: String
}

type SetOrderPaymentPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

input SetOrderShippingInput {
  """Id of the Order"""
  orderId: ID

  """Fulfillment Type of this Order"""
  fulfillmentType: OrderFulfillmentType

  """Shipping information"""
  shipping: ShippingInputField
  clientMutationId: String
}

type SetOrderShippingPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

type Ship {
  """Name for the shipping information"""
  name: String

  """Shipping address line 1"""
  addressLine1: String

  """Shipping address line 2"""
  addressLine2: String

  """Shipping city"""
  city: String

  """Shipping region"""
  region: String

  """Shipping country"""
  country: String!

  """Shipping postal code"""
  postalCode: String

  """Shipping phone number"""
  phoneNumber: String
}

input ShippingInputField {
  """Name for the shipping information"""
  name: String

  """Shipping address line 1"""
  addressLine1: String

  """Shipping address line 2"""
  addressLine2: String

  """Shipping city"""
  city: String

  """Shipping region"""
  region: String

  """Shipping country"""
  country: String

  """Shipping postal code"""
  postalCode: String

  """Shipping phone number"""
  phoneNumber: String
}

type Show implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int

  """The Artists presenting in this show"""
  artists: [Artist]

  """The artworks featured in this show"""
  artworks(
    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
    for_sale: Boolean = false
    published: Boolean = true
    all: Boolean
    page: Int = 1

    """Number of artworks to return"""
    size: Int = 25
  ): [Artwork] @deprecated(reason: "Prefer to use \`artworks_connection\`. [Will be removed in v2]")

  """The artworks featured in the show"""
  artworks_connection(
    """
    List of artwork IDs to exclude from the response (irrespective of size)
    """
    exclude: [String]
    for_sale: Boolean = false
    published: Boolean = true
    after: String
    first: Int
    before: String
    last: Int
  ): ArtworkConnection

  """Artists inside the show who do not have artworks present"""
  artists_without_artworks: [Artist]

  """Artists in the show grouped by last name"""
  artists_grouped_by_name: [ArtistGroup]

  """
  The general city, derived from a fair location, a show location or a potential city
  """
  city: String

  """The image you should use to represent this show"""
  cover_image: Image

  """
  An object that represents some of the numbers you might want to highlight
  """
  counts: ShowCounts

  """A description of the show"""
  description: String
  displayable: Boolean @deprecated(reason: "Prefer to use \`is_displayable\`. [Will be removed in v2]")
  end_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """Events from the partner that runs this show"""
  events: [PartnerShowEventType]

  """A formatted description of the start to end dates"""
  exhibition_period: String

  """If the show is in a Fair, then that fair"""
  fair: Fair

  """Artworks Elastic Search results"""
  filteredArtworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks

  """A path to the show on Artsy"""
  href: String

  """
  Images that represent the show, you may be interested in meta_image or cover_image for a definitive thumbnail
  """
  images(
    """Number of images to return"""
    size: Int

    """Pass true/false to include cover or not"""
    default: Boolean
    page: Int
  ): [Image]

  """Flag showing if show has any location."""
  has_location: Boolean

  """
  Gravity doesn’t expose the \`active\` flag. Temporarily re-state its logic.
  """
  is_active: Boolean

  """Is this something we can display to the front-end?"""
  is_displayable: Boolean

  """Does the show exist as a fair booth?"""
  is_fair_booth: Boolean

  """Is it a show provided for historical reference?"""
  is_reference: Boolean
  is_local_discovery: Boolean @deprecated(reason: "Prefer to use \`isStubShow\`. [Will be removed in v2]")

  """Is it an outsourced local discovery stub show?"""
  isStubShow: Boolean

  """Whether the show is in a fair, group or solo"""
  kind: String

  """Where the show is located (Could also be a fair location)"""
  location: Location

  """
  An image representing the show, or a sharable image from an artwork in the show
  """
  meta_image: Image

  """Is the user following this show"""
  is_followed: Boolean

  """The exhibition title"""
  name: String

  """Shows that are near (~75km) from this show"""
  nearbyShows(
    sort: PartnerShowSorts

    """By default show only current shows"""
    status: EventStatus = CURRENT

    """Whether to include local discovery stubs as well as displayable shows"""
    discoverable: Boolean
    after: String
    first: Int
    before: String
    last: Int
  ): ShowConnection

  """
  Alternate Markdown-supporting free text representation of the opening reception event’s date/time
  """
  openingReceptionText: String

  """The partner that represents this show, could be a non-Artsy partner"""
  partner: PartnerTypes

  """The press release for this show"""
  press_release(format: Format): String

  """Link to the press release for this show"""
  pressReleaseUrl: String

  """When this show starts"""
  start_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String

  """Is this show running, upcoming or closed?"""
  status: String

  """A formatted update on upcoming status changes"""
  status_update(
    """Before this many days no update will be generated"""
    max_days: Int
  ): String

  """Is it a fair booth or a show?"""
  type: String

  """A Connection of followed artists by current user for this show"""
  followedArtists(after: String, first: Int, before: String, last: Int): ShowFollowArtistConnection
}

type ShowArtworkGrid implements ArtworkContextGrid {
  title: String
  ctaTitle: String
  ctaHref: String
  artworks(after: String, first: Int, before: String, last: Int): ArtworkConnection
}

"""A connection to a list of items."""
type ShowConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ShowEdge]
  pageCursors: PageCursors
  totalCount: Int
}

type ShowCounts {
  artworks(
    """The slug or ID of an artist in the show."""
    artist_id: String
  ): Int
  eligible_artworks(
    """Returns a \`String\` when format is specified. e.g.\`'0,0.0000''\`"""
    format: String
    label: String
  ): FormattedNumber
  artists: Int
}

"""An edge in a connection."""
type ShowEdge {
  """The item at the end of the edge"""
  node: Show

  """A cursor for use in pagination"""
  cursor: String!
}

type ShowFollowArtist {
  artist: Artist
}

"""A connection to a list of items."""
type ShowFollowArtistConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ShowFollowArtistEdge]
}

"""An edge in a connection."""
type ShowFollowArtistEdge {
  """The item at the end of the edge"""
  node: ShowFollowArtist

  """A cursor for use in pagination"""
  cursor: String!
}

enum ShowSort {
  START_AT_ASC
  START_AT_DESC
  END_AT_ASC
  END_AT_DESC
  UPDATED_AT_ASC
  UPDATED_AT_DESC
  NAME_ASC
  NAME_DESC
  FEATURED_ASC
  FEATURED_DESC
  SORTABLE_NAME_ASC
  SORTABLE_NAME_DESC
}

enum sort {
  DESC
  ASC
}

type StaticContent {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  name: String
  content: String
}

type Status {
  gravity: StatusGravity

  """Metaphysics ping"""
  ping: Boolean
}

"""Gravity ping"""
type StatusGravity {
  ping: Boolean
}

enum SubmissionCategoryAggregation {
  PAINTING
  SCULPTURE
  PHOTOGRAPHY
  PRINT
  DRAWING_COLLAGE_OR_OTHER_WORK_ON_PAPER
  MIXED_MEDIA
  PERFORMANCE_ART
  INSTALLATION
  VIDEO_FILM_ANIMATION
  ARCHITECTURE
  FASHION_DESIGN_AND_WEARABLE_ART
  JEWELRY
  DESIGN_DECORATIVE_ART
  TEXTILE_ARTS
  OTHER
}

enum SubmissionDimensionAggregation {
  CM
  IN
}

enum SubmissionStateAggregation {
  DRAFT
  SUBMITTED
  APPROVED
  REJECTED
}

input SubmitOrderInput {
  """Order ID"""
  orderId: String!
  clientMutationId: String
}

type SubmitOrderPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

input SubmitOrderWithOfferInput {
  """Offer ID"""
  offerId: String!
  clientMutationId: String
}

type SubmitOrderWithOfferPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

input submitPendingOfferInput {
  """The ID of the pending offer you want to submit"""
  offerId: String!
  clientMutationId: String
}

type submitPendingOfferPayload {
  orderOrError: OrderOrFailureUnionType
  clientMutationId: String
}

type System {
  """Gravity system time, necessary for synchronizing device clocks."""
  time: SystemTime
}

type SystemTime {
  day: Int
  wday: Int
  month: Int
  year: Int
  hour: Int
  min: Int
  sec: Int
  dst: Boolean
  unix: Int
  utc_offset: Int
  zone: String
  iso8601: String
}

type Tag implements Node {
  """A globally unique ID."""
  __id: ID!

  """A slug ID."""
  id: ID!

  """A type-specific ID likely used as a database ID."""
  _id: ID!
  cached: Int
  description: String
  name: String
  href: String
  image: Image
  count: Int

  """Artworks Elastic Search results"""
  filtered_artworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks
}

type TrendingArtists {
  artists: [Artist]
}

enum TrendingMetrics {
  """Cumulative price achieved at auction. Base time period: 12 weeks"""
  ARTIST_AUCTION_LOT

  """Number of artworks in fairs. Base time period: 12 weeks."""
  ARTIST_FAIR

  """Base time period: 2 weeks"""
  ARTIST_FOLLOW

  """Base time period: 1 month"""
  ARTIST_INQUIRY

  """Base time period: 1 month"""
  ARTIST_SAVE

  """Base time period: 2 weeks"""
  ARTIST_SEARCH
}

union UnderlyingCurrentEvent = Show | Sale

input UpdateCollectorProfileInput {
  loyalty_applicant: Boolean
  professional_buyer: Boolean
  self_reported_purchases: String
  intents: [Intents]
  clientMutationId: String
}

type UpdateCollectorProfilePayload {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!
  email: String
  name: String
  confirmed_buyer_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  collector_level: Int
  self_reported_purchases: String
  loyalty_applicant_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  professional_buyer_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  professional_buyer_applied_at(
    """This arg is deprecated, use timezone instead"""
    convert_to_utc: Boolean
    format: String

    """A tz database time zone, otherwise falls back to \`X-TIMEZONE\` header"""
    timezone: String
  ): String
  intents: [String]
  clientMutationId: String
}

input UpdateConversationMutationInput {
  """The id of the conversation to be updated."""
  conversationId: String!

  """The message id to mark as read."""
  fromLastViewedMessageId: String!
  clientMutationId: String
}

type UpdateConversationMutationPayload {
  conversation: Conversation
  clientMutationId: String
}

input UpdateMyProfileInput {
  """The given name of the user."""
  name: String

  """The given email of the user."""
  email: String

  """The given phone number of the user."""
  phone: String

  """The given location of the user as structured data"""
  location: EditableLocation

  """The collector level for the user"""
  collector_level: Int

  """The minimum price collector has selected"""
  price_range_min: Int

  """The maximum price collector has selected"""
  price_range_max: Float
  clientMutationId: String
}

type UpdateMyProfilePayload {
  user: User
  clientMutationId: String
}

input UpdateSubmissionMutationInput {
  """The GUID for the submission"""
  id: String!

  """The gravity ID for an Artist"""
  artist_id: String!

  """Does the artwork come with an certificate of authenticity?"""
  authenticity_certificate: Boolean

  """The set in which to put the work"""
  category: SubmissionCategoryAggregation

  """The depth of the work"""
  depth: String

  """A string, either CM or IN"""
  dimensions_metric: SubmissionDimensionAggregation

  """Is the work a part of an edition"""
  edition: Boolean

  """The number of the individual work if in a set"""
  edition_number: String

  """The whole size of the set of works"""
  edition_size: String

  """The height of the work"""
  height: String

  """The city where the work currently resides"""
  location_city: String

  """The country where the work currently resides"""
  location_country: String

  """The state where the work currently resides"""
  location_state: String

  """The materials in which the work is created"""
  medium: String

  """The history of an work"""
  provenance: String

  """Is this work signed?"""
  signature: Boolean

  """The name of the work"""
  title: String

  """The internal state of the work, e.g. draft/submitted"""
  state: SubmissionStateAggregation

  """The width of the work"""
  width: String

  """The year the work was created"""
  year: String

  """The user who submitted the work"""
  user_id: ID
  clientMutationId: String
}

type UpdateSubmissionMutationPayload {
  consignment_submission: ConsignmentSubmission
  clientMutationId: String
}

type User {
  """A globally unique ID."""
  __id: ID!

  """A type-specific ID likely used as a database ID."""
  id: ID!
  cached: Int

  """The given name of the user."""
  name: String!

  """The given email of the user."""
  email: String!

  """The given phone number of the user."""
  phone: String

  """The given location of the user as structured data"""
  location: Location

  """The price range the collector has selected"""
  price_range: String

  """Pin for bidding at an auction"""
  pin: String

  """The paddle number of the user"""
  paddle_number: String

  """
  Check whether a user exists by email address before creating an account.
  """
  userAlreadyExists: Boolean
}

"""A wildcard used to support complex root queries in Relay"""
type Viewer {
  """List of all artwork attribution classes"""
  artworkAttributionClasses: [AttributionClass]

  """An Article"""
  article(
    """The ID of the Article"""
    id: String!
  ): Article

  """A list of Articles"""
  articles(auction_id: String, published: Boolean = true, show_id: String, sort: ArticleSorts): [Article]

  """An Artwork"""
  artwork(
    """The slug or ID of the Artwork"""
    id: String!
  ): Artwork

  """A subset of the metadata for an artwork at a specific time"""
  artworkVersion(
    """The ID of the ArtworkVersion"""
    id: String!
  ): ArtworkVersion

  """A list of Artworks"""
  artworks(ids: [String]): [Artwork]

  """An Artist"""
  artist(
    """The slug or ID of the Artist"""
    id: String!
  ): Artist

  """A list of Artists"""
  artists(
    """
    
            Only return artists matching specified ids.
            Accepts list of ids.
          
    """
    ids: [String]

    """
    
            Only return artists matching specified slugs.
            Accepts list of slugs. (e.g. 'andy-warhol', 'banksy')
          
    """
    slugs: [String]
    page: Int = 1
    size: Int
    sort: ArtistSorts
  ): [Artist]

  """Creates, and authorizes, a JWT custom for Causality"""
  causality_jwt(
    role: Role

    """The id of the auction to participate in"""
    sale_id: String!
  ): String

  """A city-based entry point for local discovery"""
  city(
    """
    A slug for the city, conforming to Gravity's city slug naming conventions
    """
    slug: String

    """
    A point which will be used to locate the nearest local discovery city within a threshold
    """
    near: Near
  ): City
  collection(
    """The slug or ID of the Collection"""
    id: String!
  ): Collection

  """A user's credit card"""
  credit_card(
    """The ID of the Credit Card"""
    id: String!
  ): CreditCard

  """An External Partner not on the platform"""
  external_partner(
    """The ID of the Partner"""
    id: String!
  ): ExternalPartner

  """A Fair"""
  fair(
    """The slug or ID of the Fair"""
    id: String!
  ): Fair

  """A list of Fairs"""
  fairs(
    fair_organizer_id: String
    has_full_feature: Boolean
    has_homepage_section: Boolean
    has_listing: Boolean

    """
    
            Only return fairs matching specified ids.
            Accepts list of ids.
          
    """
    ids: [String]
    near: Near
    page: Int
    size: Int
    sort: FairSorts
    status: EventStatus
  ): [Fair]

  """Partners Elastic Search results"""
  filter_partners(
    default_profile_public: Boolean
    eligible_for_carousel: Boolean

    """Indicates an active subscription"""
    eligible_for_listing: Boolean

    """Indicates tier 1/2 for gallery, 1 for institution"""
    eligible_for_primary_bucket: Boolean

    """Indicates tier 3/4 for gallery, 2 for institution"""
    eligible_for_secondary_bucket: Boolean
    ids: [String]
    has_full_profile: Boolean

    """Coordinates to find partners closest to"""
    near: String
    page: Int

    """
    
            Only return partners of the specified partner categories.
            Accepts list of slugs.
          
    """
    partner_categories: [String]
    size: Int
    sort: PartnersSortType

    """term used for searching Partners"""
    term: String
    type: [PartnerClassification]
    aggregations: [PartnersAggregation]!
  ): FilterPartners

  """Artworks Elastic Search results"""
  filter_artworks(
    acquireable: Boolean
    offerable: Boolean
    aggregation_partner_cities: [String]
    aggregations: [ArtworkAggregation]
    artist_id: String
    artist_ids: [String]
    at_auction: Boolean
    attribution_class: [String]
    color: String
    dimension_range: String
    extra_aggregation_gene_ids: [String]
    include_artworks_by_followed_artists: Boolean
    include_medium_filter_in_aggregation: Boolean
    inquireable_only: Boolean
    for_sale: Boolean
    gene_id: String
    gene_ids: [String]
    height: String
    width: String

    """
    When true, will only return \`marketable\` works (not nude or provocative).
    """
    marketable: Boolean

    """A string from the list of allocations, or * to denote all mediums"""
    medium: String
    period: String
    periods: [String]
    major_periods: [String]
    partner_id: ID
    partner_cities: [String]
    price_range: String
    page: Int
    sale_id: ID
    size: Int
    sort: String
    tag_id: String
    keyword: String

    """When true, will only return exact keyword match"""
    keyword_match_exact: Boolean
  ): FilterArtworks

  """Sale Artworks Elastic Search results"""
  filter_sale_artworks(aggregations: [SaleArtworkAggregation], artist_ids: [String], include_artworks_by_followed_artists: Boolean, live_sale: Boolean, is_auction: Boolean, gene_ids: [String], estimate_range: String, page: Int, sale_id: ID, size: Int, sort: String): FilterSaleArtworks @deprecated(reason: "Prefer to use \`sale_artworks\`. [Will be removed in v2]")
  gene(
    """The slug or ID of the Gene"""
    id: String!
  ): Gene

  """A list of Genes"""
  genes(
    size: Int

    """
    
            Only return genes matching specified slugs.
            Accepts list of slugs.
          
    """
    slugs: [String]
  ): [Gene]

  """List of curated genes with custom images"""
  suggested_genes: [Gene]

  """A list of Gene Families"""
  gene_families(after: String, first: Int, before: String, last: Int): GeneFamilyConnection
  gene_family: GeneFamily

  """Home screen content"""
  home_page: HomePage

  """A Search for Artists"""
  match_artist(
    """Your search term"""
    term: String!

    """Maximum number of items to retrieve. Default: 5."""
    size: Int

    """Page to retrieve. Default: 1."""
    page: Int

    """Exclude these MongoDB ids from results"""
    exclude_ids: [String]
  ): [Artist]

  """A Search for Genes"""
  match_gene(
    """Your search term"""
    term: String!

    """Maximum number of items to retrieve. Default: 5."""
    size: Int

    """Page to retrieve. Default: 1."""
    page: Int

    """Exclude these MongoDB ids from results"""
    exclude_ids: [String]
  ): [Gene]
  me: Me

  """Fetches an object given its Globally Unique ID"""
  node(
    """The ID of the object"""
    __id: ID!
  ): Node

  """An OrderedSet"""
  ordered_set(
    """The ID of the OrderedSet"""
    id: String!
  ): OrderedSet

  """A collection of OrderedSets"""
  ordered_sets(
    """Key to the OrderedSet or group of OrderedSets"""
    key: String!
    public: Boolean = true
    page: Int = 1
    size: Int = 10
  ): [OrderedSet]

  """A Partner"""
  partner(
    """The slug or ID of the Partner"""
    id: String!
  ): Partner

  """A list of PartnerCategories"""
  partner_categories(
    category_type: CategoryType

    """Filter by whether category is internal"""
    internal: Boolean = false
    size: Int
  ): [PartnerCategory]

  """A PartnerCategory"""
  partner_category(
    """The slug or ID of the PartnerCategory"""
    id: String!
  ): PartnerCategory

  """A Partner Show"""
  partner_show(
    """The slug or ID of the PartnerShow"""
    id: String!
  ): PartnerShow

  """A list of PartnerShows"""
  partner_shows(
    at_a_fair: Boolean
    displayable: Boolean = true
    fair_id: String
    featured: Boolean

    """
    
            Only return shows matching specified ids.
            Accepts list of ids.
          
    """
    ids: [String]
    near: Near
    partner_id: String
    size: Int
    sort: PartnerShowSorts
    status: EventStatus
  ): [PartnerShow]

  """A list of Partners"""
  partners(
    default_profile_public: Boolean
    eligible_for_carousel: Boolean

    """Indicates an active subscription"""
    eligible_for_listing: Boolean

    """Indicates tier 1/2 for gallery, 1 for institution"""
    eligible_for_primary_bucket: Boolean

    """Indicates tier 3/4 for gallery, 2 for institution"""
    eligible_for_secondary_bucket: Boolean
    ids: [String]
    has_full_profile: Boolean

    """Coordinates to find partners closest to"""
    near: String
    page: Int

    """
    
            Only return partners of the specified partner categories.
            Accepts list of slugs.
          
    """
    partner_categories: [String]
    size: Int
    sort: PartnersSortType

    """term used for searching Partners"""
    term: String
    type: [PartnerClassification]
  ): [Partner]

  """A Profile"""
  profile(
    """The slug or ID of the Profile"""
    id: String!
  ): Profile

  """A Sale"""
  sale(
    """The slug or ID of the Sale"""
    id: String!
  ): Sale

  """A Sale Artwork"""
  sale_artwork(
    """The slug or ID of the SaleArtwork"""
    id: String!
  ): SaleArtwork

  """Sale Artworks search results"""
  sale_artworks(aggregations: [SaleArtworkAggregation], artist_ids: [String], include_artworks_by_followed_artists: Boolean, live_sale: Boolean, is_auction: Boolean, gene_ids: [String], estimate_range: String, page: Int, sale_id: ID, size: Int, sort: String, after: String, first: Int, before: String, last: Int): SaleArtworksConnection

  """A list of Sales"""
  sales(
    """Limit by auction."""
    is_auction: Boolean = true

    """
    
            Only return sales matching specified ids.
            Accepts list of ids.
          
    """
    ids: [String]

    """Limit by live status."""
    live: Boolean = true

    """Limit by published status."""
    published: Boolean = true
    size: Int
    sort: SaleSorts
  ): [Sale]

  """Global search"""
  search(
    """Search query to perform. Required."""
    query: String!

    """Entities to include in search. Default: [ARTIST, ARTWORK]."""
    entities: [SearchEntity]

    """Mode of search to execute. Default: SITE."""
    mode: SearchMode
    aggregations: [SearchAggregation]

    """If present, will be used for pagination instead of cursors."""
    page: Int
    after: String
    first: Int
    before: String
    last: Int
  ): SearchableConnection

  """The schema for difference micro-service settings"""
  services: Services

  """A Show"""
  show(
    """The slug or ID of the Show"""
    id: String!
  ): Show
  status: Status

  """Content for a specific page or view"""
  staticContent(
    """The slug or id for the view"""
    id: String!
  ): StaticContent

  """Fields related to internal systems."""
  system: System
  tag(
    """The slug or ID of the Tag"""
    id: String!
  ): Tag

  """Trending artists"""
  trending_artists(
    """
    Fetch the top artists for each metric within double the base time period
    """
    double_time_period: Boolean = false

    """Trending method"""
    method: String = "fetch"

    """Trending metric name"""
    name: TrendingMetrics!

    """Number of results to return"""
    size: Int = 40
  ): TrendingArtists
  user(
    """Email to search for user by"""
    email: String

    """ID of the user"""
    id: String
  ): User

  """A list of Users"""
  users(ids: [String]): [User]

  """Popular artists"""
  popular_artists(
    """If true, will exclude followed artists for the user"""
    exclude_followed_artists: Boolean

    """
    Exclude these ids from results, may result in all artists being excluded.
    """
    exclude_artist_ids: [String]

    """Number of results to return"""
    size: Int
  ): PopularArtists
}
`;
